import { useState, useEffect, cloneElement } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Card from '../../Card';
import {isProperlyTruthy, WORKSHOP_CONTRIBUTION_NAME} from '../../../lib/utils';
import Dialogue from "./Dialogue";

/**
 * Component handling mulitpage forms.
 *
 * USAGE:
 * ------
 * This component works by passing in form pages as children. Each child
 * should be a function that returns a React component.
 * For example, a multipage form with two pages would look like:
 *
 * ```
 *  <MultipageForm
 *    onSubmit={onSubmit}
 *    requiredFields={[[], ['street', 'sector']]} (outdated)
 *    onUpdate={onUpdate}
 *    formData={form}
 *  >
 *    <ImageUploadForm />
 *    <LocationForm />
 *  </MultipageForm>
 * ```
 * The `ImageUploadForm` component will be displayed on the first page (page 0),
 * and the `LocationForm` on the second page (page 1). Any updates to the form
 * are passed to the `onUpdate` function. This function should expect an object
 * containing the form data to update.
 *
 * @param {object} props - Props (below)
 * @param {string} props.name - Name of the multipage form
 * @param {object} props.formData - The form data to use.
 * @param {object} props.formSchema - The layout of the form detailing the pages, fields, and their info.
 * @param {function} props.onUpdate - Function to call when the form is updated.
 * @param {function} props.onSubmit - The function to call when the form is submitted
 * @returns {JSX.Element}
 */
const MultipageForm = ({
  name,
  formData,
  formSchema,
  onUpdate,
  onSubmit,
  submitted,
  children,
  submitFail,
  submitSuccess,
  handleRedirect,
  setSubmitting,
  submitting
}) => {
  const router = useRouter();
  const [dialog, setDialog] = useState(null);
  const [page, setPage] = useState(0);


  // INFO: Use the short_titles if available otherwise use titles.
  const pageTitles = Object.keys(formSchema.pages).map((p) => {
    return formSchema['pages'][p]['short_title']
      ? formSchema['pages'][p]['short_title']
      : formSchema['pages'][p]['title'];
  });

  const requiredFields = Object.entries(formSchema.pages).map((page) => {
    return [
      // INFO: Return each required field per page...
      ...Object.entries(page[1].fields)
        .map((field) => {
          return field[1].required == true
            ? {
                type: 'always required',
                field_name: field[1].field_name,
                title: field[1].title,
                parent: page[1].title,
              }
            : null;
        })
        .filter((required) => required),
      // INFO: And each conditional requirement
      ...(page[1].custom_reqs
        ? Object.entries(page[1].custom_reqs).map((custom_req) => {
            return {
              type: 'custom requirement',
              function: custom_req[1].function,
              title: custom_req[1].title,
              parent: page[1].title,
            };
          })
        : []),
    ];
  });

  /**
   * Initial component mount useEffect hook.
   * Gets the form data from local storage when the component is mounted.
   */
  useEffect(() => {
    console.info('Fetching existing form data from local storage');
    const formData = JSON.parse(localStorage.getItem(name)); // If cookies are disabled, this throws an error "SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document."
    console.log("getting form data from local storage on multipage form mount ", formData)
    if (formData) {
      onUpdate(formData);
    }
  }, []);

  /**
   * Component update useEffect hook.
   * When the page route is updated, switch to a different page.
   */
  useEffect(() => {
    const pageQuery = router.query.page;
    if (!pageQuery) {
      return;
    }
    const pageIdx = parseInt(router.query.page);
    // console.log('Switched to page', pageIdx);
    if (!pageIdx || pageIdx >= children.length || pageIdx < 0) {
      router.push(`${router.basePath}?page=0`, undefined, { shallow: true });
    }
    setPage(pageIdx || 0);
  }, [router.query.page]);

  /**
   * Given the provided `requiredFields` props, figures out which fields are
   * missing for the current page. If no page index is provided, returns all the
   * missing fields across all pages.
   *
   * @param {number} [pageIdx=null] - The page index to check (0-indexed).
   * @returns {string[]} - The array of missing fields.
   */
  const getMissingFields = (pageIdx = null) => {
    // INFO: If no page index is provided, get all the missing fields across all
    // INFO: pages
    if (pageIdx === null) {
      const allRequiredFields = Object.values(requiredFields).flat();
      let missingFields = [];
      allRequiredFields.forEach((reqField) => {
        if (
          reqField.type == 'always required' &&
          !isProperlyTruthy(formData[reqField.field_name])
        ) {
          missingFields.push(reqField);
          return;
        }
        // INFO: If reqField is an object, it is a custom
        if (
          reqField.type == 'custom requirement' &&
          !reqField.function(formData).requirementFulfilled
        ) {
          missingFields.push(reqField);
        }
      });
      return missingFields;
    }

    // INFO: Get the missing fields for the given page
    const requiredFieldsForPage = requiredFields[pageIdx];
    let missingFields = [];
    requiredFieldsForPage.forEach((reqField) => {
      // If reqFieldValue is neither truthy nor an empty list
      if (
        reqField.type == 'always required' &&
        !isProperlyTruthy(formData[reqField.field_name])
      ) {
        missingFields.push(reqField);
        return;
      }
      // INFO: If reqField is an object, it is a custom requirement.
      if (
        reqField.type == 'custom requirement' &&
        !reqField.function(formData).requirementFulfilled
      ) {
        missingFields.push(reqField);
      }
    });
    return missingFields;
  };

  /**
   * Handles clicking the back button. Decrements the page index and updates the
   * route if the page index is greater than 0.
   */
  const onBack = () => {
    if (page === 0) {
      return;
    }
    router.push(`${router.basePath}?page=${page - 1}`, undefined, {
      shallow: true,
    });
  };

  /**
   * Handles clicking the next button. If the next page is the last page,
   * submits the form.
   */
  const onNext = () => {
    if (page >= children.length - 1) {
      // SUBMIT THE FORM
      // (User is on the last page, so "next page" means submit)

      // Make sure all required fields are filled out
      const missingFields = getMissingFields();
      if (missingFields.length > 0) {
        // TODO: Show a more helpful error message if the user is missing fields
        alert(
          `Please fill in the following fields: ${missingFields
            .map((field) => field.title)
            .join(', ')}`
        );
        return;
      }

      // Submit the form
      setSubmitting(true);
      onSubmit();
      router.push(`${router.basePath}`, undefined, {
        shallow: true,
      });
      return;
    }

    // Check the required fields
    const missingFields = getMissingFields(page);

    if (missingFields.length > 0) {
      setDialog('missing-fields');
      return;
    }

    router.push(`${router.basePath}?page=${page + 1}`, undefined, {
      shallow: true,
    });
  };

  const getLinkBack = () => {
    if (name===WORKSHOP_CONTRIBUTION_NAME) {
      return '/contribute/workshop?page=0'
    } else {
      return '/contribute/archive?page=0'
    }
  }

  const handleCloseDialog = () => {
    setDialog(null);
  };

  /**
   * Shows the dialog content for the given dialog type (stored in state).
   *
   * @returns {JSX.Element}
   */
  const showDialogContent = () => {
    if (!dialog) {
      return <></>;
    }

    if (dialog === 'missing-fields') {
      // Shows the missing fields dialog content for each page
      const missingFields = getMissingFields(page).map((field) => field.title);
      return (

          <Dialogue
            title={'Missing Required Fields'}
            content={
                <>
                  <p>You are missing the following fields (marked with *):</p>
                  <ul className={'missing-fields-list'}>
                    <p>{missingFields.map((field) => (
                        <li key={field}>{field}</li>
                    ))}</p>
            </ul>
                </>
            }

            handleClose={handleCloseDialog}
            cancel={true}
            accept={true}
            cancelText={'Go Back'}
            acceptText={'Continue Anyways'}
            handleCancel={handleCloseDialog}
            handleAccept={() => {
                router.push(`${router.basePath}?page=${page + 1}`, undefined, {
                  shallow: true,
                });
                handleCloseDialog();
              }} />

      );
    }

    // TODO: Other cases?
    return <div></div>;
  };

  return (
    <>
      {dialog && showDialogContent()}



      <div className="MultipageForm">
        {!(submitted || submitting) && (
          <nav className="header drop-shadow__black stick">
            {pageTitles?.map((title, idx) => (
              <Link href={`${router.basePath}?page=${idx}`} key={idx}>
                <a className={idx === page ? 'active' : ''}>
                  <div className="bubble">{idx + 1}</div>
                  <div> {title}</div>
                </a>
              </Link>
            ))}
          </nav>
        )}
        <div className="content">
          {submitted || submitting ? (
            <div className="submit">
              {!submitted ? (
                <div className="loading">
                  <div className="loader"></div>
                  <h2>Submitting...</h2>
                </div>
              ) : (
                <div className="success">
                  {submitSuccess ?
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  <h1>Upload success!</h1>
                  <h2>Your response has been recorded.</h2>
                  <p>
                    Click{' '}
                    <Link href="/contribute" >
                      <a className="link" onClick={handleRedirect}>here</a>
                    </Link>{' '}
                    to make another contribution, or click{' '}
                    <Link href="/" >
                      <a onClick={handleRedirect} className="link">here</a>
                    </Link>{' '}
                    to return to the main site.
                  </p>
                  </> :
                  <>
                    <FontAwesomeIcon icon={faCircleXmark} />
                  <h1>Upload failed!</h1>
                  <h2>We could not process your response.</h2>
                  <p>
                    Click{' '}
                    <Link href={getLinkBack()}>
                      <a onClick={handleRedirect} className="link">here</a>
                    </Link>{' '}
                    to return to your form.
                  </p>

                  </>}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Clones the child element in order to pass in the form data,
            update function, and missing fields per-page props */}
              <>
                {cloneElement(children[page], {
                  formData: formData,
                  onUpdate: onUpdate,
                  formSchema: formSchema,
                  missingFields: getMissingFields(),
                })}
              </>
              <hr />
              <span className="MultipageForm-nav">
                <button
                  className="btn-nav"
                  disabled={page === 0}
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  className="btn-nav"
                  onClick={onNext}
                  disabled={
                    page === children.length - 1 &&
                    getMissingFields().length > 0
                  }
                >
                  {page === children.length - 1 ? 'Submit' : 'Next'}
                </button>
              </span>
            </>
          )}
        </div>
      </div>

    </>
  );
};

export default MultipageForm;
