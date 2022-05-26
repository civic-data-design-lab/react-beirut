import Link from 'next/link';
import { useState } from 'react';
import Card from '../Card';

const ImageCard = ({ workshop, isExpanded, onExpand, onClose }) => {

  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : null;

  return (
    <>
      {isExpanded && (
        <Card handleClose={onClose}>
          <div className="card__content">
            <div className="card__item">
              <div className="container__img">
                <img
                  className="img__detail"
                  src={`/api/images/${workshop.images[0]}.jpg`}
                  alt=""
                />
              </div>
            </div>
            <div className="card__item">
              <div className="container__text">
                <div className="container__title">
                  <h1>{workshop.shop_name.content || workshop.shop_name.content_orig}</h1>
                  <small>{[...workshop.craft_discipline_category]}</small>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  et velit interdum, ac aliquet odio mattis. Class aptent taciti
                  sociosqu ad litora. onsectetur adipiscing elit. Nunc et velit
                  interdum, ac aliquet odio mattis. Class aptent taciti sociosqu
                  ad ... Read More
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
      )}
      <div className="img-wrapper">
        <div className="img-preview">
          <img
            onClick={() => onExpand(workshop.ID)}
            src={imgSrc}
            alt={`Workshop ${workshop.ID} image`}
          />
          {/* {imgSrc && (
            <Link href="/discover/[id]" as={`/discover/${workshop.ID}`}>
              <img src={imgSrc} alt="img" />
            </Link>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ImageCard;
