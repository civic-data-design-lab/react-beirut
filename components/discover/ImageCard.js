import Link from 'next/link';
import { useState } from 'react';
import Card from '../Card';

const ImageCard = ({
  workshop,
  isExpanded,
  onExpand,
  onClose,
  thumbnailSrc,
}) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : thumbnailSrc || null;

  return (
    <Card handleClose={onClose}>
      <div className="card__content">
        <div className="card__item">
          <div className="container__img">
            <img className="img__detail" src={imgSrc} alt="" />
          </div>
        </div>
        <div className="card__item">
          <div className="container__text">
            <div className="container__title">
              <h1>
                {workshop.shop_name.content || workshop.shop_name.content_orig}
              </h1>
              <small>{[...workshop.craft_discipline_category]}</small>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
              velit interdum, ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora. onsectetur adipiscing elit. Nunc et velit
              interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
              ... Read More
            </p>
          </div>
          <div className="container__map">
            <p>See it on map</p>
            <div className="map"></div>
          </div>
          <div className="container__suggestion">
            <p>Explore similar shops</p>
            <div className="map"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
