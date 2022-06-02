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

  const FIELDS = Object.entries(formSchema['pages'][pageName]['fields'])

  return (
    <form className="CraftTypeForm">
      <h2>{formSchema['pages'][pageName]['title']}</h2>
      <br/>
      <div>
        <BooleanButtonForm
          onUpdate={onUpdate}
          formData={formData}
          dataLocation={FIELDS[0][0]}
          title={FIELDS[0][1]['title']}
          label="What category of crafts are produced in this workshop?"
          selectionsAllowed="2"
          defaultTags={CRAFT_CATEGORIES}
          required={FIELDS[0][1]['required'] ? FIELDS[0][1]['required'] : false}
        />
        <BooleanButtonForm
          onUpdate={onUpdate}
          formData={formData}
          dataLocation={FIELDS[1][0]}
          title={FIELDS[1][1]['title']}
          label="What type of crafts are produced in this workshop? If entering a custom type, English is preferred."
          defaultTags={CRAFT_TYPES}
          required={FIELDS[1][1]['required'] ? FIELDS[1][1]['required'] : false}
          hasOtherField={true}
        />
      </div>
    </form>
  );
};

export default CraftDisciplineForm;
