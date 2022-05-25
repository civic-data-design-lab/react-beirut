import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
const MultipageForm = ({ onSubmit, requiredFields, formData, children }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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

  const onNext = () => {
    if (page >= children.length - 1) {
      // User is on the last page, so "next page" means submit

      // Make sure all required fields are filled out
      const allRequiredFields = requiredFields.flat();
      const missingFields = allRequiredFields.filter((field) => {
        return !formData[field];
      });
      if (missingFields.length > 0) {
        // TODO: Show a more helpful error message if the user is missing fields
        alert(
          `Please fill in the following fields: ${missingFields.join(', ')}`,
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
    const requiredFieldsForPage = requiredFields[page];
    requiredFieldsForPage.forEach((field) => {
      if (!formData[field]) {
        console.warn(`Field ${field} is required`);
      }
    });

    router.push(`${router.basePath}?page=${page + 1}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className='MultipageForm'>
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
        <>
          {/* <h1>weoifwijefo aiwjeofi ajwoei fjaowief</h1> */}

          <> {children[page]}</>
          <hr/>
          <span className='MultipageForm-nav'>
            <button className='btn-nav' disabled={page === 0} onClick={onBack}>
              Back
            </button>
            <button className='btn-nav' onClick={onNext}>
              {page === children.length - 1 ? 'Submit' : 'Next'}
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default MultipageForm;
