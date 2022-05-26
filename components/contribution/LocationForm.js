import InputField from './InputField';
import LocationSelect from './LocationSelect';

const LocationForm = ({ onUpdate, formData, title, requiredFields }) => {
  const handleUpdate = (data) => {
    const newLocation = { lat: data.lat, lng: data.lng };
    onUpdate(newLocation);
    return;
  };

  const showLatLng = () => {
    if (!formData.lat || !formData.lng) {
      return (
        <label
          className={
            requiredFields.includes('lat') || requiredFields.includes('lng')
              ? 'required'
              : ''
          }
        >
          Add shop point
        </label>
      );
    }

    return (
      <small>
        Current: {`(${formData.lat.toFixed(6)}, ${formData.lng.toFixed(6)})`}
      </small>
    );
  };

  return (
    <form className="LocationForm">
      <h2>{title || 'Location Information'}</h2>
      <div className="forms">
        <div className="address-form">
          <h3>Address Information</h3>
          <small>(English Preferred)</small>
          <div className="address-form-inputs">
            <InputField
              title="Building number"
              fieldName="buildingNumber"
              value={formData.buildingNumber}
              onUpdate={onUpdate}
              required={requiredFields?.includes('buildingNumber')}
            />
            <InputField
              title="Street name/number"
              fieldName="street"
              value={formData.street}
              onUpdate={onUpdate}
              required={requiredFields?.includes('street')}
            />

            <InputField
              title="Municipality"
              fieldName="municipality"
              value={formData.municipality}
              onUpdate={onUpdate}
              required={requiredFields?.includes('municipality')}
            />
            {/* <div>
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
          </div> */}
          </div>
        </div>
        <div className="LocationForm-location-select">
          <h3>Point Location</h3>
          {showLatLng()}

          <LocationSelect onUpdate={handleUpdate} />
          <p className="location-select-hint">
            Drag marker to change the location
          </p>
        </div>
      </div>
    </form>
  );
};

export default LocationForm;
