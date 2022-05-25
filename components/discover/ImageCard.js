import { useState, useEffect } from 'react';
import Card from '../Card';

const ImageCard = ({ workshop }) => {
  /* 
    TODO: 1) add image card expand; 
    TODO: 2) differentiate shops against image archives; 
    TODO: 3) catch missing data 
  */
  // useEffect(() => {
  //   alert('reload!');
  // });

  let ifShowCardOrg = false;
  const [ifShowCard, setShowCard] = useState(ifShowCardOrg);

  const handleShowCard = (ifShowCard) => {
    ifShowCardOrg = true;
    setShowCard(true);
  };

  const handleClose = (ifShowCard) => {
    setShowCard(false);
  };

  const cardContent = () => {
    return (
      <div>
        <div className="container__item">
          <img
            className="img__detail"
            src={`/api/images/${workshop.thumb_img_id}.jpg`}
            alt=""
          />
        </div>
        <div className="container__item">
          <div className="container__text">
            <div className="container__title">
              <h1>Shop Name</h1>
              <small>Since 1948 | Metal</small>
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
    );
  };

  return (
    <>
      <div className="img-wrapper">
        <div className="img-preview" onClick={handleShowCard}>
          <img src={`/api/images/${workshop.thumb_img_id}.jpg`} alt="" />
        </div>
        {ifShowCard && (
          <Card
            cardContent={cardContent()}
            ifShowCardOrg
            handleClose={handleClose}
          />
        )}
        {/* {isExpand && (
          <div className="card">
            <div className="card__cover">
              <div className="card__wrapper">
                <div className="container__btn">
                  <button className="btn-close" onClick={handleClick}>
                    <span></span>
                  </button>
                </div>

                <div className="card__content">
                  <div className="container__item">
                    <img
                      className="img__detail"
                      src={`/api/images/${workshop.thumb_img_id}.jpg`}
                      alt=""
                    />
                  </div>
                  <div className="container__item">
                    <div className="container__text">
                      <div className="container__title">
                        <h1>Shop Name</h1>
                        <small>Since 1948 | Metal</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc et velit interdum, ac aliquet odio mattis. Class
                        aptent taciti sociosqu ad litora. onsectetur adipiscing
                        elit. Nunc et velit interdum, ac aliquet odio mattis.
                        Class aptent taciti sociosqu ad ... Read More
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
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default ImageCard;
