import { useState, useEffect, cloneElement } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Card from '../../Card';

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
 *    requiredFields={[[], ['street', 'sector']]}
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
 * @param {string[]} props.pageTitles - An array of page titles to display, one per page.
 * @param {object} props.formData - The form data to use.
 * @param {string[]} props.requiredFields - An array of arrays of strings. Each array
 *    entry represents the list of required fields for each form page.
 * @param {function} props.onUpdate - Function to call when the form is updated.
 * @param {function} props.onSubmit - The function to call when the form is submitted
 * @returns {JSX.Element}
 */
const MultipageForm = ({
  name,
  pageTitles,
  formData,
  requiredFields,
  onUpdate,
  onSubmit,
  submitted,
  children,
}) => {
  const router = useRouter();
  const [dialog, setDialog] = useState(null);
  const [page, setPage] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  /**
   * Initial component mount useEffect hook.
   * Gets the form data from local storage when the component is mounted.
   */
  useEffect(() => {
    console.info('Fetching existing form data from local storage');
    const formData = JSON.parse(localStorage.getItem(name)); // If cookies are disabled, this throws an error "SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document."
    if (formData) {
      onUpdate(formData);
    }
  }, []);

  /**
   * Component update useEffect hook.
   * When the page route is updated, swtich to a different page.
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
   * @param {number} pageIdx - The page index to check (0-indexed).
   * @returns {string[]} - The array of missing fields.
   */
  const getMissingFields = (pageIdx) => {
    if (pageIdx === undefined) {
      // If no page index is provided, get all the missing fields across all
      // pages
      const allRequiredFields = Object.values(requiredFields).flat();
      const missingFields = allRequiredFields.filter(
        (field) => !formData[field]
      );
      return missingFields;
    }

    // Get the missing fields for the given page
    const formName = Object.keys(requiredFields)[pageIdx];
    const requiredFieldsForPage = requiredFields[formName];
    const missingFields = requiredFieldsForPage.filter((field) =>
      formData[field]?.length == 0 ? true : !formData[field]
    );
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
      const allRequiredFields = requiredFields.flat();
      const missingFields = allRequiredFields.filter((field) => {
        return !formData[field];
      });
      if (missingFields.length > 0) {
        // TODO: Show a more helpful error message if the user is missing fields
        alert(
          `Please fill in the following fields: ${missingFields.join(', ')}`
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
      const missingFields = getMissingFields(page);
      return (
        <div className="MultipageForm-missing-fields">
          <h2>Missing Required Fields</h2>
          <div>
            <h3>You are missing the following fields (marked with *):</h3>
            <ul>
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
          <span>
            <button
              className="btn-pill secondary"
              onClick={() => {
                router.push(`${router.basePath}?page=${page + 1}`, undefined, {
                  shallow: true,
                });
                handleCloseDialog();
              }}
            >
              Continue Anyways
            </button>
            <button className="btn-pill" onClick={handleCloseDialog}>
              Go Back
            </button>
          </span>
        </div>
      );
    }

    // TODO: Other cases?
    return <div></div>;
  };

  return (
    <>
      {dialog && (
        <Card handleClose={handleCloseDialog}>
          <div className="card__content">{showDialogContent()}</div>
        </Card>
      )}
      <div className="MultipageForm">
        {!(submitted || submitting) && (
          <nav className="header drop-shadow__black">
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
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <h1>Upload success!</h1>
                  <h2>Your response has been recorded.</h2>
                  <p>
                    Click{' '}
                    <Link href="/contribute">
                      <a className="link">here</a>
                    </Link>{' '}
                    to make another contribution, or click{' '}
                    <Link href="/">
                      <a className="link">here</a>
                    </Link>{' '}
                    to return to the main site.
                  </p>
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
