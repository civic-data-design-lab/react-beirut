import InputField from '../InputField';
import LocationSelect from './LocationSelect';
import { useState, useEffect } from 'react';
import { BEIRUT_ZONES } from '../../../../lib/utils';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

import { Trans, useTranslation } from "react-i18next";


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
  i18n
}) => {

  const {t} = useTranslation();
  const [workshops, setWorkshops] = useState([]);
  const [archive, setArchive] = useState([]);

  const page = formSchema.pages.location;
  const fields = page.fields;

  const handleUpdate = (data) => {
    const newLocation = { lat: data.lat, lng: data.lng };
    onUpdate(newLocation);
    return;
  };


  const findOther = (field) => {
    if (field==='quarter') {
        let quarters = BEIRUT_ZONES.quarters.map((obj)=> {return obj.EN})
        if (formData.quarter && !quarters.includes(formData.quarter)) {
          return true
        } else {
          return false
        }
    } else if (field === "sector") {
      if (formData.quarter) {
        //console.log('case 1')
        let filteredSectors = BEIRUT_ZONES.quarters
            .filter((quarter) => quarter.EN === formData.quarter)
            .map((quarter) => quarter.sectors)
            .flat()
            .map((sector) => {return t(sector.EN)})

        //console.log('filtered sectors ', filteredSectors)

        if (formData.sector && !filteredSectors.includes(formData.sector)) {
          //console.log("chech case 1 ", formData.sector, filteredSectors)
          return true
        } else {
          return false
        }
      } else if (!formData.quarter) {
        //console.log('case 2')
        let allSectors = BEIRUT_ZONES.quarters.map((obj) => {
          obj.sectors.map((sector) => {
            return t(sector)
          })
        })
        if (formData.sector && !allSectors.includes(formData.sector)) {
          return true
        } else {
          return false
        }
      }
    }
  }

  const [otherQuarterExists, setOtherQuarterExists] = useState(findOther('quarter'))
  const [otherSectorExists, setOtherSectorExists] = useState(findOther('sector'))

  //useEffect(()=>{
  //  setOtherExists(findOther())
  //  console.log("updated ", otherExists, formData.quarter||null)
  //}, [])

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
          <div className={'form-title'}><h2>{t(page.title)}</h2></div>
          <div className="forms sections">
            <div className="address-form section">
              <div className={'subsection'}>
              <h3 className={'Contribute-form-section-heading'}>{t('Address')}</h3>
              <small>{t('(English Preferred)')}</small>
              <div className="address-form-inputs">
                <InputField
                  title={t(fields.building_number.title)}
                  fieldName={fields.building_number.field_name}
                  key={fields.building_number.field_name}
                  value={formData[fields.building_number.field_name]}
                  onUpdate={onUpdate}
                  required={fields.building_number.required ? true : false}
                />
                <InputField
                  title={t(fields.street.title)}
                  fieldName={fields.street.field_name}
                  key={fields.street.field_name}
                  value={formData[fields.street.field_name]}
                  onUpdate={onUpdate}
                  required={fields.street.required ? true : false}
                />

                {/* TODO: Update quarter/sector automatically with an answer from either. Ie: selecting quarter filters sectors. Selecting sector also selects quarter. */}
                <InputField
                  title={t(fields.quarter.title)}
                  type="select-with-other"
                  fieldName={fields.quarter.field_name}
                  key={fields.quarter.field_name}
                  value={formData[fields.quarter.field_name]}
                  otherExists={otherQuarterExists}
                  setOtherExists={setOtherQuarterExists}
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
                          {t(quarter.EN)}
                        </option>
                      );
                    })}
                </InputField>
                <InputField
                  title={t(fields.sector.title)}
                  type="select-with-other"
                  fieldName={fields.sector.field_name}
                  key={fields.sector.field_name}
                  value={formData[fields.sector.field_name]}
                  otherExists={otherSectorExists}
                  setOtherExists={setOtherSectorExists}
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
                        {t(sector.EN)}
                      </option>
                    );
                  })}
                </InputField>
              </div>
              </div>
          </div>
            <Desktop><div className={'vr'}></div></Desktop>
              <Mobile><hr/></Mobile>
              <Tablet><hr/></Tablet>
            <div className="LocationForm-location-select section">
              <div className={'subsection'}>
              <h3 className={'Contribute-form-section-heading'}>{t('Point Location')}</h3>
              {showLatLng()}

              <LocationSelect onUpdate={handleUpdate} formData={formData} i18n={i18n} />
              <p className="location-select-hint">
                {t('Drag marker to change the location')}
              </p>
            </div>
          </div>
        </div>
      </form>

  );
};

export default LocationForm;
