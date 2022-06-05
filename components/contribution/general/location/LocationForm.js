import InputField from '../InputField';
import LocationSelect from './LocationSelect';
import { useState, useEffect } from 'react';

const LocationForm = ({
  onUpdate,
  formData,
  formSchema,
  pageName,
  mapCaption,
}) => {
  const [workshops, setWorkshops] = useState([]);
  const [archive, setArchive] = useState([]);

  const page = formSchema.pages.location
  const fields = page.fields

  useEffect(() => {
    console.log('fetching');

    Promise.all([fetch('/api/workshops'), fetch('/api/archive')]).then(
      ([workshopsResponse, archiveResponse]) => {
        Promise.all([workshopsResponse.json(), archiveResponse.json()]).then(
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
            fields.lat.required || fields.lng.required
              ? 'required'
              : ''
          }
          key="LatLngLabel"
        >
          {mapCaption
            ? mapCaption
            : 'Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.'}
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
      <h2>{page.title}</h2>
      <div className="forms">
        <div className="address-form">
          <h3>Address</h3>
          <small>(English Preferred)</small>
          <div className="address-form-inputs">
            <InputField
              title={fields.building_number.title}
              fieldName={fields.building_number.field_name}
              key={fields.building_number.field_name}
              value={formData[fields.building_number.field_name]}
              onUpdate={onUpdate}
              required={fields.building_number.required ? true : false}
            />
            <InputField
              title={fields.street.title}
              fieldName={fields.street.field_name}
              key={fields.street.field_name}
              value={formData[fields.street.field_name]}
              onUpdate={onUpdate}
              required={fields.street.required ? true : false}
            />

            <InputField
              title={fields.quarter.title}
              type="select-with-other"
              fieldName={fields.quarter.field_name}
              key={fields.quarter.field_name}
              value={formData[fields.quarter.field_name]}
              onUpdate={onUpdate}
              required={fields.quarter.required ? true : false}
            >
              {[
                ...new Set(
                  workshops.map((workshop) => {
                    return workshop.location.adm3;
                  })
                ),
              ]
                .filter((workshop) => workshop)
                .sort()
                .map((quarter) => {
                  return <option key={quarter} value={quarter}>{quarter}</option>;
                })}
              ;
            </InputField>
            <InputField
              title={fields.sector.title}
              type="select-with-other"
              fieldName={fields.sector.field_name}
              key={fields.sector.field_name}
              value={formData[fields.sector.field_name]}
              onUpdate={onUpdate}
              required={fields.sector.required ? true : false}
            >
              {[
                ...new Set(
                  workshops.map((workshop) => {
                    return workshop.location.adm4;
                  })
                ),
              ]
                .filter((workshop) => workshop)
                .sort()
                .map((sector) => {
                  return <option key={sector} value={sector}>{sector}</option>;
                })}
              ;
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
