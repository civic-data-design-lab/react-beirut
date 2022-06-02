import InputField from '../InputField';
import LocationSelect from './LocationSelect';
import { useState, useEffect } from 'react';

const LocationForm = ({ onUpdate, formData, title, requiredFields, mapCaption }) => {

  const [workshops, setWorkshops] = useState([]);
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    console.log('fetching');

    Promise.all([fetch('/api/workshops'), fetch('/api/archive')])
    .then(
      ([workshopsResponse, archiveResponse]) => {
        Promise.all([workshopsResponse.json(), archiveResponse.json()])
        .then(
          ([workshopsData, archiveData]) => {
            setWorkshops(workshopsData.response);
            setArchive(archiveData.response);
          }
        );
      }
    );
  }, []);
  

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
          key="LatLngLabel"
        >
          {mapCaption ? mapCaption : "Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly."}
        </label>
      );
    }
    return (
      <small key="LatitudeAndLongitude">
        Current: {`(${formData.lat.toFixed(6)}, ${formData.lng.toFixed(6)})`}
      </small>
    );
  };

  return (
    <form className="LocationForm">
      <h2>{title || 'Craft Workshop Location'}</h2>
      <div className="forms">
        <div className="address-form">
          <h3>Address</h3>
          <small>(English Preferred)</small>
          <div className="address-form-inputs">
            <InputField
              title="Building number"
              fieldName="buildingNumber"
              key="buildingNumber"
              value={formData.buildingNumber}
              onUpdate={onUpdate}
              required={requiredFields?.includes('buildingNumber')}
            />
            <InputField
              title="Street name/number"
              fieldName="street"
              key="street"
              value={formData.street}
              onUpdate={onUpdate}
              required={requiredFields?.includes('street')}
            />

            <InputField
              title="Quarter"
              type="select-with-other"
              fieldName="quarter"
              key="quarter"
              value={formData.quarter}
              onUpdate={onUpdate}
              required={requiredFields?.includes('quarter')}>
                {
                  [... new Set(
                    workshops.map((workshop) => {return workshop.location.adm3;}))].filter(workshop => workshop).sort().map( (quarter) => {
                    return <option value={quarter}>{quarter}</option>
                  })
                };
            </InputField>
            <InputField
              title="Sector"
              type="select-with-other"
              fieldName="sector"
              key="sector"
              value={formData.sector}
              onUpdate={onUpdate}
              required={requiredFields?.includes('sector')}>
                {
                  [... new Set(
                    workshops.map((workshop) => {return workshop.location.adm4;}))].filter(workshop => workshop).sort()
                    .map( (sector) => {
                    return <option value={sector}>{sector}</option>
                  })
                };
            </InputField>
            {/* Reference: https://www.lebanesearabicinstitute.com/areas-beirut/#Sectors_of_Beirut */}
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
