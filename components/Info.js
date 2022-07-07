import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const Info = ({icon, text}) => {

    const [showTooltipText, setShowTooltipText] = useState(null)


    const getIcon=()=>{
        if ( icon === "question") {
        return <FontAwesomeIcon icon={faQuestionCircle} width="1em" />
    } else if (icon === "check") {
        return <FontAwesomeIcon icon={faCircleCheck} width="1em" />
    } else if (icon === "info") {
        return <FontAwesomeIcon icon={faCircleInfo} width="1em" />
    }
    }






    return (
            <div className={'tooltip-container'}>
                <div className={'tooltip-trigger'}
                     onMouseOver={()=>{
                         if (window.innerWidth>991) {
                             setShowTooltipText(true)
                         }
                     }}
                     onMouseLeave={()=>{
                         if (window.innerWidth>991) {
                             setShowTooltipText(false)
                         }
                     }}
                     onClick={()=>{
                         if (window.innerWidth<991) {
                             setShowTooltipText(!showTooltipText)
                         }
                     }}
                >
                    {getIcon(icon)}
                </div>
                {showTooltipText ?
                    <div className={'tooltip-text-container'}>
                        <p className={'tooltip-text'}>{text}</p>
                    </div> : null}
            </div>
    )
}

export default Info;