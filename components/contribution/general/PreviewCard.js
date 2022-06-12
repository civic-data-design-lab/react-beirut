import MapCardSlider from "../../Map/MapCardSlider";
import Workshop from "../../Workshop";
import Archive from "../../Archive";

const PreviewCard = ({object, imageMetas, imageSrc, objType, includeSuggestions}) => {

    const getObjectPreview = () => {
        if (objType==="workshop") {
            return <Workshop workshop={object} imageMetas={imageMetas} imageSrc={imageSrc}/>
        } else {
            return <Archive archive={object} imageMetas={imageMetas} imageSrc={imageSrc}/>
        }
    }







    return (

            <div className={'preview-card'}>
            {getObjectPreview()}
        </div>

    )
}

export default PreviewCard