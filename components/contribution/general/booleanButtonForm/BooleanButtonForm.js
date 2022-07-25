import {useState} from 'react';


import {useTranslation} from "react-i18next";
import OtherButton from "./OtherButton";


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
 * @param imageIndex
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
                               imageIndex = null
                           }) => {

    const {t} = useTranslation();

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
        setErrorMessage('');
        let tag = e.target.getAttribute('variable');
        let newData = formData
        if (newData[dataLocation]) {
            if (!imageIndex) {
                let isSelected = newData[dataLocation].includes(tag);
                if (
                    getTotalSelectionsMade() >= selectionsAllowed &&
                    isSelected === false &&
                    selectionsAllowed !== 0
                ) {
                    setErrorMessage(selectionsAllowed === 1 ? t(`Please only select one option.`) : t(`Please only select up to`) + ` ${selectionsAllowed} ` + t(`options.`));
                    return
                }

                if (isSelected) {
                    newData[dataLocation] = newData[dataLocation].filter(
                        (element) => element !== tag
                    );
                } else {
                    newData[dataLocation].push(tag)
                }
            } else {
                if (newData[dataLocation][imageIndex]) {
                    let isSelected = newData[dataLocation][imageIndex].tags.includes(tag);
                    if (isSelected) {
                        newData[dataLocation][imageIndex].tags = newData[dataLocation][imageIndex].tags.filter(
                            (element) => element !== tag
                        );
                    } else {
                        newData[dataLocation][imageIndex].tags.push(tag);
                    }
                } else {
                    const tags = [tag]
                    newData[dataLocation][imageIndex] = {tags}

                }
            }
        } else {
            if (!imageIndex) {
                newData[dataLocation] = [tag];
            } else {
                const tags = [tag]
                newData[dataLocation] = {}
                newData[dataLocation][imageIndex] = {}
                newData[dataLocation][imageIndex] = {tags}

            }
        }
        onUpdate(newData)
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


    const getDefaultTags = () => {
        console.log("creating default tags")
        // INFO: Create a button for each default tag
        if (formData[dataLocation]) {
            console.log("in dataLocation ", dataLocation)
            if (!imageIndex) {
                return defaultTags.map((tag) => {
                    return formData[dataLocation].includes(tag) ? (
                        <button
                            id={`${tag}-boolean-button`}
                            type="button"
                            variable={tag}
                            key={tag}
                            onClick={onBooleanButtonClick}
                            className="hstg-btn-pill-small-selected"
                        >
                            {t(tag)}
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
                            {t(tag)}
                        </button>
                    );
                })
            } else {
                if (formData[dataLocation][imageIndex]) {
                    console.log("here ", imageIndex)
                    console.log("trying to check inside array ", formData[dataLocation][imageIndex].tags)
                    return defaultTags.map((tag) => {
                        return formData[dataLocation][imageIndex].tags.includes(tag) ? (
                            <button
                                id={`${tag}-boolean-button`}
                                type="button"
                                variable={tag}
                                key={tag}
                                onClick={onBooleanButtonClick}
                                className="hstg-btn-pill-small-selected"
                            >
                                {t(tag)}
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
                                {t(tag)}
                            </button>
                        );
                    })
                } else {
                    return defaultTags.map((tag) => {
                        return (
                            <button
                                type="button"
                                variable={tag}
                                key={tag}
                                onClick={onBooleanButtonClick}
                                className="hstg-btn-pill-small"
                            >
                                {t(tag)}
                            </button>
                        )
                    })
                }
            }
        } else {
            return defaultTags.map((tag) => {
                return (
                    <button
                        type="button"
                        variable={tag}
                        key={tag}
                        onClick={onBooleanButtonClick}
                        className="hstg-btn-pill-small"
                    >
                        {t(tag)}
                    </button>
                )
            })
        }
    }

    const getCustomTags = () => {
        // INFO: Create a button for each custom tag
        if (formData[dataLocation]) {
            if (!imageIndex) {
                return formData[dataLocation].map((tag) => {
                    return defaultTags.includes(tag) ? (
                        '') : (
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
            } else {
               if (formData[dataLocation][imageIndex]) {
                   return formData[dataLocation][imageIndex].tags.map((tag) => {
                       return defaultTags.includes(tag) ? ('') : (
                           <button
                            variable={tag}
                            key={tag}
                            onClick={onCustomTagClick}
                            className="hstg-btn-pill-small-selected"
                        >
                            ⓧ {tag}
                        </button>
                       )
                   })
               }
            }
        }
    }


     const getOtherButton = () => {
        // INFO: Create button for adding additional tags
         if (hasOtherField) {
             return (
                 <OtherButton
                     onUpdate={onUpdate}
                     setErrorMessage={setErrorMessage}
                     formData={formData}
                     dataLocation={dataLocation}
                     defaultTags={defaultTags}
                     imageIndex={imageIndex}
    />
             )
         }
    }

    console.log(formData)


    return (
        <div onKeyDown={onKeyDown} className="boolean-button-form">
            {/* <h3>{title}</h3> */}
            {/*TODO: Not sure why these are so close together. Put many line breaks.*/}


            <label className={required ? 'required bbf-label' : 'bbf-label'} htmlFor={dataLocation}>
                {label} {selectionsAllowed == 1 && `(Select one option)`}{' '}
                {selectionsAllowed > 1 &&
                    `(${t("Select up to")} ${selectionsAllowed} ${t('options')})`}
            </label>

            <div className={'Image-tags-container'}>

                {getDefaultTags()}

                {getCustomTags()}

                {getOtherButton()}



            </div>

            {/* INFO: Show error message if applicable*/}

            {errorMessage && (
                <small className="input-error">* {errorMessage}</small>
            )}

        </div>
    );
};

export default BooleanButtonForm;
