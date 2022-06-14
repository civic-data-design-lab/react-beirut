import InputField from '../general/InputField';
import { useMediaQuery } from 'react-responsive';
import BooleanButtonForm from "../general/booleanButtonForm/BooleanButtonForm";
import { CRAFT_CATEGORIES, CRAFT_TYPES } from '../../../lib/utils'

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


const WorkshopAboutForm = ({
  onUpdate,
  formData,
  formSchema,
  highlightedFields,
}) => {
  const page = formSchema.pages.about;
  const fields = page.fields;

  return (
    <form className="WorkshopAboutForm">
      <div className={'form-title'}><h2>{page.title}</h2></div>

      <div className="sections">
        <div className="section">
          <div className={'subsection'}>
            <h3 className={'Contribute-form-section-heading'}>Shop Name</h3>
            <InputField
              title={fields.shop_name.title}
              fieldName={fields.shop_name.field_name}
              value={formData[fields.shop_name.field_name]}
              onUpdate={onUpdate}
              type="text"
              required={fields.shop_name.required}
              highlight={highlightedFields?.includes(fields.shop_name.field_name)}
            />
          </div>

          <div className={'subsection'}>
            <h3 className={'Contribute-form-section-heading'}>Operation</h3>
          {/* This input was changed from a date to numerical year. Check that data still works here. */}
            <InputField
              title={fields.year_established.title}
              fieldName={fields.year_established.field_name}
              value={formData[fields.year_established.field_name]}
              type="year"
              onUpdate={onUpdate}
              required={fields.year_established.required}
              highlight={highlightedFields?.includes(
                fields.year_established.field_name
              )}
            />
            <InputField
              title={fields.status.title}
              fieldName={fields.status.field_name}
              value={formData[fields.status.field_name]}
              type="select"
              onUpdate={onUpdate}
              required={fields.status.required}
              highlight={highlightedFields?.includes(fields.status.field_name)}
            >
              <option value="open">Open</option>
              <option value="closed_temp">Closed (temporary)</option>
              <option value="closed_perm">Closed (permanent)</option>
              <option value="destroyed">Destroyed</option>
            </InputField>
          </div>


        </div>



        <div className="section">
          <div className={'subsection'}>
            <h3 className="required Contribute-form-section-heading">Business Contact Information</h3>
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
            This information will be publicly available on the <br />
            Living Heritage Atlas | Beirut database and website.
            </p>

            {/* TODO: Make this into an info "i" note. */}
            <InputField
              title={fields.phone.title}
              fieldName={fields.phone.field_name}
              type="tel"
              value={formData[fields.phone.field_name]}
              onUpdate={onUpdate}
              required={fields.phone.required}
              highlight={highlightedFields?.includes(fields.phone.field_name)}
            />
            <InputField
              title={fields.email.title}
              fieldName={fields.email.field_name}
              type="email"
              value={formData[fields.email.field_name]}
              onUpdate={onUpdate}
              required={fields.email.required}
              highlight={highlightedFields?.includes(fields.email.field_name)}
            />

            <InputField
              title={fields.website.title}
              fieldName={fields.website.field_name}
              type="url"
              value={formData[fields.website.field_name]}
              onUpdate={onUpdate}
              required={fields.website.required}
              highlight={highlightedFields?.includes(fields.website.field_name)}
            />
            <InputField
              title={fields.social_media.title}
              fieldName={fields.social_media.field_name}
              type="url"
              value={formData[fields.social_media.field_name]}
              onUpdate={onUpdate}
              required={fields.social_media.required}
              highlight={highlightedFields?.includes(
                fields.social_media.field_name
              )}
            />
            {(() => {
              const contactRequirement =
                page.custom_reqs.contact_requirement.function(formData);
              return (
                !contactRequirement.requirementFulfilled && (
                  <small className="input-error">
                    * {contactRequirement.errorMessage}
                  </small>
                )
              );
            })()}
          </div>
        </div>


        <div className={'section'}>
          <div className={'subsection'}>
            <h3 className="required Contribute-form-section-heading">Craft Information</h3>
            <BooleanButtonForm
              onUpdate={onUpdate}
              formData={formData}
              title={fields.craft_category.title}
              dataLocation={fields.craft_category.field_name}
              label="What category of crafts are produced in this workshop?"
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
              label="What type of crafts are produced in this workshop? If entering a custom type, English is preferred."
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
