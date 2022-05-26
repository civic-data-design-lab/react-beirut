import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Card from '../Card';

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
 *    requiredFields={[[], ['street', 'municipality']]}
 *    formData={form}
 *  >
 *    <ImageUploadForm onUpdate={updateForm} formData={form} />
 *    <LocationForm onUpdate={updateForm} formData={form} />
 *  </MultipageForm>
 * ```
 * The `ImageUploadForm` component will be displayed on the first page (page 0),
 * and the `LocationForm` on the second page (page 1). Any updates to the form
 * are passed to the `onUpdate` function. This function should expect an object
 * containing the form data to update.
 *
 * @param {function} onSubmit - The function to call when the form is submitted
 * @param {string[]} requiredFields - An array of arrays of strings. Each array
 *    entry represents the list of required fields for each form page.
 * @param {object} formData - The form data to use.
 * @returns
 */
const MultipageForm = ({
  name,
  pageTitles,
  formData,
  requiredFields,
  onUpdate,
  onSubmit,
  children,
}) => {
  const router = useRouter();
  const [dialog, setDialog] = useState(null);
  const [page, setPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Get the form data from local storage when the component is mounted
    console.log('Fetching existing form data from local storage');
    const formData = JSON.parse(localStorage.getItem(name));
    if (formData) {
      onUpdate(formData);
    }
  }, []);

  useEffect(() => {
    const pageQuery = router.query.page;
    if (!pageQuery) {
      return;
    }
    const pageIdx = parseInt(router.query.page);
    console.log('Switched to page', pageIdx);
    if (!pageIdx || pageIdx >= children.length || pageIdx < 0) {
      router.push(`${router.basePath}?page=0`, undefined, { shallow: true });
    }
    setPage(pageIdx || 0);
  }, [router.query.page]);

  const onBack = () => {
    if (page === 0) {
      return;
    }
    router.push(`${router.basePath}?page=${page - 1}`, undefined, {
      shallow: true,
    });
  };

  const getMissingFields = (pageIdx) => {
    if (pageIdx === undefined) {
      // If no page index is provided, get all the missing fields across all
      // pages
      const allRequiredFields = requiredFields.flat();
      const missingFields = allRequiredFields.filter(
        (field) => !formData[field]
      );
      return missingFields;
    }

    // Get the missing fields for the given page
    const requiredFieldsForPage = requiredFields[pageIdx];
    const missingFields = requiredFieldsForPage.filter(
      (field) => !formData[field]
    );
    return missingFields;
  };

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
      onSubmit();
      router.push(`${router.basePath}`, undefined, {
        shallow: true,
      });
      setSubmitted(true);
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

  const showDialogContent = () => {
    if (!dialog) {
      return <></>;
    }

    if (dialog === 'missing-fields') {
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

    return <div>Hello!</div>;
    // switch (dialog) {
    //   case 'submit':
    //     return div

    //     }
  };

  return (
    <>
      {dialog && (
        <Card handleClose={handleCloseDialog}>
          <div className="card__content">{showDialogContent()}</div>
        </Card>
      )}
      <div className="MultipageForm">
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
        {submitted ? (
          <div>
            <p>Thank you for your contribution!</p>
            <p>
              Click{' '}
              <Link href="/contribute">
                <a>here</a>
              </Link>{' '}
              to contribute again, or click{' '}
              <Link href="/">
                <a>here</a>
              </Link>{' '}
              to return to the main site.
            </p>
          </div>
        ) : (
          <div className="content">
            {/* <h1>weoifwijefo aiwjeofi ajwoei fjaowief</h1> */}

            <> {children[page]}</>
            <hr />
            <span className="MultipageForm-nav">
              <button
                className="btn-nav"
                disabled={page === 0}
                onClick={onBack}
              >
                Back
              </button>
              <button className="btn-nav" onClick={onNext}>
                {page === children.length - 1 ? 'Submit' : 'Next'}
              </button>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default MultipageForm;
