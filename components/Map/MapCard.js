import React, { useEffect, useState } from 'react';
import Slider from '../Slider';
import MapCardSlider from './MapCardSlider';
import { useMediaQuery } from 'react-responsive';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faInstagramSquare,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLink, faPhone } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 687, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 688 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

import { TRANSLATIONS } from '../../lib/utils';

import { Trans, useTranslation } from 'react-i18next';
import Info from '../Info';

// assumes workshop or archive is passed in as a prop
const MapCard = ({
  workshop,
  type,
  id,
  openMapCard,
  i18n,
  swiping,
  setSwiping,
  closeMapCard,
}) => {
  const { t } = useTranslation();

  const [caption, setCaption] = useState(null);
  //const [workshop, setWorkshop] = useState(null);
  const [similarObjects, setSimilarObjects] = useState(null);
  const [imageMetaData, setImageMetaData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [invalidImages, setInvalidImages] = useState([]);
  const [validImages, setValidImages] = useState([]);
  const mainSliderStyle = {
    sliderContainer: 'mapSlider-container',
    buttonLabel: 'slider-btn-label',
    prevButton: 'btn-prev',
    nextButton: 'btn-next',
    wrapperContainer: 'mapSlider-wrapper',
  };

  const onScroll = () => {
    const slider = document.querySelector('.mapCard-slider-container');
    const firstImage = document.querySelector('.mapCard-img');
    const parentPos = slider.getBoundingClientRect();
    const childPos = firstImage.getBoundingClientRect();
    const relativePos = parentPos.left - childPos.left;
    const parentWidth = parentPos.width;

    if (i18n.language === 'en') {
      setCurrentImageIndex(Math.round(relativePos / parentWidth));
      console.log(Math.round(relativePos / parentWidth));
    } else {
      setCurrentImageIndex(-Math.round(relativePos / parentWidth));
      console.log(-Math.round(relativePos / parentWidth));
    }
  };

  const fetchSimilarWorkshops = async () => {
    const response = await fetch(`api/similarWorkshops/${workshop.ID}`);
    const res = await response.json();
    const similarWorkshops = res['response'];
    let validSimilarWorkshops = [];
    for (const similarWorkshop of similarWorkshops) {
      const similarWorkshopResponse = await fetch(
        `api/images/${similarWorkshop.thumb_img_id}.jpg`
      );
      if (similarWorkshopResponse.ok) {
        validSimilarWorkshops.push(similarWorkshop);
      }
    }
    setSimilarObjects(validSimilarWorkshops);
  };

  const fetchSimilarArchives = async () => {
    const response = await fetch(`api/similarArchives/${workshop.ID}`);
    const res = await response.json();
    const similarArchives = res['response'];
    let validSimilarArchives = [];
    for (const similarArchive of similarArchives) {
      const similarArchiveResponse = await fetch(
        `api/images/${similarArchive.thumb_img_id}.jpg`
      );
      if (similarArchiveResponse.ok) {
        validSimilarArchives.push(similarArchive);
      }
    }
    setSimilarObjects(validSimilarArchives);
  };

  const fetchImageMetaData = async () => {
    const thumbImage = workshop.images.filter(
      (image) => image.img_id === workshop.thumb_img_id
    );
    const remainingImages = workshop.images.filter(
      (image) => image.img_id !== workshop.thumb_img_id
    );
    const images = [...thumbImage, ...remainingImages];
    let validImages = [];
    let metaData = [];

    for (const image_id of images) {
      const imageResponse = await fetch(`api/images/${image_id}`);
      if (imageResponse.status !== 404) {
        const response = await fetch(`api/imageMetaData/${image_id}`);
        const res = await response.json();
        metaData.push(res['response'][0]);
        validImages.push(image_id);
      }
    }
    setImageMetaData(metaData);
    setValidImages(validImages);
    console.log('metadata ', metaData);
  };

  const getCaption = () => {
    const currentMetaData = imageMetaData[currentImageIndex];
    const viewKeywords = ['storefront', 'street', 'interior', 'indoor'];
    const interiorKeywords = ['interior', 'inside', 'indoor'];
    const viewSet = new Set(viewKeywords);

    if (currentMetaData) {
      if (currentMetaData.caption) {
        return <p className={'object-caption'}>{currentMetaData.caption}</p>;
      } else if (currentMetaData.type.length === 1) {
        if (viewSet.has(currentMetaData.type[0])) {
          if (currentMetaData.type[0] === 'street' && i18n.language === 'ar') {
            let arabic = t('Street view of ');
            let interpolated = arabic.replace('X', getShopName());
            return <p className={'object-caption'}>{interpolated}</p>;
          }
          return (
            <p className={'object-caption'}>
              {t(
                currentMetaData.type[0].charAt(0).toUpperCase() +
                  currentMetaData.type[0].slice(1).toLowerCase() +
                  ' view of '
              )}{' '}
              {getShopName()}
            </p>
          );
        } else if (
          currentMetaData.type[0] === 'crafts' ||
          currentMetaData.type[0] === 'craft'
        ) {
          return (
            <p className={'object-caption'}>
              {t(
                currentMetaData.type[0].charAt(0).toUpperCase() +
                  currentMetaData.type[0].slice(1).toLowerCase() +
                  ' produced by '
              )}{' '}
              {getShopName()}
            </p>
          );
        } else if (currentMetaData.type[0] === 'craftsperson') {
          return (
            <p className={'object-caption'}>
              {t(
                currentMetaData.type[0].charAt(0).toUpperCase() +
                  currentMetaData.type[0].slice(1).toLowerCase() +
                  ' of '
              )}{' '}
              {getShopName()}
            </p>
          );
        }
      } else if (currentMetaData.type.length === 2) {
        const craftspersonIndex = currentMetaData.type.indexOf('craftsperson');

        const storefrontIndex = currentMetaData.type.indexOf('storefront');
        const indoorMap = interiorKeywords.map((word) => {
          return currentMetaData.type.indexOf(word) > -1;
        });

        const craftMap = ['crafts', 'craft'].map((word) => {
          return currentMetaData.type.indexOf(word) > -1;
        });
        if (craftspersonIndex > -1 && storefrontIndex > -1) {
          return (
            <p className={'object-caption'}>
              {t('Craftsperson in front of ')} {getShopName()}
            </p>
          );
        } else if (craftspersonIndex > -1 && indoorMap.indexOf(true) > -1) {
          return (
            <p className={'object-caption'}>
              {' '}
              {t('Craftsperson inside ')} {getShopName()}
            </p>
          );
        } else if (
          craftMap.indexOf(true) > -1 &&
          indoorMap.indexOf(true) > -1
        ) {
          return (
            <p className={'object-caption'}>
              {t('Crafts produced in ')} {getShopName()}
            </p>
          );
        } else if (
          craftMap.indexOf(true) > -1 &&
          currentMetaData.type.indexOf('storefront') > -1
        ) {
          return (
            <p className={'object-caption'}>
              {t('Crafts displayed in storefront of ')} {getShopName()}
            </p>
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log(workshop);
    setInvalidImages([]);
    if (type === 'workshop') {
      fetchSimilarWorkshops();
    } else {
      fetchSimilarArchives();
    }

    if (workshop.images) {
      fetchImageMetaData();
    }
  }, []);

  useEffect(() => {
    console.log(type);
    setInvalidImages([]);
    if (type === 'workshop') {
      console.log('here');
      fetchSimilarWorkshops();
    } else {
      fetchSimilarArchives();
    }

    if (workshop.images) {
      fetchImageMetaData();
    }
  }, [workshop]);

  const clickExplore = (e) => {
    openMapCard(e.target.id, type);
  };

  const getShopName = () => {
    if (workshop.shop_name['content']) {
      return workshop.shop_name['content'];
    } else if (workshop.shop_name['content_orig']) {
      return workshop.shop_name['content_orig'];
    } else {
      return t('Craft Shop (No name provided)');
    }
  };

  const getReferenceName = () => {
    return workshop.reference.name;
  };

  const getDecadeEstablished = () => {
    if (!workshop.decade_established) {
      return null;
    }

    if (workshop.decade_established[0]) {
      return t('Established ') + `${workshop.decade_established[0]}`;
    } else {
      return null;
    }
  };

  const getPrimaryDecade = () => {
    if (!workshop.primary_decade && !workshop.primary_year) {
      return null;
    }

    if (workshop.primary_year) {
      return t('Captured') + ` ${workshop.primary_year}`;
    }

    if (workshop.primary_decade[0]) {
      return t('Captured') + ` ${workshop.primary_decade[0]}`;
    }

    return null;
  };

  const getSubtitle = () => {
    let craftsList = [];
    let otherList = [];
    workshop.craft_discipline.forEach((craft) => {
      if (craft.toUpperCase() === 'OTHER') {
        if (
          workshop.craft_discipline_other &&
          workshop.craft_discipline_other.length > 0
        ) {
          workshop.craft_discipline_other.map((craftOther) => {
            const other =
              craftOther.charAt(0).toUpperCase() +
              craftOther.slice(1).toLowerCase();
            if (craftsList.indexOf(other) < 0) {
              otherList.push(craftOther.toLowerCase());
              if (craftsList.length < 1) {
                craftsList.push(t(other));
              } else {
                craftsList.push(' | ' + t(other));
              }
            }
          });
        }
      } else {
        const craftStr =
          craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase();
        if (craftsList.length < 1) {
          craftsList.push(t(craftStr));
        } else {
          if (otherList.indexOf(craft.toLowerCase()) < 0) {
            craftsList.push(' | ' + t(craftStr));
          }
        }
      }
    });
    if (craftsList.length > 0) {
      return craftsList;
    } else {
      return null;
    }
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank').focus();
  };

  const getContactInfo = () => {
    if (workshop.contact_info) {
      console.log('has contact info');
      const contactInfo = [];
      for (let [key, value] of Object.entries(workshop.contact_info)) {
        console.log(`${key}: ${value}`);
        if (key === 'phone' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faPhone} width={16} color={'#AEAEAE'} />{' '}
              &thinsp;
              <a className={'shopSubtitle-text'} href={`tel:${value}`}>
                {value}
              </a>
            </div>
          );
        } else if (key === 'email' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faEnvelope} width={16} color={'#AEAEAE'} />{' '}
              &thinsp;
              <a className={'shopSubtitle-text'} href={`mailto:${value}`}>
                {value}
              </a>
              <br />
            </div>
          );
        } else if (key === 'website' && value) {
          // TODO: slice https/http out
          const indexHTTPS = value.indexOf('https://');
          const indexHTTP = value.indexOf('http://');
          if (indexHTTPS > -1) {
            value = value.slice(indexHTTPS, indexHTTPS + 8);
          }
          if (indexHTTP > -1) {
            value = value.slice(indexHTTPS, indexHTTPS + 7);
          }

          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faLink} width={16} color={'#AEAEAE'} />{' '}
              &thinsp;
              <a
                className={'shopSubtitle-text'}
                target="_blank"
                href={`//www.${value}`}
              >
                {value}
              </a>
              <br />
            </div>
          );
        } else if (key === 'facebook' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faFacebook} width={16} color={'#AEAEAE'} />{' '}
              &thinsp;
              <a
                className={'shopSubtitle-text'}
                target="_blank"
                href={`//www.${value}`}
              >
                {value}
              </a>
              <br />
            </div>
          );
        } else if (key === 'instagram' && value) {
          // TODO: slice "@"
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon
                icon={faInstagramSquare}
                width={16}
                color={'#AEAEAE'}
              />{' '}
              &thinsp;
              <a
                className={'shopSubtitle-text'}
                target="_blank"
                href={`//www.instagram.com/${value.slice(1)}`}
              >
                {value.slice(1)}
              </a>
              <br />
            </div>
          );
        } else if (key === 'twitter' && value) {
          // TODO: slice "@"
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faTwitter} width={16} color={'#AEAEAE'} />{' '}
              &thinsp;
              <a
                className={'shopSubtitle-text'}
                target="_blank"
                href={`//www.twitter.com/${value.slice(1)}`}
              >
                {value.slice(1)}
              </a>
              <br />
            </div>
          );
        }
        // else {
        //    contactInfo.push(<p className={"shopSubtitle-text"}>{value}</p>)
        // }
      }
      return contactInfo;
    }
  };

  const getAddress = () => {
    if (workshop.location) {
      const streetName = `${
        workshop.location.address.content
          ? `${workshop.location.address.content},`
          : ''
      }`;
      const adm4 = `${
        workshop.location.adm4 ? `${workshop.location.adm4},` : ''
      }`;
      const adm3 = `${
        workshop.location.adm3 ? `${workshop.location.adm3},` : ''
      }`;
      const adm2 = `${
        workshop.location.adm2 ? `${workshop.location.adm2},` : ''
      }`;
      const adm1 = `${
        workshop.location.adm1 ? `${workshop.location.adm1},` : ''
      }`;

      let address = `${streetName} ${adm4} ${adm3} ${adm2} ${adm1}`;
      if (address.slice(-1) === ',') {
        address = address.slice(0, -1);
      }

      return <p className={'shopSubtitle-text'}>{address}</p>;
    }
  };

  const handleOnError = (e) => {
    let el = e.target;
    console.log('key ', el.id);
    //let newInvImgs = this.state.invalidImages
    //newInvImgs.push(el.id)
    //this.setState({invalidImages: newInvImgs})
    //console.log("invalidImages ", this.state.invalidImages)
    //el.parentNode.removeChild(el)
    //el.src = '';
    el.classList.add('broken-img');
    //el.src = 'broken_img.png'
    el.onerror = null;
    el.alt = 'Image Unavailable';
    el.title = 'Image Unavailable';
    //console.log("metadata ", this.state.imageMetaData)
  };

  const getImages = () => {
    if (!imageMetaData || imageMetaData.size < 1) {
      return;
    }

    // console.log(imageMetaData)

    return imageMetaData.map((image, index) => {
      return (
        <img
          key={image}
          id={index}
          className={'mapCard-img'}
          src={image.src}
          alt="img"
          onError={handleOnError}
        />
      );
    });
  };

  const getThumbnails = () => {
    // console.log("getting similar thumbnails, ", similarObjects)
    return similarObjects.map((object) => {
      //console.log(object.thumb_img_id)
      //const coords = [workshop.location.geo['lng'], workshop.location.geo['lat']]
      //return <div className={'exploreShop-div'}><img src={`/api/images/${workshop.thumb_img_id}.jpg`} className={'exploreShops-img'} key={workshop.thumb_img_id}/></div>

      if (object.thumb_img_id) {
        return (
          <img
            src={`/api/images/${object.thumb_img_id}.jpg`}
            className={'exploreShops-img'}
            id={object.ID}
            key={object.thumb_img_id}
            onClick={clickExplore}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onError={handleOnError}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getReferences = () => {
    let reference;

    if (!workshop.reference) return;
    else reference = workshop.reference;

    const referenceName = reference?.name;
    const referenceLink = reference?.link;
    const referenceCitation = reference?.citation;
    const referenceLocation = reference?.location;

    return (
      <React.Fragment>
        {referenceName && (
          <p className={'shopSubtitle-text'}>
            Reference: {referenceName},{' '}
            {referenceCitation && (
              <a href={referenceLink}>{referenceCitation}</a>
            )}
          </p>
        )}

        {referenceLocation && (
          <p className={'shopSubtitle-text'}>
            Reference Location: {referenceLocation}
          </p>
        )}
      </React.Fragment>
    );
  };

  const createMapCardContent = () => {
    if (type === 'workshop') {
      return (
        <>
          <div className={'close-btn-container'}>
            <div>
              <p className={'shopName-text'}>
                {getShopName() || 'Craft Shop (No name provided)'} &thinsp;
                <span>
                  <Info
                    icon={
                      workshop.survey_origin !== 'workshop_contribution'
                        ? 'check'
                        : 'question'
                    }
                    text={
                      workshop.survey_origin !== 'workshop_contribution'
                        ? t(
                            'This crafts workshop has been reviewed and verified'
                          )
                        : t('This workshop has not been reviewed and verified.')
                    }
                  />
                </span>
              </p>

              <p className={'shopSubtitle-text'}>
                {getDecadeEstablished()}{' '}
                {getSubtitle() && getDecadeEstablished() ? ' | ' : ''}{' '}
                {getSubtitle()}{' '}
              </p>
            </div>

            <button
              className={'close-card-btn close-mapcard'}
              onClick={closeMapCard}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#404044"
                />
              </svg>
            </button>
          </div>

          {workshop.consent ? (
            <div>
              {getAddress()} {getContactInfo()}
            </div>
          ) : null}

          {workshop.images.length !== 0 ? (
            <>
              <div className={'mapCard-slider-container'}>
                <MapCardSlider
                  handleScroll={onScroll}
                  children={getImages()}
                  sliderStyle={mainSliderStyle}
                  currentIndex={currentImageIndex}
                />
              </div>
              <div>{getCaption()}</div>
            </>
          ) : null}

          <hr />

          <div>
            <small className={'object-caption'}>
              If you would like to update any outdated or incorrect information
              listed about this craft workshop, please contact{' '}
              <span className={'object-caption'}>
                <a href={'mailto:livingheritage@mit.edu'}>
                  {' '}
                  livingheritage@mit.edu
                </a>
              </span>
              .
            </small>
          </div>
          {similarObjects ? (
            getThumbnails().length > 0 ? (
              <>
                <p className={'exploreShops-label'}>
                  {t('Explore Similar Shops')}
                </p>
                <div className={'exploreContainer'}>
                  {similarObjects ? (
                    <Slider children={getThumbnails()} />
                  ) : null}
                </div>
              </>
            ) : null
          ) : null}
        </>
      );
    } else {
      return (
        <>
          <div className={'close-btn-container'}>
            <div>
              <div className={'shop-title-verification'}>
                <p className={'shopName-text'}>
                  {getShopName() || 'Craft Shop (No name provided)'} &thinsp;
                  <span>
                    <Info
                      icon={
                        workshop.info_type !== 'archive_contribution'
                          ? 'check'
                          : 'question'
                      }
                      text={
                        workshop.info_type !== 'archive_contribution'
                          ? t(
                              'This archive image has been reviewed and verified.'
                            )
                          : t(
                              'This archive image has not been reviewed and verified.'
                            )
                      }
                    />
                  </span>
                </p>
              </div>

              <p className={'shopSubtitle-text'}>
                {getPrimaryDecade()}{' '}
                {getSubtitle() && getPrimaryDecade() ? ' | ' : ''}{' '}
                {getSubtitle()}{' '}
              </p>
              {getReferences()}
            </div>

            <button
              className={'close-card-btn close-mapcard'}
              onClick={closeMapCard}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#404044"
                />
              </svg>
            </button>
          </div>

          {workshop.images.length !== 0 ? (
            <>
              <div className={'mapCard-slider-container'}>
                <MapCardSlider
                  handleScroll={onScroll}
                  children={getImages()}
                  sliderStyle={mainSliderStyle}
                  currentIndex={currentImageIndex}
                />
              </div>

              <div>{getCaption()}</div>
            </>
          ) : null}

          <hr />

          {similarObjects ? (
            getThumbnails().length > 0 ? (
              <>
                <p className={'exploreShops-label'}>
                  {t('Explore Similar Images')}
                </p>
                <div className={'exploreContainer'}>
                  {similarObjects ? (
                    <Slider children={getThumbnails()} />
                  ) : null}
                </div>
              </>
            ) : null
          ) : null}
        </>
      );
    }
  };

  const [dragging, setDragging] = useState(null);

  return (
    <>
      <Desktop>
        <div className={'mapCard'} id={`mapCard${id}`}>
          {workshop && createMapCardContent()}
        </div>
      </Desktop>

      <Tablet>
        <div className={'mapCard'} id={`mapCard${id}`}>
          {workshop && createMapCardContent()}
        </div>
      </Tablet>

      <Mobile>
        <div className={'mapCard-drag-container'}>
          <Draggable
            axis="y"
            bounds="parent"
            // position={swiping?{x:0, y:window.innerHeight}:null}
            cancel={'.mapCard-slider-container, .exploreContainer'}
            handle={'.mapCard-dragger'}
            /*onStart={(e)=> {
                                               setDragging(e.clientY)

                                           }
                                }
                                           onDrag={(e)=> {
                                               if (e.clientY-dragging>100) {
                                                   setSwiping(true)
                                                   let div = document.getElementById(`mapCard${id}`)
                                                   div.style.transform=`translate(0, ${window.innerHeight}`;
                                                   //div.style.top=`${window.innerHeight}px`;
                                                   div.style.transition=`transform 0.5s`;
                                               }
                                           }}
                                           onStop={()=>{
                                               console.log("ended draggin")
                                           }*/
          >
            <div
              className={'mapCard'}
              id={`mapCard${id}`}
              /* style={{
                                             transition: `${swiping?`transform 0.5s`:'transform 0.0s'}`}}*/
            >
              <div className={'mapCard-dragger'}>
                <svg
                  width="24"
                  height="4"
                  viewBox="0 0 24 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1.5"
                    y1="2.26367"
                    x2="22.5"
                    y2="2.26367"
                    stroke="#CFCFCF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {workshop && createMapCardContent()}
            </div>
          </Draggable>
        </div>
      </Mobile>
    </>
  );
};
export default MapCard;
