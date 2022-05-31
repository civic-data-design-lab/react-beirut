import ImagePreview from './ImagePreview';
import mapboxGl from "mapbox-gl";
import {useEffect} from "react";

const ImageFeed = ({ workshops, imageFilterData }) => {

    useEffect(()=>{
        console.log(imageFilterData);
    })


    const filter = (workshop) => {

        if (!workshop.thumb_img_id) {
            return false
        }


        const craftType = workshop.craft_discipline_category;
        const indices = craftType.map((craft)=>{return imageFilterData['filteredCrafts'].indexOf(craft)});
        const start = imageFilterData['filteredStartYear'];
        const end = imageFilterData['filteredEndYear'];
        let withinInterval = null;

        if (workshop.year_established == null) {
            if (start <= 2010 && end >= 2010 ) {
                withinInterval = true;
            } else {
                withinInterval = false;
            }
        } else {
            if (start <= workshop.year_established && workshop.year_established <= end) {
                withinInterval = true;
            } else {
                withinInterval = false;
            }
        }

        if ((indices[0]>-1 || (indices.length>1 && indices[1]>-1)) && withinInterval) {
            if (imageFilterData['filteredToggleStatus'] && workshop.shop_status!=="open") {
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
        {workshops && workshops.map(
          (workshop) =>
            filter(workshop) &&  (
              <div className="image-container" key={workshop.ID}>
                <ImagePreview workshop={workshop}></ImagePreview>
              </div>
            )
        )}
        </div>
    </div>
        )}

export default ImageFeed;
