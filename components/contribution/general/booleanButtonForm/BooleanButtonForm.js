import { useState, useEffect } from 'react';
import OtherButton from './OtherButton';

/**
 * Form that provides a list of buttons that you can select.
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
const BooleanButtonForm = ({
  onUpdate,
  formData,
  dataLocation,
  required = false,
  title = 'Boolean Button Form',
  label = 'Select',
  selectionsAllowed = 0,
  defaultTags = [],
  hasOtherField = false,
}) => {

  const [errorMessage, setErrorMessage] = useState('');
  //useEffect(() => {
    // INFO: If not already defined in the formData, instantiate it.
  //  if (formData[dataLocation] != undefined) return;

  //  let bbfData = {};
  //  bbfData[dataLocation] = [];

    // INFO: Update the global form data object
  //  onUpdate(bbfData);
  //}, []);

  const getTotalSelectionsMade = () => {
    let bbfData = JSON.parse(JSON.stringify(formData));
    return formData[dataLocation].length;
  };

  const onBooleanButtonClick = (e) => {

    //if (!formData[dataLocation]) {
    //  let bbfData = {};
    //  bbfData[dataLocation] = []
      //onUpdate(bbfData);
    //}

    setErrorMessage('');
    let tag = e.target.getAttribute('variable');
    let bbfData = JSON.parse(JSON.stringify(formData));

    if (bbfData[dataLocation]) {
      let isSelected = bbfData[dataLocation].includes(tag);
      // INFO: User is trying to make more than the allowed selections
      if (
        getTotalSelectionsMade() >= selectionsAllowed &&
        isSelected == false &&
        selectionsAllowed != 0
      ) {
        setErrorMessage(
          selectionsAllowed == 1
            ? `Please only select one option.`
            : `Please only select up to ${selectionsAllowed} options.`
        );
        return;
      }
      // INFO: User is making a valid selection, and the button is currently selected so remove from list
      if (isSelected) {
        bbfData[dataLocation] = bbfData[dataLocation].filter(
          (element) => element != tag
        );
      } else {
        bbfData[dataLocation].push(tag);
      }
      onUpdate(bbfData);
      } else {
      bbfData[dataLocation]=[tag];
      onUpdate(bbfData);

    }
  };

  const onCustomTagClick = (e) => {
    setErrorMessage('');
    let bbfData = JSON.parse(JSON.stringify(formData));
    let tag = e.target.getAttribute('variable');
    bbfData[dataLocation] = bbfData[dataLocation].filter(
      (element) => element != tag
    );
    onUpdate(bbfData);
  };

  const onKeyDown = (e) => {
    return e.key != 'Enter';
  };

  return (
    <div onKeyDown={onKeyDown} className="boolean-button-form">
      {/* <h3>{title}</h3> */}
      {/*TODO: Not sure why these are so close together. Put many line breaks.*/}


        <label className={required ? 'required bbf-label' : 'bbf-label'} htmlFor={dataLocation}>
          {label} {selectionsAllowed == 1 && `(Select one option)`}{' '}
          {selectionsAllowed > 1 &&
            `(Select up to ${selectionsAllowed} options)`}
        </label>

        <div className={'Image-tags-container'}>

        {
          // INFO: Create a button for each default tag
           formData[dataLocation] ?
            defaultTags.map((tag) => {
              return formData[dataLocation].includes(tag) ? (
                <button
                  id={`${tag}-boolean-button`}
                  type="button"
                  variable={tag}
                  key={tag}
                  onClick={onBooleanButtonClick}
                  className="hstg-btn-pill-small-selected"
                >
                  {tag}
                </button>
              ) : (
                <button
                  id={`${tag}-boolean-button`}
                  type="button"
                  variable={tag}
                  key={tag}
                  onClick={onBooleanButtonClick}
                  className="hstg-btn-pill-small"
                >
                  {tag}
                </button>
              );
            }) :
               defaultTags.map((tag)=> {
                 return (
                <button
                  type="button"
                  variable={tag}
                  key={tag}
                  onClick={onBooleanButtonClick}
                  className="hstg-btn-pill-small"
                >
                  {tag}
                </button>
              )
               })
        }
        {
          // INFO: Create a button for each custom tag
          formData[dataLocation] &&
            formData[dataLocation].map((tag) => {
              return defaultTags.includes(tag) ? (
                ''
              ) : (
                <button
                  variable={tag}
                  key={tag}
                  onClick={onCustomTagClick}
                  className="hstg-btn-pill-small-selected"
                >
                  ⓧ {tag}
                </button>
              );
            })
        }
        {
          // INFO: Create button for adding additional tags
          hasOtherField && (
            <OtherButton
              onUpdate={onUpdate}
              setErrorMessage={setErrorMessage}
              formData={formData}
              dataLocation={dataLocation}
              defaultTags={defaultTags}
            ></OtherButton>
          )
        }

        </div>

        {/* INFO: Show error message if applicable*/}

        {errorMessage && (
          <small className="input-error">* {errorMessage}</small>
        )}

    </div>
  );
};

export default BooleanButtonForm;
