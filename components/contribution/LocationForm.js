import LocationSelect from './LocationSelect';

const LocationForm = ({ onUpdate, formData }) => {
  return (
    <form
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div>
        <h3>Address Information</h3>
        <div style={{ display: 'flex' }}>
          <div>
            <label htmlFor="building-number">Building number</label>
            <input
              type="text"
              name="building-number"
              id="building-number"
              value={formData.buildingNumber || ''}
              onChange={(e) => onUpdate({ buildingNumber: e.target.value })}
            />
            <label htmlFor="street">Street name/number</label>
            <input
              type="text"
              name="street name/number"
              id="street"
              value={formData.street || ''}
              onChange={(e) => onUpdate({ street: e.target.value })}
            />
            <label htmlFor="municipality">Municipality</label>
            <input
              type="text"
              name="municipality"
              id="municipality"
              value={formData.municipality || ''}
              onChange={(e) => onUpdate({ municipality: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="building-number-ar">
              Arabic House/Building number
            </label>
            <input
              type="text"
              name="building-number-ar"
              id="building-number-ar"
              value={formData.buildingNumberAr || ''}
              onChange={(e) => onUpdate({ buildingNumberAr: e.target.value })}
            />

            <label htmlFor="street-ar">Arabic Street name/number</label>
            <input
              type="text"
              name="street-ar"
              id="street-ar"
              value={formData.streetAr || ''}
              onChange={(e) => onUpdate({ streetAr: e.target.value })}
            />
            <label htmlFor="municipality-ar">Arabic Municipality</label>
            <input
              type="text"
              name="municipality-ar"
              id="municipality-ar"
              value={formData.municipalityAr || ''}
              onChange={(e) => onUpdate({ municipalityAr: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div>
        <h3>Point Location</h3>
        <label htmlFor="">Add shop point</label>
        <div style={{ width: '500px', height: '500px', marginBottom: '200px' }}>
          <LocationSelect onUpdate={onUpdate} />
        </div>
      </div>
    </form>
  );
};

export default LocationForm;
