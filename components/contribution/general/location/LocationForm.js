import InputField from '../InputField';
import LocationSelect from './LocationSelect';
import { useState, useEffect } from 'react';
import { BEIRUT_ZONES } from '../../../../lib/utils';

const sortByStringAttribute = (array, attributeName) => {
  return array.sort((a, b) => {
    const nameA = a[attributeName].toUpperCase(); // ignore upper and lowercase
    const nameB = b[attributeName].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

const LocationForm = ({
  onUpdate,
  formData,
  formSchema,
  pageName,
  mapCaption,
}) => {
  const [workshops, setWorkshops] = useState([]);
  const [archive, setArchive] = useState([]);

  const page = formSchema.pages.location;
  const fields = page.fields;

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
            fields.lat.required || fields.lng.required ? 'required' : ''
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
          <div className={'form-title'}><h2>{page.title}</h2></div>
          <div className="forms sections">
            <div className="address-form section">
              <div className={'subsection'}>
              <h3 className={'Contribute-form-section-heading'}>Address</h3>
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

                {/* TODO: Update quarter/sector automatically with an answer from either. Ie: selecting quarter filters sectors. Selecting sector also selects quarter. */}
                <InputField
                  title={fields.quarter.title}
                  type="select-with-other"
                  fieldName={fields.quarter.field_name}
                  key={fields.quarter.field_name}
                  value={formData[fields.quarter.field_name]}
                  onUpdate={(newData) => {
                      onUpdate(newData)
                    }
                  }
                  required={fields.quarter.required ? true : false}
                >
                  {sortByStringAttribute(BEIRUT_ZONES.quarters, 'EN')
                    .map((quarter) => {
                      return (
                        <option key={quarter.EN} value={quarter.EN}>
                          {quarter.EN}
                        </option>
                      );
                    })}
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
                  {sortByStringAttribute(
                    BEIRUT_ZONES.quarters
                      // Filter if a quarter is selected
                      .filter((quarter) => formData[fields.quarter.field_name] ? quarter.EN == formData[fields.quarter.field_name] : true)
                      .map((quarter) => quarter.sectors)
                      .flat(),
                    'EN'
                  ).map((sector) => {
                    return (
                      <option key={sector.EN} value={sector.EN}>
                        {sector.EN}
                      </option>
                    );
                  })}
                </InputField>
              </div>
              </div>
          </div>
            <div className={'vr'}></div>
            <div className="LocationForm-location-select section">
              <div className={'subsection'}>
              <h3 className={'Contribute-form-section-heading'}>Point Location</h3>
              {showLatLng()}

              <LocationSelect onUpdate={handleUpdate} />
              <p className="location-select-hint">
                Drag marker to change the location
              </p>
            </div>
          </div>
        </div>
      </form>

  );
};

export default LocationForm;
