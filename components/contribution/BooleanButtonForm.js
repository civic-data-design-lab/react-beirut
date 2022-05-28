import { useState, useEffect } from 'react';
import OtherButton from './OtherButton';
import ToastifyTest from './ToastifyTest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
const BooleanButtonForm = ({ onUpdate, formData, dataLocation, title, label, defaultTags, hasOtherField }) => {

  useEffect(() => {
    // If not already defined in the formData, instantiate it.
    if (formData[dataLocation] != undefined) return

    let bbfData = {};
    bbfData[dataLocation] = {
      "defaultTags": {},
      "customTags": {}
    }
    defaultTags.forEach( (tag) => {
      bbfData[dataLocation]["defaultTags"][tag] = false;
    });

    // Update the global form data object
    onUpdate(bbfData);
  }, [])

  const onBooleanButtonClick = (e) => {
    let bbfData = JSON.parse(JSON.stringify(formData));
    bbfData[dataLocation]["defaultTags"][e.target.getAttribute("variable")] = !bbfData[dataLocation]["defaultTags"][e.target.getAttribute("variable")]
    onUpdate(bbfData);
  }

  const onCustomTagClick = (e) => {
    let bbfData = JSON.parse(JSON.stringify(formData));
    delete bbfData[dataLocation]["customTags"][e.target.getAttribute("variable")];
    onUpdate(bbfData);
  }

  const onKeyDown = (e) => {
    return e.key != "Enter";
  }

  const sendErrorMessage = (string) => {
    toast.error(string, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <div onKeyDown={onKeyDown} className="boolean-button-form">
        <h2>{title || 'Select Buttons'}</h2>
        {/* Not sure why these are so close together. Put many line breaks */}
        <br />
        <div>
            
            <label>{label}</label>
          <br />
          <br />
          {
            // Create a button for each default tag
            formData[dataLocation] && Object.entries(formData[dataLocation]["defaultTags"]).map( ([key, value]) => {
              return value ? (
                <button 
                type="button"
                variable={key}
                key={key}
                onClick={onBooleanButtonClick}
                className="hstg-btn-pill-small-selected">
                  {key}
                </button>) : (
                <button 
                type="button" 
                variable={key}
                key={key} 
                onClick={onBooleanButtonClick} 
                className="hstg-btn-pill-small">
                  {key}
                </button>) 
            })
          }
          {
            // Create a button for each default tag
            formData[dataLocation] && Object.entries(formData[dataLocation]["customTags"]).map( ([key, value]) => {
              console.log("Custom Tag:", key)
              return (<button variable={key} key={key} onClick={onCustomTagClick} className="hstg-btn-pill-small-selected">
                ⓧ {key}
                {/* <div className="remove-tag-btn"><small>X</small></div>  */}
                </button>) 
            })
          }
          {hasOtherField && <OtherButton
          onUpdate={onUpdate}
          sendErrorMessage={sendErrorMessage}
          formData={formData}
          dataLocation={dataLocation}
          ></OtherButton>}
        </div>
        {/* <ToastifyTest></ToastifyTest> */}
        <ToastContainer />
    </div>
  );
};

export default BooleanButtonForm;
