// I'm not sure how to build this just yet.

/**
 * Button that allows you to enter in custom tags
 *
 */
const OtherButton = ({ onUpdate, formData }) => {
    const onClick = (e) => {
        console.log("This additional tags button does not work yet.")
        // console.log(typeof(e.target))
        // var element = window.document.getElementById(e.target.id)
        // console.log(e.target.querySelector(".additional-tag-tooltip"));
    }

    return (
    <button type="button" onClick={onClick} class="hstg-btn-pill-small other-button">＋
        {/* <div 
        class="additional-tag-tooltip">
            Hello there
        </div> */}
    </button>
    )
};
// Unsure how to prioritize other-button CSS over hstg-btn-pill-small

export default OtherButton;
