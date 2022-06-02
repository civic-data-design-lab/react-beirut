import { IMAGE_TYPES, VALID_DECADES } from '../../lib/utils';
import InputField from './InputField';

/**
 * The Archive about form updates the following fields:
 * - `imageType`
 * - `yearTaken` (e.g. `'2022`) *[yearTaken OR (startDecade AND endDecade)]
 * - `startDecade` (e.g. `'1930'`) *[yearTaken OR (startDecade AND endDecade)]
 * - `endDecade` *[yearTaken OR (startDecade AND endDecade)]
 * - `workshopName`
 * - `ownerName`
 * - `referenceName`
 * - `referenceUrl`
 * - `referenceCopyright`
 *
 * @param {function} onUpdate - Function to call when the form is updated.
 * @param {object} formData - The form data to use.
 * @param {string[]} requiredFields - List of required fields for this form. See
 *    applicable fields above.
 * @returns {React.Component}
 */
const ArchiveAboutForm = ({ onUpdate, formData, requiredFields }) => {
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
            value={formData.imageType}
            onUpdate={onUpdate}
            required={requiredFields?.includes('imageType')}
          >
            <option disabled value="">
              --Select a type--
            </option>
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
                <option disabled value="">
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
                <option disabled value="">
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
            title="Name of reference"
            fieldName="referenceName"
            value={formData.referenceName}
            onUpdate={onUpdate}
            required={requiredFields?.includes('referenceName')}
          />
          <InputField
            title={
              <>
                URL for reference <small>(if applicable)</small>
              </>
            }
            fieldName="referenceUrl"
            type="url"
            value={formData.referenceUrl}
            onUpdate={onUpdate}
            required={requiredFields?.includes('referenceUrl')}
          />
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
