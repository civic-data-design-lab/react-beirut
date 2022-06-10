import MapCardSlider from "../Map/MapCardSlider";
import Workshop from "../Workshop";

const PreviewCard = ({object, imageMetas, imageSrc, objType}) => {

    const getObjectPreview = () => {
        if (objType==="workshop") {
            return <Workshop workshop={object} imageMetas={imageMetas} imageSrc={imageSrc} includeSuggestion={false}/>
        } else {
            return null
        }
    }







    return (
        <div className={'preview-card'}>
            {getObjectPreview()}
        </div>
    )
}

export default PreviewCard