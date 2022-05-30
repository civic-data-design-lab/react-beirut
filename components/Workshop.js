import ImagePreview from './discover/ImagePreview';
import MapCardSlider from './explore/MapCardSlider';
import Slider from './Slider';

const mainSliderStyle = {
  sliderContainer: 'mapSlider-container',
  buttonLabel: 'slider-btn-label',
  prevButton: 'btn-prev',
  nextButton: 'btn-next',
  wrapperContainer: 'mapSlider-wrapper',
};

const Workshop = ({ workshop, imageMetas, imageSrc, similarWorkshops }) => {
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
      <div className="card__item">
        <div className="container__preview-content">
          {imageMetas?.length > 0 && (
            <MapCardSlider
              children={showImages()}
              sliderStyle={mainSliderStyle}
            />
          )}
        </div>
      </div>
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
          <div className="container__map">
            <p>See it on map</p>
            <div className="map"></div>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default Workshop;
