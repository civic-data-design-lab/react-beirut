import ImagePreview from './ImagePreview';
import mapboxGl from "mapbox-gl";
import {useEffect} from "react";

const ImageFeed = ({ objects, imageFilterData }) => {

    useEffect(()=>{
        console.log(imageFilterData);
    })


    const filter = (object) => {

        if (!object.thumb_img_id) {
            return false
        }


        const craftType = object.craft_discipline_category;
        const indices = craftType.map((craft)=>{return imageFilterData['filteredCrafts'].indexOf(craft)});
        const start = imageFilterData['filteredStartYear'];
        const end = imageFilterData['filteredEndYear'];
        let withinInterval = null;

        if (object.year_established == null) {
            if (start <= 2010 && end >= 2010 ) {
                withinInterval = true;
            } else {
                withinInterval = false;
            }
        } else {
            if (start <= object.year_established && object.year_established <= end) {
                withinInterval = true;
            } else {
                withinInterval = false;
            }
        }

        if ((indices[0]>-1 || (indices.length>1 && indices[1]>-1)) && withinInterval) {
            if (imageFilterData['filteredToggleStatus'] && object.shop_status!=="open") {
                return false
            } else {
                return true

            }
        }

    }


  //TODO: Adjust css to fit the width of the page

  return (
    <div className="container">
      <div className="image-feed">
        {objects && objects.map(
          (object) =>
            filter(object) &&  (
              <div className="image-container" key={object.ID}>
                <ImagePreview workshop={object}/>
              </div>
            )
        )}
        </div>
    </div>
        )}

export default ImageFeed;
