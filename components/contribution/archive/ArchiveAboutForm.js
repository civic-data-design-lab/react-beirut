import { IMAGE_TYPES, VALID_DECADES } from '../../../lib/utils';
import InputField from '../general/InputField';

/**
 * The Archive about form updates the following fields:
 * - `imageType`
 * - `yearTaken` (e.g. `'2022`) *[yearTaken OR (startDecade AND endDecade)]
 * - `startDecade` (e.g. `'1930'`) *[yearTaken OR (startDecade AND endDecade)]
 * - `endDecade` *[yearTaken OR (startDecade AND endDecade)]
 * - `workshopName`
 * - `ownerName`
 * - `typeOfReference`
 * - `referenceName` (Appears if typeOfReference == "Owner of personal photo")
 * - `referenceCopyright`* (Appears if typeOfReference !="Owner of personal photo")
 *
 * @param {function} onUpdate - Function to call when the form is updated.
 * @param {object} formData - The form data to use.
 * @param {string[]} requiredFields - List of required fields for this form. See
 *    applicable fields above.
 * @param {function} setRequiredFields - Function that can be used to set the required fields. This is used to update the required fields when a certain option is selected.
 * @returns {React.Component}
 */
const ArchiveAboutForm = ({ onUpdate, formData, requiredFields, setRequiredFields }) => {
  return (
    <form className="ArchiveAboutForm">
      <h2>About the Archive</h2>
      <div className="sections">
        <div className="section">
          <h3>Image Information</h3>
          <InputField
            title="What is the image showing?"
            fieldName="imageType"
            type="select"
            defaultValue="--Select a type--"
            value={formData.imageType}
            onUpdate={onUpdate}
            required={requiredFields?.includes('imageType')}
          >
            {IMAGE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </InputField>
          <InputField
            title="What year was the image taken?"
            fieldName="yearTaken"
            value={formData.yearTaken}
            type="number"
            min="0"
            max={new Date().getFullYear()}
            onUpdate={onUpdate}
            required={requiredFields?.includes('yearTaken')}
          />
          <div>
            <label>
              If exact year is unknown, please provide a decade range
            </label>
            <span>
              <select
                name="decade-select-start"
                id="decade-select-start"
                value={formData.startDecade || ''}
                onChange={(e) => onUpdate({ startDecade: e.target.value })}
              >
                <option value="">
                  --Start decade--
                </option>
                {VALID_DECADES.map((decade) => (
                  <option key={decade} value={decade}>
                    {decade}
                  </option>
                ))}
              </select>
              —
              <select
                name="decade-select-end"
                id="decade-select-end"
                value={formData.endDecade || ''}
                onChange={(e) => onUpdate({ endDecade: e.target.value })}
              >
                <option value="">
                  --End decade--
                </option>
                {VALID_DECADES.map((decade) => (
                  <option
                    key={decade}
                    value={decade}
                    disabled={decade < formData.startDecade}
                  >
                    {decade}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
        <div className="section">
          <h3>General Information</h3>
          <InputField
            title={
              <>
                Associated craft workshop name <small>(if applicable)</small>
              </>
            }
            fieldName="workshopName"
            value={formData.workshopName}
            onUpdate={onUpdate}
            required={requiredFields?.includes('workshopName')}
          />
          <InputField
            title={
              <>
                Associated workshop owner name <small>(optional - name may be publicly displayed)</small>
              </>
            }
            fieldName="ownerName"
            value={formData.ownerName}
            onUpdate={onUpdate}
            required={requiredFields?.includes('ownerName')}
          />
        </div>
        <div className="section">
          <h3>Reference Information</h3>
          <InputField
            title="Type of Refrence"
            fieldName="typeOfReference"
            type="select"
            value={formData.typeOfReference}
            onUpdate={onUpdate}
            required={requiredFields?.includes('typeOfReference')}
          >
            <option value="Owner of personal photo">Owner of personal photo (I have the rights to share this image)</option>
            <option value="Print source">Print source (book, newspaper, magazine, article, printed periodical, etc.)</option>
            <option value="Electronic source">Electronic source (database, website, blog, social media, etc.)</option>
          </InputField>
          {formData.typeOfReference == "Owner of personal photo" && 
            <InputField
              title={
                <>
                  Name of person submitting the photo <br/> <small>(optional - if no name is included, the photo will be submitted anonymously)</small>
                </>
              }
              fieldName="referenceName"
              type="text"
              value={formData.referenceName}
              onUpdate={onUpdate}
              required={requiredFields?.includes('referenceName')}
            />
          }
          {
            (formData.typeOfReference == "Print source" || formData.typeOfReference == "Electronic source") &&
            <InputField
              title={
                <>
                  Reference source citation
                </>
              }
              fieldName="referenceSourceCitation"
              type="text"
              value={formData.referenceName}
              onUpdate={onUpdate}
              required={requiredFields?.includes('referenceSourceCitation')}
            />
          }
          <InputField
            title="Any additional copyright information?"
            type="textarea"
            fieldName="referenceCopyright"
            value={formData.referenceCopyright}
            onUpdate={onUpdate}
            required={requiredFields?.includes('referenceCopyright')}
          />
        </div>
      </div>
    </form>
  );
};

export default ArchiveAboutForm;
