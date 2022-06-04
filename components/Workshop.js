import ImagePreview from './discover/ImagePreview';
import MapCardSlider from './explore/MapCardSlider';
import Slider from './Slider';
import { Workshop as WorkshopType, ImageMeta } from '../models/Types';
import MiniMap from './discover/MiniMap';

const mainSliderStyle = {
  sliderContainer: 'mapSlider-container',
  buttonLabel: 'slider-btn-label',
  prevButton: 'btn-prev',
  nextButton: 'btn-next',
  wrapperContainer: 'mapSlider-wrapper',
};

/**
 * This component can be used to display a generic workshop, either on the
 * Discover page or the Explore page, or as the workshop preview in the
 * contribution page.
 *
 * @param {object} props - Props
 * @param {WorkshopType} props.workshop - Workshop to display
 * @param {ImageMeta[]} props.imageMetas - Image metadata for the workshop,
 *    provided in an array
 * @param {string} props.imageSrc - Image source for the workshop's images.
 *    Right now this is only really needed by the contribution preview.
 * @param {WorkshopType[]} props.similarWorkshops - Similar workshop objects to
 *    display, provided in an array which may be empty or null.
 * @returns {JSX.Element}
 */
const Workshop = ({ workshop, imageMetas, imageSrc, similarWorkshops }) => {
  console.debug(workshop);

  const showImages = () => {
    const thumbImage = imageMetas.filter(
      (image) => image.img_id === workshop.thumb_img_id
    );
    const remainingImages = imageMetas.filter(
      (image) => image.img_id !== workshop.thumb_img_id
    );
    const images = [...thumbImage, ...remainingImages];
    return images.map((image) => {
      return (
        <img
          key={image.img_id}
          className="mapCard-img"
          style={{
            width: '100%',
            height: '100%',
            marginRight: '10px',
            objectFit: 'cover',
            scrollSnapAlign: 'center',
          }}
          src={imageSrc || image.src}
          alt=""
        />
      );
    });
  };

  return (
    <>
      {imageMetas?.length > 0 && (
        <div className="card__item">
          <div className="container__preview-content">
            <MapCardSlider
              children={showImages()}
              sliderStyle={mainSliderStyle}
            />
          </div>
        </div>
      )}
      <div className="card__item">
        <div className="container__preview-content">
          <div className="container__text">
            <div className="container__title">
              <h1>
                {workshop.shop_name.content || workshop.shop_name.content_orig}
              </h1>
              <p className="type">
                {workshop.craft_discipline_category.join(' | ')}
              </p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
              velit interdum, ac aliquet odio mattis. Class aptent taciti
              sociosqu ad lr adipiscing elit. Nunc et velit interdum, ac aliquet
              odio mattis. Class aptent taciti sociosqu ad ... <b>Read More</b>
            </p>
          </div>
          {workshop.location.geo['lng'] && workshop.location.geo['lat'] && (
            <div className="container__map">
              <p>See it on map</p>
              <div className="map">
                <MiniMap workshop={workshop} />
              </div>
            </div>
          )}
          {similarWorkshops != null && similarWorkshops != [] && (
            <div className="container__suggestion">
              <p>Explore similar shops</p>
              <div className="parent">
                <Slider>
                  {similarWorkshops?.map((shop) => (
                    <div key={shop.ID} className="container__img">
                      <ImagePreview workshop={shop} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Workshop;
