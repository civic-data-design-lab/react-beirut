import InputField from '../general/InputField';
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

import {TRANSLATIONS} from "/lib/utils";

import i18n from "i18next";
import { Trans, useTranslation, initReactI18next } from "react-i18next";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);

/**
 * The Archive about form updates the following fields:
 * - imageType
 * - yearTaken (e.g. `'2022`) *[yearTaken OR (startDecade AND endDecade)]
 * - startDecade (e.g. `'1930'`) *[yearTaken OR (startDecade AND endDecade)]
 * - endDecade *[yearTaken OR (startDecade AND endDecade)]
 * - workshopName
 * - ownerName
 * - typeOfReference
 * - referenceName (Appears if typeOfReference == "Owner of personal photo")
 * - referenceSourceCitation (Appears if typeOfReference !="Owner of personal photo")
 * - referenceCopyright
 *
 * @param {function} onUpdate - Function to call when the form is updated.
 * @param {object} formData - The form data to use.
 * @param {string[]} requiredFields - List of required fields for this form. See
 *    applicable fields above.
 * @param {function} setRequiredFields - Function that can be used to set the required fields. This is used to update the required fields when a certain option is selected.
 * @returns {React.Component}
 */
const ArchiveAboutForm = ({
  onUpdate,
  formData,
  formSchema,
  requiredFields,
}) => {

  const page = formSchema.pages.about;
  const fields = page.fields;
  const {t} = useTranslation();

  return (
    <form className="ArchiveAboutForm">
      <div className={'form-title'}><h2>{t(page.title)}</h2></div>
      <div className="sections">
        <div className="section">
          <div className='subsection'>
          <h3 className={'Contribute-form-section-heading'}>{t('General Information')}</h3>
          <InputField
            title={
              <>
              {t('Associated craft workshop name')} <br/> <small>{t('if applicable')}</small>
              </>
            }
            fieldName={fields.workshop_name.field_name}
            value={formData[fields.workshop_name.field_name]}
            onUpdate={onUpdate}
            required={fields.workshop_name.required}
          />
          <InputField
            title={
              <>
                {t('Associated workshop owner name')}
                <br/>
                <small>{t('(optional - name may be publicly displayed)')}</small>
              </>
            }
            fieldName={fields.owner_name.field_name}
            value={formData[fields.owner_name.field_name]}
            onUpdate={onUpdate}
            required={fields.owner_name.required}
          />
            </div>
        </div>
        <Desktop><div className={'vr'}></div></Desktop>
              <Mobile><hr/></Mobile>
              <Tablet><hr/></Tablet>
        <div className="section">
          <div className={'subsection'}>
          <h3 className={'Contribute-form-section-heading'}>{t('Reference Information')}</h3>
          <InputField
            title={fields.type_of_reference.title}
            fieldName={fields.type_of_reference.field_name}
            type="select"
            value={formData[fields.type_of_reference.field_name]}
            onUpdate={onUpdate}
            required={fields.type_of_reference.required}
          >
            <option value="Owner of personal photo">
              {t('Owner of personal photo (I have the rights to share this image)')}
            </option>
            <option value="Print source">
              {t('Print source (book, newspaper, magazine, article, printed periodical, etc.)')}
            </option>
            <option value="Electronic source">
              {t('Electronic source (database, website, blog, social media, etc.)')}
            </option>
          </InputField>
          {formData[fields.type_of_reference.field_name] == 'Owner of personal photo' && (
            <InputField
              title={
                <>
                  {t('Name of person submitting the photo')} <br />{' '}
                  <small>
                    {t('(optional - if no name is included, the photo will be submitted anonymously)')}
                  </small>
                </>
              }
              fieldName={fields.reference_name.field_name}
              type="text"
              value={formData[fields.reference_name.field_name]}
              onUpdate={onUpdate}
              required={fields.reference_name.required}
            />
          )}
          {(formData[fields.type_of_reference.field_name] == 'Print source' ||
            formData[fields.type_of_reference.field_name] == 'Electronic source') && (
            <InputField
              title={fields.reference_source_citation.title}
              fieldName={fields.reference_source_citation.field_name}
              type="text"
              value={formData[fields.reference_source_citation.field_name]}
              onUpdate={onUpdate}
              required={true}
            />
          )}
          <InputField
            title={t('Any additional copyright information?')}
            type="textarea"
            fieldName={fields.reference_copyright.field_name}
            value={formData[fields.reference_copyright.field_name]}
            onUpdate={onUpdate}
            required={fields.reference_copyright.required}
          />
        </div>
          </div>
      </div>
    </form>
  );
};

export default ArchiveAboutForm;
