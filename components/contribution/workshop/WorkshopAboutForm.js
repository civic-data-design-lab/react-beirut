import InputField from '../general/InputField';
import { useMediaQuery } from 'react-responsive';
import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';
import { CRAFT_CATEGORIES, CRAFT_TYPES } from '../../../lib/utils';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

import { Trans, useTranslation } from 'react-i18next';

const WorkshopAboutForm = ({
  onUpdate,
  formData,
  formSchema,
  highlightedFields,
}) => {
  const { t } = useTranslation();
  const page = formSchema.pages.about;
  const fields = page.fields;

  return (
    <form className="WorkshopAboutForm">
      <div className={'form-title'}>
        <h2>{t(page.title)}</h2>
      </div>

      <div className="sections">
        <div className="section">
          <div className={'subsection'}>
            <h3 className={'Contribute-form-section-heading'}>
              {t('Shop Name')}
            </h3>
            <InputField
              title={t(fields.shop_name.title)}
              fieldName={fields.shop_name.field_name}
              value={t(formData[fields.shop_name.field_name])}
              onUpdate={onUpdate}
              type="text"
              required={fields.shop_name.required}
              highlight={highlightedFields?.includes(
                fields.shop_name.field_name
              )}
            />
          </div>

          <div className={'subsection'}>
            <h3 className={'Contribute-form-section-heading'}>
              {t('Operation')}
            </h3>
            {/* This input was changed from a date to numerical year. Check that data still works here. */}
            <InputField
              title={t(fields.year_established.title)}
              fieldName={fields.year_established.field_name}
              value={t(formData[fields.year_established.field_name])}
              type="year"
              onUpdate={onUpdate}
              required={fields.year_established.required}
              highlight={highlightedFields?.includes(
                fields.year_established.field_name
              )}
            />
            <InputField
              title={t(fields.status.title)}
              fieldName={fields.status.field_name}
              value={t(formData[fields.status.field_name])}
              type="select"
              onUpdate={onUpdate}
              required={fields.status.required}
              highlight={highlightedFields?.includes(fields.status.field_name)}
            >
              <option value="open">{t('Open')}</option>
              <option value="closed_temp">{t('Closed (temporary)')}</option>
              <option value="closed_perm">{t('Closed (permanent)')}</option>
              <option value="destroyed">{t('Destroyed')}</option>
            </InputField>
          </div>
        </div>

        <div className="section">
          <div className={'subsection'}>
            <h3 className="required Contribute-form-section-heading">
              {t('Business Contact Information')}
            </h3>
            {/* Removed per Ashley.
            <InputField
              title="Owner Name"
              fieldName="ownerName"
              type="text"
              value={formData.ownerName}
              onUpdate={onUpdate}
              required={requiredFields?.includes('ownerName')}
              highlight={highlightedFields?.includes('ownerName')}
            /> */}

            <p>
              {t(
                'This information will be publicly available on the Living Heritage Atlas | Beirut database and website.'
              )}
            </p>

            {/* TODO: Make this into an info "i" note. */}
            <InputField
              title={t(fields.phone.title)}
              fieldName={fields.phone.field_name}
              type="tel"
              value={formData[fields.phone.field_name]}
              onUpdate={onUpdate}
              required={fields.phone.required}
              highlight={highlightedFields?.includes(fields.phone.field_name)}
            />
            <InputField
              title={t(fields.email.title)}
              fieldName={fields.email.field_name}
              type="email"
              value={formData[fields.email.field_name]}
              onUpdate={onUpdate}
              required={fields.email.required}
              highlight={highlightedFields?.includes(fields.email.field_name)}
            />

            <InputField
              title={t(fields.website.title)}
              fieldName={fields.website.field_name}
              type="url"
              value={formData[fields.website.field_name]}
              onUpdate={onUpdate}
              required={fields.website.required}
              highlight={highlightedFields?.includes(fields.website.field_name)}
            />
            <InputField
              title={t(fields.facebook.title)}
              fieldName={fields.facebook.field_name}
              type="url"
              value={formData[fields.facebook.field_name]}
              onUpdate={onUpdate}
              required={fields.facebook.required}
              highlight={highlightedFields?.includes(
                fields.facebook.field_name
              )}
            />
            <InputField
              title={t(fields.instagram.title)}
              fieldName={fields.instagram.field_name}
              type="instagram_handle"
              value={formData[fields.instagram.field_name]}
              onUpdate={onUpdate}
              required={fields.instagram.required}
              highlight={highlightedFields?.includes(
                fields.instagram.field_name
              )}
            />
            <InputField
              title={t(fields.twitter.title)}
              fieldName={fields.twitter.field_name}
              type="twitter_handle"
              value={formData[fields.twitter.field_name]}
              onUpdate={onUpdate}
              required={fields.twitter.required}
              highlight={highlightedFields?.includes(fields.twitter.field_name)}
            />
            <InputField
              title={t(fields.other_social_media.title)}
              fieldName={fields.other_social_media.field_name}
              type="text"
              value={formData[fields.other_social_media.field_name]}
              onUpdate={onUpdate}
              required={fields.other_social_media.required}
              highlight={highlightedFields?.includes(
                fields.other_social_media.field_name
              )}
            />

            {(() => {
              const contactRequirement =
                page.custom_reqs.contact_requirement.function(formData);
              return (
                !contactRequirement.requirementFulfilled && (
                  <small className="input-error">
                    * {t(contactRequirement.errorMessage)}
                  </small>
                )
              );
            })()}
          </div>
        </div>

        <div className={'section'}>
          <div className={'subsection'}>
            <h3 className="required Contribute-form-section-heading">
              {t('Craft Information')}
            </h3>
            <BooleanButtonForm
              onUpdate={onUpdate}
              formData={formData}
              title={fields.craft_category.title}
              dataLocation={fields.craft_category.field_name}
              label={t(
                'What category of crafts are produced in this workshop?'
              )}
              selectionsAllowed="2"
              defaultTags={CRAFT_CATEGORIES}
              required={fields.craft_category.required ? true : false}
            />
          </div>
          <div className={'subsection'}>
            <BooleanButtonForm
              onUpdate={onUpdate}
              formData={formData}
              title={fields.type_of_craft.title}
              dataLocation={fields.type_of_craft.field_name}
              label={t(
                'What type of crafts are produced in this workshop? If entering a custom type, English is preferred.'
              )}
              defaultTags={CRAFT_TYPES}
              required={fields.type_of_craft.required ? true : false}
              hasOtherField={true}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default WorkshopAboutForm;
