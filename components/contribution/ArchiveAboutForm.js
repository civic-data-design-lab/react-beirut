import { IMAGE_TYPES, VALID_DECADES } from '../../lib/utils';
import InputField from './InputField';

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
          <div>
            <label htmlFor="date-taken">When was the image taken?</label>
            <input
              id="date-taken"
              type="date"
              value={formData.dateTaken || ''}
              onChange={(e) => onUpdate({ dateTaken: e.target.value })}
            />
          </div>
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
          <div>
            <label htmlFor="workshop-name">
              Associated craft workshop name <small>(if applicable)</small>
            </label>
            <input
              id="workshop-name"
              type="text"
              value={formData.workshopName || ''}
              onChange={(e) => onUpdate({ workshopName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="owner-name">
              Associated workshop owner name <small>(if applicable)</small>
            </label>
            <input
              id="owner-name"
              type="text"
              value={formData.ownerName || ''}
              onChange={(e) => onUpdate({ ownerName: e.target.value })}
            />
          </div>
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
