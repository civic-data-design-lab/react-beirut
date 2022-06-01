import { useState, useEffect } from 'react';
import OtherButton from './OtherButton';
import ToastifyTest from './ToastifyTest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BooleanButtonForm from '../../components/contribution/BooleanButtonForm';
import { CRAFT_CATEGORIES, CRAFT_TYPES } from '../../lib/utils';
import InputField from './InputField';

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
const CraftDisciplineForm = ({ onUpdate, formData, title, label, requiredFields=[]}) => {

  return (
    <>
      <BooleanButtonForm
        onUpdate={onUpdate}
        formData={formData}
        dataLocation="craft_categories"
        title="Craft Categories"
        label="What category of crafts are produced in this workshop?"
        selectionsAllowed="2"
        defaultTags={CRAFT_CATEGORIES}
        required={requiredFields?.includes('craft_categories')}
      />
      <BooleanButtonForm
        onUpdate={onUpdate}
        formData={formData}
        dataLocation="type_of_craft"
        title="Type of Craft"
        label="What type of crafts are produced in this workshop?"
        defaultTags={CRAFT_TYPES}
        required={requiredFields?.includes('type_of_craft')}
        hasOtherField={true}
      />
    </>
  );
};

export default CraftDisciplineForm;
