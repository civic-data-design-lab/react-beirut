import Card from '../Card';
import ImagePreview from './ImagePreview';

const ImageCard = ({ workshop, onClose, thumbnailSrc }) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : thumbnailSrc || null;

  return (
    <Card handleClose={onClose}>
      <div className="card__content">
        <div className="card__item">
          <div className="container__preview-content">
            <img className="img__detail" src={imgSrc} alt="" />
          </div>
        </div>
        <div className="card__item">
          <div className="container__preview-content">
            <div className="container__text">
              <div className="container__title">
                <h1>
                  {workshop.shop_name.content ||
                    workshop.shop_name.content_orig}
                </h1>
                <p className="type">
                  {workshop.craft_discipline_category.join(' | ')}
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
                velit interdum, ac aliquet odio mattis. Class aptent taciti
                sociosqu ad lr adipiscing elit. Nunc et velit interdum, ac
                aliquet odio mattis. Class aptent taciti sociosqu ad ...{' '}
                <b>Read More</b>
              </p>
            </div>
            <div className="container__map">
              <p>See it on map</p>
              <div className="map"></div>
            </div>
            <div className="container__suggestion">
              <p>Explore similar shops</p>
              <div className="wrapper">
                <div className="image-container">
                  <ImagePreview workshop={workshop} />
                </div>
                <div className="image-container">
                  <ImagePreview workshop={workshop} />
                </div>
                <div className="image-container">
                  <ImagePreview workshop={workshop} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
