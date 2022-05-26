import { useState } from 'react';
import OtherButton from './OtherButton';

/**
 * Form that provides a list of buttons that you can select.
 *
 *
 * @param {function} onUpdate - The function to call when the form is updated (ie: interacted with)
 * @param {object} formData - The form data to use.
 * @param {string} dataLocation - Indicates the location where the results of this form will be stored inside formData
 * @param {string} title - Optional title of the form. Displays above the input on the page.
 * @param {string} label - Optional subtitle of the form. Gives instrucitons on how to use.
 * @param {string[]} buttonNames - List of strings that will display individually on their own buttons.
 * @param {boolean} hasOtherField - Whether or not to display an "other" field.
 * @returns {React.Component}
 */
const BooleanButtonForm = ({ onUpdate, formData, dataLocation, title, label, buttonNames, hasOtherField }) => {

  // If not already defined in the formData, instantiate it.
  if (formData[dataLocation] == undefined) {
    formData[dataLocation] = {};
    buttonNames.map((buttonName) => {
      formData[dataLocation][buttonName] = false;
    });
  };

  // Update the buttons to reflect the current state of the formData
  const updateButtonPresentation = () => {
    buttonNames.map((buttonName) => {
      var button = document.getElementById(`btn-${buttonName}`)
      if(formData[dataLocation][buttonName]) {
        button.value = "true";
        button.className = 'hstg-btn-pill-small-selected';
      }
      else {
        button.value = "false";
        button.className = 'hstg-btn-pill-small';
      }
    })
  }

  // Sync local formData with global formData (is this necessary?)
  const updateData = () => {
    onUpdate(formData)
    console.log(formData)
  }

  const onButtonClick = (e) => {
    const buttonName = e.target.getAttribute("var")

    // When the button is clicked, check the form data and reverse the value stored there.
    formData[dataLocation][buttonName] = !formData[dataLocation][buttonName]
    // console.log("Data from the BooleanButtonForm = ", formData[dataLocation])
    updateButtonPresentation();
    // updateData(); Ask Enrique why I don't need to use onUpdate here. Is it because I am referencing a dictionary INSIDE of a static object? Unsure.
  }

  return (
    <form className="BooleanButtonForm">
        <h2>{title || 'Select Buttons'}</h2>
        {/* Not sure why these are so close together. Put many line breaks */}
        <br />
        <div>
            <label>{label}</label>
          <br />
          <br />
          {buttonNames.map((buttonName) => 
          (
                <button 
                type="button" 
                value={formData[dataLocation][buttonName]} 
                class={formData[dataLocation][buttonName] ? "hstg-btn-pill-small-selected" : "hstg-btn-pill-small"} 
                id={`btn-${buttonName}`} 
                onClick={onButtonClick}
                var={buttonName}>
                  {buttonName}
                </button>
                )
              )
          }
          {hasOtherField && <OtherButton></OtherButton>}
        </div>
    </form>
  );
};

export default BooleanButtonForm;
