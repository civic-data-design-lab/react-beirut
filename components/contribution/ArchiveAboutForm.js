import { IMAGE_TYPES, VALID_DECADES } from '../../lib/utils';

const ArchiveAboutForm = ({ onUpdate, formData }) => {
  return (
    <form className="ArchiveAboutForm">
      <h2>About the Archive</h2>
      <div className="sections">
        <div className="section">
          <h3>Image Information</h3>
          <div>
            <label htmlFor="image-type">What is the image showing?</label>
            <select
              name="Image Type"
              id="image-type"
              value={formData.imageType || ''}
              onChange={(e) => onUpdate({ imageType: e.target.value })}
            >
              <option disabled value="">
                --Select a type--
              </option>
              {IMAGE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
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
          <div>
            <label htmlFor="reference-name">Name of reference</label>
            <input
              id="reference-name"
              type="text"
              value={formData.referenceName || ''}
              onChange={(e) => onUpdate({ referenceName: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="reference-url">
              URL for reference <small>(if applicable)</small>
            </label>
            <input
              id="reference-url"
              type="url"
              value={formData.referenceUrl || ''}
              onChange={(e) => onUpdate({ referenceUrl: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="reference-copyright">
              Any additional copyright information?
            </label>
            <textarea
              id="reference-copyright"
              type="text"
              value={formData.referenceCopyright || ''}
              onChange={(e) => onUpdate({ referenceCopyright: e.target.value })}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ArchiveAboutForm;
