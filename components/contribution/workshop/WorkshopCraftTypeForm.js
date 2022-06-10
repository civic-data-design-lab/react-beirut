import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';
import { CRAFT_CATEGORIES, CRAFT_TYPES } from '../../../lib/utils';

/**
 * Form that provides a list of buttons that you can select.
 *
 *
 * @param {function} onUpdate - The function to call when the form is updated (ie: interacted with)
 * @param {object} formData - The form data to use.
 * @param {string} dataLocation - Indicates the location where the results of this form will be stored inside formData
 * @param {string} title - Optional title of the form. Displays above the input on the page.
 * @param {string} label - Optional subtitle of the form. Gives instrucitons on how to use.
 * @param {string[]} requiredFields - Optional required fields that are needed to turn in these forms.
 * @returns {React.Component}
 */
const CraftDisciplineForm = ({
  onUpdate,
  formData,
  formSchema,
  pageName,
  requiredFields = [],
}) => {
  
  const page = formSchema.pages.about_the_craft;
  const fields = page.fields;

  return (
    <form className="CraftTypeForm">
        <div className={'form-title'}><h2>{page.title}</h2></div>

      <div className={'sections'}>
          <div className={'section'}>
              <div className={'subsection'}>
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
      </div>
          <div className={'section'}>
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

export default CraftDisciplineForm;
