import LocationSelect from './LocationSelect';

const LocationForm = ({ onUpdate, formData, title }) => {
  const handleUpdate = (data) => {
    const newLocation = { lat: data.lat, lng: data.lng };
    onUpdate(newLocation);
    return;
  };

  const showLatLng = () => {
    if (!formData.lat || !formData.lng) {
      return <label>Add shop point</label>;
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
            <div>
              <label htmlFor="building-number">Building number</label>
              <input
                type="text"
                name="building-number"
                id="building-number"
                value={formData.buildingNumber || ''}
                onChange={(e) => onUpdate({ buildingNumber: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="street">Street name/number</label>
              <input
                type="text"
                name="street name/number"
                id="street"
                value={formData.street || ''}
                onChange={(e) => onUpdate({ street: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="municipality">Municipality</label>
              <input
                type="text"
                name="municipality"
                id="municipality"
                value={formData.municipality || ''}
                onChange={(e) => onUpdate({ municipality: e.target.value })}
              />
            </div>

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
          <p className='location-select-hint'>Drag marker to change the location</p>
        </div>
      </div>
    </form>
  );
};

export default LocationForm;
