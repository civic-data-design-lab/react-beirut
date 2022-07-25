/**
 * Button that allows you to enter in custom tags
 *
 */
const OtherButton = ({
                         onUpdate,
                         setErrorMessage,
                         formData,
                         dataLocation,
                         defaultTags,
                         imageIndex = null
                     }) => {
    // TODO: Fix this clicking off function from overwriting the previous label for some reason.
    // This might break things if there are multiple of this form on a page
    // const onClickOffTxtbox = (e) => {
    //     if (!e.target.classList.contains("other-btn") &&
    //         !e.target.classList.contains("other-btn-selected") &&
    //         !e.target.parentElement.classList.contains("additional-tag-tooltip")) {

    //             let otherButton = window.document.getElementsByClassName("other-btn-selected")[0];
    //             if (otherButton == undefined) return;
    //             console.log(otherButton);
    //             submitNewTag(otherButton);
    //             disableButton(otherButton);
    //     }
    // }

    //useEffect(() => {
    // window.document.body.addEventListener("click", onClickOffTxtbox, true);
    //  window.document.body.addEventListener('keypress', onKeyPress, true);
    //}, []);

    const enableButton = (otherButton) => {
        otherButton.classList.remove('other-btn');
        otherButton.classList.add('other-btn-selected');
        otherButton.classList.remove('hstg-btn-pill-small');
        otherButton.classList.add('hstg-btn-pill-small-selected');
        //otherButton.classList.add('prevent-pointer-events');
    };

    const disableButton = (otherButton) => {
        otherButton.classList.remove('other-btn-selected');
        otherButton.classList.add('other-btn');
        otherButton.classList.remove('hstg-btn-pill-small-selected');
        otherButton.classList.add('hstg-btn-pill-small');
        //otherButton.classList.remove('prevent-pointer-events');
    };

    const validateData = (string) => {
        console.log('validating data')
        if (!/^[a-zA-Z\s]*$/.test(string)) {
            setErrorMessage(
                'Your custom tag was invalid.\nPlease enter a tag that contains only letters.'
            );

            return false;
        }
        if (string == '') {
            setErrorMessage(
                ''
            );
            return false;
        }
        if (defaultTags.includes(string)) {

            if (!imageIndex) {
                if (formData[dataLocation].includes(string)) {
                    setErrorMessage(
                        'You have already selected this tag from the default tags.'
                    );
                    return false;
                }
                setErrorMessage(
                    'Your custom tag is already in the set of default tags. Please select it from the default tags.'
                );
                return false;
            } else {
              if (formData[dataLocation][imageIndex]) {
                if (formData[dataLocation][imageIndex].includes(string)) {
                    setErrorMessage(
                        'You have already selected this tag from the default tags.'
                    );
                    return false;
                }
                setErrorMessage(
                    'Your custom tag is already in the set of default tags. Please select it from the default tags.'
                );
                return false;
              }
            }
        }
        if (string.length >= 50) {
            setErrorMessage(
                'Your custom tag was invalid.\nPlease enter a tag that is less than 50 characters.'
            );
            return false;
        }

        return true;
    };

    const submitNewTag = (otherButton) => {
        let txtbox = otherButton.getElementsByClassName('additional-tag-txtbox')[0];
        let string = txtbox.value;
        txtbox.value = '';
        string = string.trimStart().trimEnd()
        string = string.charAt(0).toUpperCase() + string.slice(1)
        if (!validateData(string)) return;

        let newData = formData
        if (!newData[dataLocation]) {
            if (!imageIndex) {
                newData[dataLocation] = [string]
                onUpdate(newData);
            } else {
                let tags = [string]
                newData[dataLocation] = {}
                newData[dataLocation][imageIndex]=[string]
                onUpdate(newData)
            }
        } else {
            if (!imageIndex) {
                newData[dataLocation].push(string);
                onUpdate(newData);
            } else {
                if (newData[dataLocation][imageIndex]) {
                    newData[dataLocation][imageIndex].push(string)
                    onUpdate(newData)
                } else {
                    let tags = [string]
                    newData[dataLocation][imageIndex] = {}
                    newData[dataLocation][imageIndex] = [string]
                    onUpdate(newData)
                }
            }
        }
    };

    const onClickInput = (e) => {
        console.log("clicked input")
        e.stopPropagation()
    }

    const onClick = (e) => {

        setErrorMessage('');
        console.log('clicking add other button')
        console.log("printing onclick ", e.target)

        if (e.target !== document.getElementById('otherButton')) {
            console.log('not clicked on button!')
        }

        if (e.target.classList.contains('other-btn')) {
            enableButton(e.target);
            let txtbox = e.target.getElementsByClassName('additional-tag-txtbox')[0];
            txtbox.focus();
        } else if (e.target.classList.contains('other-btn-selected')) {
            disableButton(e.target);
            submitNewTag(e.target);
        } else if (e.target.classList.contains('submit-new-tag-btn')) {
            let otherButton = e.target.parentElement.parentElement;
            submitNewTag(otherButton);
            disableButton(otherButton);
        }
    };

    const onBlur = (e) => {
        let otherButton = e.target.parentElement.parentElement;
        submitNewTag(otherButton);
        disableButton(otherButton);
    };

    // TODO: Add the new tag upon pressing "Enter"
    const onKeyPress = (e) => {
        // // e.key
        // if (e.keyCode != 32) return
        //!! Again, this may break if there are multiple of these on the screen at once.
        // let otherButton = window.document.getElementsByClassName("other-btn-selected")[0]
        // console.log("otherButton =", otherButton)
        // if (otherButton == undefined) return
        // submitNewTag(otherButton);
        // disableButton(otherButton);
    };

    const onChange = (e) => {

        setErrorMessage('');
        // console.log("printing on change ", e.target.value)
        let otherButton = e.target.parentElement.parentElement;
        console.assert(otherButton != undefined, 'otherButton is undefined');
        //if (e.target.value.includes(' ')) {
        //  setErrorMessage('Spaces are not allowed in custom tag.');
        //}
    };

    const onKeyUp = (e) => {
        //if(e.keyCode === 13)
        //{
        //    e.preventDefault()
        //    console.log("pressed enter ", e.target.parentElement.parentElement);
        //    disableButton(e.target.parentElement.parentElement);
        //    submitNewTag(e.target.parentElement.parentElement);

        //}
        e.preventDefault()

    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            disableButton(e.target.parentElement.parentElement);
            submitNewTag(e.target.parentElement.parentElement);
        }

    }

    // TODO: Clean up this HTML after update.
    return (
        <>
            <button
                id={'otherButton'}
                type="button"
                onClick={onClick}
                className="hstg-btn-pill-small other-btn other"
            >
                ＋
                <div>
                    <input
                        //onKeyPress={onKeyPress}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        //style={{padding:4}}
                        onBlur={onBlur}
                        onClick={onClickInput}
                        onChange={onChange}
                        type="text"
                        className="additional-tag-txtbox additional-tag-tooltip"
                    />
                    {/* <div className="submit-new-tag-btn">＋</div> */}
                </div>
            </button>
        </>
    );
};

export default OtherButton;