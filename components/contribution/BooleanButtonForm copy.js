import { useState, useEffect } from 'react';
import OtherButton from './OtherButton';
import ToastifyTest from './ToastifyTest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from 'autoprefixer';

/**
 * Form that provides a list of buttons that you can select.
 *
 *
 * @param {function} onUpdate - The function to call when the form is updated (ie: interacted with)
 * @param {object} formData - The form data to use.
 * @param {string} dataLocation - Indicates the location where the results of this form will be stored inside formData
 * @param {Boolean} required - Indicates whether this form is required
 * @param {string} title - Optional title of the form. Displays above the input on the page.
 * @param {string} label - Optional subtitle of the form. Gives instrucitons on how to use.
 * @param {Number} selectionsAllowed - Number of buttons that one can select. Default is no limit.
 * @param {string[]} defaultTags - List of strings that will display individually on their own buttons.
 * @param {boolean} hasOtherField - Whether or not to display an "other" field which allows the addition of custom tags.
 * @returns {React.Component}
 */
const BooleanButtonForm = ({ onUpdate, formData, dataLocation, required=false, title="Boolean Button Form", label="Select", selectionsAllowed=0, defaultTags=[], hasOtherField=false }) => {
  console.log(title, "required", required);
  const [errorMessage, setErrorMessage] = useState("");

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

  const getTotalSelectionsMade = () => {
    let bbfData = JSON.parse(JSON.stringify(formData));
    let defaultCount = Object.values(bbfData[dataLocation]["defaultTags"]).filter(tag => tag).length
    let customCount = Object.values(bbfData[dataLocation]["customTags"]).filter(tag => tag).length
    return defaultCount + customCount
  }

  const onBooleanButtonClick = (e) => {
    setErrorMessage("");
    let tag = e.target.getAttribute("variable");
    let bbfData = JSON.parse(JSON.stringify(formData));
    let value = bbfData[dataLocation]["defaultTags"][tag]
    if (getTotalSelectionsMade() >= selectionsAllowed && value == false && selectionsAllowed != 0) {
      sendErrorMessage("Too many selected")
      setErrorMessage(selectionsAllowed == 1 ?`Please only select one option.` : `Please only select up to ${selectionsAllowed} options.`)
      return
    } 
    bbfData[dataLocation]["defaultTags"][tag] = !value
    onUpdate(bbfData);
  }

  const onCustomTagClick = (e) => {
    setErrorMessage("");
    let bbfData = JSON.parse(JSON.stringify(formData));
    let tag = e.target.getAttribute("variable");
    delete bbfData[dataLocation]["customTags"][tag];
    onUpdate(bbfData);
  }

  const onKeyDown = (e) => {
    return e.key != "Enter";
  }

  const sendErrorMessage = (string) => {
    // toast.error(string, {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   });
  }

  return (
    <div onKeyDown={onKeyDown} className="boolean-button-form">
        <h2>{title}</h2>
        {/* Not sure why these are so close together. Put many line breaks */}
        <br />
        <div>
            
            <label className={required ? 'required' : ''}>
              {label} {selectionsAllowed == 1 && `(Select one option)`} {selectionsAllowed > 1 && `(Select up to ${selectionsAllowed} options)`}
              </label>
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
            // Create a button for each custom tag
            formData[dataLocation] && Object.entries(formData[dataLocation]["customTags"]).map( ([key, value]) => {
              console.log("Custom Tag:", key)
              return (<button variable={key} key={key} onClick={onCustomTagClick} className="hstg-btn-pill-small-selected">
                ⓧ {key}
                {/* <div className="remove-tag-btn"><small>X</small></div>  */}
                </button>)
            })
          }
          {
            // Create button for adding additional tags
            hasOtherField && <OtherButton
            onUpdate={onUpdate}
            sendErrorMessage={sendErrorMessage}
            setErrorMessage={setErrorMessage}
            formData={formData}
            dataLocation={dataLocation}
            ></OtherButton>
          }
          {/* Show error message if applicable */}
          <br></br>
          {errorMessage && <small className="input-error">* {errorMessage}</small>}
        </div>
        {/* <ToastifyTest></ToastifyTest> */}
        <ToastContainer />
    </div>
  );
};

export default BooleanButtonForm;
