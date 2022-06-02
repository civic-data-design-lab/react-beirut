import { useEffect } from 'react';

// TODO: Fix black add button from not working on mobile.
// TODO: P

/**
 * Button that allows you to enter in custom tags
 *
 */
const OtherButton = ({ onUpdate, setErrorMessage, formData, dataLocation, defaultTags }) => {

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

    useEffect(() => {
        // window.document.body.addEventListener("click", onClickOffTxtbox, true);
        window.document.body.addEventListener("keypress", onKeyPress, true);
    }, []);
    

    const enableButton = (otherButton) => {
        otherButton.classList.remove("other-btn");
        otherButton.classList.add("other-btn-selected");
        otherButton.classList.remove("hstg-btn-pill-small");
        otherButton.classList.add("hstg-btn-pill-small-selected");
    }

    const disableButton = (otherButton) => {
        otherButton.classList.remove("other-btn-selected");
        otherButton.classList.add("other-btn");
        otherButton.classList.remove("hstg-btn-pill-small-selected");
        otherButton.classList.add("hstg-btn-pill-small");
    }

    const validateData = (string) => {
        if (!(/^[A-Za-z]*$/.test(string))) {
            setErrorMessage("Your custom tag was invalid.\nPlease enter a tag that contains only letters.")
            
            return false
        }
        if (string == "") {
            return false
        }
        if (formData[dataLocation].includes(string)) {
            if (defaultTags.includes(string)) {
            setErrorMessage("Your custom tag is already in the set of default tags.")
            }
            return false
        }
        if (string.length >= 50) {
            setErrorMessage("Your custom tag was invalid.\nPlease enter a tag that is less than 50 characters.")
            return false
        }

        return true
    }

    const submitNewTag = (otherButton) => {
        let txtbox = otherButton.getElementsByClassName("additional-tag-txtbox")[0]
        let string = txtbox.value;
        txtbox.value = ""

        if (!validateData(string)) return
        
        let bbfData = JSON.parse(JSON.stringify(formData))
        bbfData[dataLocation].push(string);
        onUpdate(bbfData)
    }

    const onClick = (e) => {
        setErrorMessage("");

        if (e.target.classList.contains("other-btn")) {
            enableButton(e.target);
        }
        else if (e.target.classList.contains("other-btn-selected")) {
            disableButton(e.target);
            submitNewTag(e.target);
        }
        else if (e.target.classList.contains("submit-new-tag-btn")) {
            let otherButton = e.target.parentElement.parentElement;
            submitNewTag(otherButton);
            disableButton(otherButton);
        }
    }

    const onBlur = (e) => {
        let otherButton = e.target.parentElement.parentElement;
        submitNewTag(otherButton);
        disableButton(otherButton);
    }

    // Todo: Add the new tag upon pressing "Enter"
    const onKeyPress = (e) => {
        // // e.key
        // if (e.keyCode != 32) return

        // // Again, this may break if there are multiple of these on the screen at once.
        // let otherButton = window.document.getElementsByClassName("other-btn-selected")[0]
        // console.log("otherButton =", otherButton)
        // if (otherButton == undefined) return

        // submitNewTag(otherButton);
        // disableButton(otherButton);
    }

    const onChange = (e) => {
        setErrorMessage("");
        let otherButton = e.target.parentElement.parentElement;
        console.assert(otherButton == undefined, "otherButton is undefined");
        if (e.target.value.includes(" ")) {
            setErrorMessage("Spaces are not allowed in custom tag.")
        }
    }

    return (
    <button type="button" onClick={onClick} onkeypress={(e)=>{console.log("test"); e.preventDefault()}} className="hstg-btn-pill-small other-btn">＋
        <div 
        className="additional-tag-tooltip">
            <input onkeypress={onKeyPress} onBlur={onBlur} onChange={onChange} type="text" className="additional-tag-txtbox"></input>
            <div className="submit-new-tag-btn">＋</div>
        </div>
    </button>
    )
};
// Unsure how to prioritize other-button CSS over hstg-btn-pill-small

export default OtherButton;
