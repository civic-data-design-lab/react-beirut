import InputField from '../general/InputField';

/**
 * The Archive about form updates the following fields:
 * - imageType
 * - yearTaken (e.g. `'2022`) *[yearTaken OR (startDecade AND endDecade)]
 * - startDecade (e.g. `'1930'`) *[yearTaken OR (startDecade AND endDecade)]
 * - endDecade *[yearTaken OR (startDecade AND endDecade)]
 * - workshopName
 * - ownerName
 * - typeOfReference
 * - referenceName (Appears if typeOfReference == "Owner of personal photo")
 * - referenceSourceCitation (Appears if typeOfReference !="Owner of personal photo")
 * - referenceCopyright
 *
 * @param {function} onUpdate - Function to call when the form is updated.
 * @param {object} formData - The form data to use.
 * @param {string[]} requiredFields - List of required fields for this form. See
 *    applicable fields above.
 * @param {function} setRequiredFields - Function that can be used to set the required fields. This is used to update the required fields when a certain option is selected.
 * @returns {React.Component}
 */
const ArchiveAboutForm = ({
  onUpdate,
  formData,
  formSchema,
  requiredFields,
}) => {

  const page = formSchema.pages.about;
  const fields = page.fields;

  return (
    <form className="ArchiveAboutForm">
      <div className={'form-title'}><h2>{page.title}</h2></div>
      <div className="sections">
        <div className="section">
          <div className='subsection'>
          <h3 className={'Contribute-form-section-heading'}>General Information</h3>
          <InputField
            title={
              <>
                Associated craft workshop name <br/> <small>(if applicable)</small>
              </>
            }
            fieldName={fields.workshop_name.field_name}
            value={formData[fields.workshop_name.field_name]}
            onUpdate={onUpdate}
            required={fields.workshop_name.required}
          />
          <InputField
            title={
              <>
                Associated workshop owner Name
                <br/>
                <small>(optional - name may be publicly displayed)</small>
              </>
            }
            fieldName={fields.owner_name.field_name}
            value={formData[fields.owner_name.field_name]}
            onUpdate={onUpdate}
            required={fields.owner_name.required}
          />
            </div>
        </div>
        <div className={'vr'}></div>
        <div className="section">
          <div className={'subsection'}>
          <h3 className={'Contribute-form-section-heading'}>Reference Information</h3>
          <InputField
            title={fields.type_of_reference.title}
            fieldName={fields.type_of_reference.field_name}
            type="select"
            value={formData[fields.type_of_reference.field_name]}
            onUpdate={onUpdate}
            required={fields.type_of_reference.required}
          >
            <option value="Owner of personal photo">
              Owner of personal photo (I have the rights to share this image)
            </option>
            <option value="Print source">
              Print source (book, newspaper, magazine, article, printed
              periodical, etc.)
            </option>
            <option value="Electronic source">
              Electronic source (database, website, blog, social media, etc.)
            </option>
          </InputField>
          {formData[fields.type_of_reference.field_name] == 'Owner of personal photo' && (
            <InputField
              title={
                <>
                  Name of person submitting the photo <br />{' '}
                  <small>
                    (optional - if no name is included, the photo will be
                    submitted anonymously)
                  </small>
                </>
              }
              fieldName={fields.reference_name.field_name}
              type="text"
              value={formData[fields.reference_name.field_name]}
              onUpdate={onUpdate}
              required={fields.reference_name.required}
            />
          )}
          {(formData[fields.type_of_reference.field_name] == 'Print source' ||
            formData[fields.type_of_reference.field_name] == 'Electronic source') && (
            <InputField
              title={fields.reference_source_citation.title}
              fieldName={fields.reference_source_citation.field_name}
              type="text"
              value={formData[fields.reference_source_citation.field_name]}
              onUpdate={onUpdate}
              required={true}
            />
          )}
          <InputField
            title="Any additional copyright information?"
            type="textarea"
            fieldName={fields.reference_copyright.field_name}
            value={formData[fields.reference_copyright.field_name]}
            onUpdate={onUpdate}
            required={fields.reference_copyright.required}
          />
        </div>
          </div>
      </div>
    </form>
  );
};

export default ArchiveAboutForm;
