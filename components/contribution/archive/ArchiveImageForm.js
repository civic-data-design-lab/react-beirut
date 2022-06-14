import ImageUploadForm from '../general/imageUpload/ImageUploadForm';
import InputField from '../general/InputField';
import { IMAGE_TYPES, VALID_DECADES, CRAFT_CATEGORIES, CRAFT_TYPES } from '../../../lib/utils';
import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';
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

const ArchiveImageForm = ({ onUpdate, formData, formSchema, title, label }) => {
  const page = formSchema.pages.image_upload;
  const fields = page.fields;

  return (
    <>



      <form className="ArchivalImageForm">
          <div className={'form-title'}><h2>{page.title}</h2></div>
          <div className={'sections'}>
              <div className={'section'}>

        <ImageUploadForm
          onUpdate={onUpdate}
          formData={formData}
          dataLocation="images"
          title=""
          label="Upload an archival image of a craft workshop"
          imageRequired={true}
          captionRequired={fields.caption.required}
        />
              </div>


      <div className="section">
          <div className={'subsection'}>
        <h3 className={'Contribute-form-section-heading'}>Image Information</h3>

              <BooleanButtonForm
                  onUpdate={onUpdate}
                  formData={formData}
                  title={"What is the image showing?"}
                  label={'What is the image showing?'}
                  dataLocation={"image_type"}
                  required={fields.image_type.required}
                  defaultTags={[
                      'Storefront',
                      'Street view',
                      'Craftsperson',
                      'Craft object',
                      'Other outdoor space',
                    ]}
                  hasOtherField={true}
              />
        <InputField
          title="What year was the image taken?"
          fieldName={fields.year_taken.field_name}
          value={formData[fields.year_taken.field_name]}
          type="year"
          onUpdate={(newData) => {
            const year = newData[fields.year_taken.field_name];
            const decade = year - (year % 10);
            onUpdate({
              [fields.year_taken.field_name]: year,
              [fields.start_decade.field_name]: decade,
              [fields.end_decade.field_name]: decade,
            });
          }}
          required={fields.year_taken.required}
        />
        <div>
          <label>If exact year is unknown, please provide a decade range</label>
          <span>
            <select
              name="decade-select-start"
              id="decade-select-start"
              value={formData[fields.start_decade.field_name] || ''}
              onChange={(e) =>
                onUpdate({ [fields.start_decade.field_name]: e.target.value })
              }
            >
              {formData[fields.year_taken.field_name] ? (
                <option
                  disabled
                  value={formData[fields.start_decade.field_name]}
                >
                  {formData[fields.start_decade.field_name]}
                </option>
              ) : (
                <>
                  <option value=""> --Start decade-- </option>
                  {VALID_DECADES.map((decade) => (
                    <option key={decade} value={decade}>
                      {decade}
                    </option>
                  ))}
                </>
              )}
            </select>
            —
            <select
              name="decade-select-end"
              id="decade-select-end"
              value={formData[fields.end_decade.field_name] || ''}
              onChange={(e) =>
                onUpdate({ [fields.end_decade.field_name]: e.target.value })
              }
            >
              {formData[fields.year_taken.field_name] ? (
                <option disabled value={formData[fields.end_decade.field_name]}>
                  {formData[fields.end_decade.field_name]}
                </option>
              ) : (
                <>
                  <option value=""> --End decade-- </option>
                  {VALID_DECADES.map((decade) => (
                    <option
                      key={decade}
                      value={decade}
                      disabled={
                        decade < formData[fields.start_decade.field_name]
                      }
                    >
                      {decade}
                    </option>
                  ))}
                </>
              )}
            </select>
          </span>
        </div>
        {(() => {
            const timeReq =
              page.custom_reqs.time_req.function(formData);
            return (
              !timeReq.requirementFulfilled && (
                <small className="input-error">
                  * {timeReq.errorMessage}
                </small>
              )
            );
          })()}
      </div>
          <hr/>

      <div className={'subsection'}>
        <h3 className={'Contribute-form-section-heading'}>Craft Information</h3>
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
    </>
  );
};

export default ArchiveImageForm;
