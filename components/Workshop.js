import ImagePreview from './discover/ImagePreview';
import MapCardSlider from './Map/MapCardSlider';
import Slider from './Slider';
import { ImageMeta, Workshop as WorkshopType } from '../models/Types';
import MiniMap from './discover/MiniMap';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useTranslation } from 'react-i18next';
import Info from './Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLink, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagramSquare,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const mainSliderStyle = {
  sliderContainer: 'mapSlider-container',
  buttonLabel: 'slider-btn-label',
  prevButton: 'btn-prev',
  nextButton: 'btn-next',
  wrapperContainer: 'mapSlider-wrapper',
};

/**
 * This component can be used to display a generic workshop, either on the
 * Discover page or the Map page, or as the workshop preview in the
 * contribution page.
 *
 * @param {object} props - Props
 * @param {WorkshopType} props.workshop - Workshop to display
 * @param {ImageMeta[]} props.imageMetas - Image metadata for the workshop,
 *    provided in an array
 * @param {string} props.imageSrc - Image source for the workshop's images.
 *    Right now this is only really needed by the contribution preview.
 * @param {WorkshopType[]} props.similarWorkshops- Similar workshop objects to
 *    display, provided in an array which may be empty or null.
 * @returns {JSX.Element}
 */
const Workshop = ({
  workshop,
  imageMetas,
  imageSrc,
  similarWorkshops,
  handleClose,
  lang,
  i18n,
  preview = false,
  preserveAspect = false,
}) => {
  const { t } = useTranslation();
  const getImages = () => {
    const thumbImage = imageMetas.filter(
      (image) => image.img_id === workshop.thumb_img_id
    );
    const remainingImages = imageMetas.filter(
      (image) => image.img_id !== workshop.thumb_img_id
    );
    const orderedImages = [...thumbImage, ...remainingImages];
    return orderedImages;
  };

  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(getImages());

  const onScroll = () => {
    const slider = document.querySelector('.mapSlider-container');
    const firstImage = document.querySelector('.mapCard-img');
    const parentPos = slider.getBoundingClientRect();
    const childPos = firstImage.getBoundingClientRect();
    const relativePos = parentPos.left - childPos.left;
    const parentWidth = parentPos.width;
    if (i18n.language === 'en') {
      setIndex(Math.round(relativePos / parentWidth));
    } else {
      setIndex(-Math.round(relativePos / parentWidth));
    }
  };

  useEffect(() => {
    setIndex(0);
    setImages(getImages());
  }, [workshop]);

  const getShopName = () => {
    if (workshop.shop_name['content']) {
      return workshop.shop_name['content'];
    } else if (workshop.shop_name['content_orig']) {
      return workshop.shop_name['content_orig'];
    } else {
      return t('Craft Shop (No name provided)');
    }
  };

  const getCaption = () => {
    const currentMetaData = images[index];
    const viewKeywords = ['storefront', 'street', 'interior', 'indoor'];
    const interiorKeywords = ['interior', 'inside', 'indoor'];
    const viewSet = new Set(viewKeywords);

    if (currentMetaData) {
      if (currentMetaData.caption) {
        return <p className={'object-caption'}>{currentMetaData.caption}</p>;
      } else if (currentMetaData.type.length === 1) {
        if (viewSet.has(currentMetaData.type[0])) {
          if (currentMetaData.type[0] === 'street') {
            let arabic = t(`Street view of ${getShopName()}`);
            let interpolated = arabic.replace('X', t(getShopName()));
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

    if (
      Array.isArray(workshop.craft_discipline_other) &&
      workshop.craft_discipline_other.length > 0
    ) {
      workshop.craft_discipline_other.forEach((craft) => {
        const craftStr =
          craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase();
        if (!craftsList) {
          craftsList.push(t(craftStr));
        } else if (otherList.indexOf(craft.toLowerCase()) < 0) {
          craftsList.push(' | ' + t(craftStr));
        }
      });
    }
    if (craftsList.length > 0) {
      return craftsList;
    } else {
      return null;
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

      return <p className={'object-caption'}>{address}</p>;
    }
  };

  const getContactInfo = () => {
    if (workshop.contact_info) {
      const contactInfo = [];
      for (const [key, value] of Object.entries(workshop.contact_info)) {
        if (value) {
          value = value.replace('https', '');
          value = value.replace('http', '');
        }
        if (key === 'phone' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faPhone} width={16} /> &thinsp;
              <a className={'object-caption'} href={`tel:${value}`}>
                {value}
              </a>
            </div>
          );
        } else if (key === 'email' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faEnvelope} width={16} color={'#471e10'} />{' '}
              &thinsp;
              <a className={'object-caption'} href={`mailto:${value}`}>
                {value}
              </a>
            </div>
          );
        } else if (key === 'website' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faLink} width={16} color={'#471e10'} />{' '}
              &thinsp;
              <a
                className={'object-caption'}
                target="_blank"
                href={`//www.${value}`}
              >
                {value}
              </a>
            </div>
          );
        } else if (key === 'facebook' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon
                icon={faFacebook}
                width={16}
                color={'#471e10'}
                height={16}
              />{' '}
              &thinsp;
              <a
                className={'object-caption'}
                target="_blank"
                href={`//www.${value}`}
              >
                {value}
              </a>
            </div>
          );
        } else if (key === 'instagram' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon
                icon={faInstagramSquare}
                width={16}
                color={'#471e10'}
              />{' '}
              &thinsp;
              <a
                className={'object-caption'}
                target="_blank"
                href={`//www.instagram.com/${value.slice(1)}`}
              >
                {value}
              </a>
            </div>
          );
        } else if (key === 'twitter' && value) {
          contactInfo.push(
            <div className={'contact-container'}>
              <FontAwesomeIcon icon={faTwitter} width={16} color={'#471e10'} />{' '}
              &thinsp;
              <a
                className={'object-caption'}
                target="_blank"
                href={`//www.twitter.com/${value.slice(1)}`}
              >
                {value}
              </a>
            </div>
          );
        }
      }
      return contactInfo;
    }
  };

  const getDecadeEstablished = () => {
    if (!workshop.decade_established) {
      return null;
    }

    if (workshop.decade_established[0]) {
      return t('Established') + ` ${workshop.decade_established[0]}`;
    } else {
      return null;
    }
  };

  const showImages = () => {
    return images.map((image) => {
      let source;
      if (preview) {
        source = imageSrc[index + 1];
      } else {
        source = imageSrc || image.src;
      }
      return (
        <img
          key={image.img_id}
          className={`${
            preserveAspect ? 'preserveRatio' : 'cropRatio'
          } mapCard-img objectSlider-img`}
          style={{
            width: '100%',
            height: '100%',
            marginRight: '10px',
            scrollSnapAlign: 'center',
            borderRadius: '0px',
          }}
          src={source}
          alt=""
        />
      );
    });
  };

  return (
    <>
      <Desktop>
        <div className={'popup-section slider'}>
          <div
            className={
              !preview
                ? 'object-slider-section'
                : 'object-slider-section-preview'
            }
          >
            {imageMetas?.length > 0 && (
              <MapCardSlider
                handleScroll={onScroll}
                children={showImages()}
                sliderStyle={mainSliderStyle}
                currentIndex={index}
              />
            )}
          </div>
        </div>

        <div className={'popup-section'}>
          <div style={{ height: '100%' }}>
            <div className={'object-title-section section-margin'}>
              <div className={'shop-title-verification'}>
                <p className={'object-name'}>
                  {getShopName() || 'Craft Shop (No name provided)'} &thinsp;
                  <span>
                    <Info
                      icon={
                        workshop.info_type !== 'workshop_contribution'
                          ? 'check'
                          : 'question'
                      }
                      text={
                        workshop.info_type !== 'workshop_contribution'
                          ? 'This workshop was reviewed and verified.'
                          : 'This workshop is still under review and is not verified yet.'
                      }
                    />
                  </span>
                </p>
              </div>

              <p className={'object-subtitle'}>
                {getDecadeEstablished()}
                {getSubtitle() && getDecadeEstablished() ? ' | ' : ''}{' '}
                {getSubtitle()}
              </p>
            </div>

            {workshop.consent ? (
              <div className={'section-margin'}>{getAddress()}</div>
            ) : null}

            {workshop.consent ? (
              <div className={'section-margin'}>{getContactInfo()}</div>
            ) : null}

            <div className={'section-margin'}> {getCaption()}</div>

            <div className={'object-map-section'}>
              <p className={'object-caption'}>
                {t('Locate this craft workshop on the map')}{' '}
              </p>
              <div className={'miniMap-container'}>
                <MiniMap
                  workshop={workshop}
                  type={'workshop'}
                  lang={lang}
                  i18n={i18n}
                />
              </div>
            </div>

            <div>
              <small className={'object-caption'}>
                If you would like to update any outdated or incorrect
                information listed about this craft workshop, please contact{' '}
                <span className={'object-caption'}>
                  <a href={'mailto:livingheritage@mit.edu'}>
                    {' '}
                    livingheritage@mit.edu
                  </a>
                </span>
                .
              </small>
            </div>

            {similarWorkshops ? (
              <div className={'object-suggestion-section'}>
                <p className={'object-caption'}>
                  {t('Discover similar craft workshops')}
                </p>
                <div className={'object-suggestion-container'}>
                  <div className={'object-suggestion-parent'}>
                    <Slider>
                      {similarWorkshops?.map((shop) => (
                        <div key={shop.ID} className="object-img">
                          <ImagePreview
                            workshop={shop}
                            grayscale={true}
                            routeToAPI={'../api/imageMetaData/'}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Desktop>

      <Tablet>
        <div className={'popup-section'}>
          <div style={{ height: '100%', overflowY: 'auto' }}>
            <div className={'object-title-section section-margin'}>
              <p className={'object-name'}>
                {getShopName() || 'Craft Shop (No name provided)'} &thinsp;
                <span>
                  <Info
                    icon={
                      workshop.info_type !== 'workshop_contribution'
                        ? 'check'
                        : 'question'
                    }
                    text={
                      workshop.info_type !== 'workshop_contribution'
                        ? 'This archive image was reviewed and verified.'
                        : 'This archive image is still under review and is not verified yet.'
                    }
                  />
                </span>
              </p>

              <p className={'object-subtitle'}>
                {getDecadeEstablished()}
                {getSubtitle() && getDecadeEstablished() ? ' | ' : ''}
                {getSubtitle()}
              </p>
            </div>

            {workshop.consent ? (
              <div className={'section-margin'}>{getAddress()}</div>
            ) : null}

            {workshop.consent ? (
              <div className={'section-margin'}>{getContactInfo()}</div>
            ) : null}

            <div className={'section-margin'}>{getCaption()}</div>

            <div className={'object-slider-section-tablet'}>
              {imageMetas?.length > 0 && (
                <MapCardSlider
                  handleScroll={onScroll}
                  children={showImages()}
                  sliderStyle={mainSliderStyle}
                  currentIndex={index}
                />
              )}
            </div>
            <div className={'object-map-section section-margin'}>
              <p className={'object-caption'}>
                {t('Locate this craft workshop on the map')}
              </p>
              <div className={'miniMap-container'}>
                <MiniMap
                  workshop={workshop}
                  type={'workshop'}
                  lang={lang}
                  i18n={i18n}
                />
              </div>
            </div>

            <div>
              <small className={'object-caption'}>
                If you would like to update any outdated or incorrect
                information listed about this craft workshop, please contact{' '}
                <span className={'object-caption'}>
                  <a href={'mailto:livingheritage@mit.edu'}>
                    {' '}
                    livingheritage@mit.edu
                  </a>
                </span>
                .
              </small>
            </div>

            {similarWorkshops ? (
              <div className={'object-suggestion-section'}>
                <p className={'object-caption'}>
                  {t('Discover similar craft workshops')}
                </p>
                <div className={'object-suggestion-container'}>
                  <div className={'object-suggestion-parent'}>
                    <Slider>
                      {similarWorkshops?.map((shop) => (
                        <div key={shop.ID} className="object-img">
                          <ImagePreview
                            workshop={shop}
                            grayscale={true}
                            routeToAPI={'../api/imageMetaData/'}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Tablet>

      <Mobile>
        <div className={'popup-section'}>
          <div
            style={{
              position: 'sticky',
              top: '0px',
              backgroundColor: '#faf8f6',
              zIndex: 300,
              direction: 'ltr',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 'fit-content',
            }}
          >
            {handleClose ? (
              <button
                className={'close-card-btn object-mobile-close'}
                onClick={() => {
                  handleClose;
                }}
              >
                <FontAwesomeIcon icon={faXmark} size={'sm'} />
              </button>
            ) : null}
            <div
              className={
                !preview
                  ? 'object-mobile-heading'
                  : 'object-mobile-heading-preview'
              }
            >
              <div
                className={
                  !preview
                    ? 'object-mobile-heading-subcontainer'
                    : 'object-mobile-heading-subcontainer-preview'
                }
              >
                <p className={'object-mobile-title'}>
                  {getShopName() || 'Craft Shop (No name provided)'} &thinsp;
                  <span>
                    <Info
                      icon={
                        workshop.info_type !== 'workshop_contribution'
                          ? 'check'
                          : 'question'
                      }
                      text={
                        workshop.info_type !== 'workshop_contribution'
                          ? 'This archive image was reviewed and verified.'
                          : 'This archive image is still under review and is not verified yet.'
                      }
                    />
                  </span>
                </p>
                <p className={'object-mobile-subtitle'}>
                  {getDecadeEstablished()}
                  {getSubtitle() && getDecadeEstablished() ? ' | ' : ''}{' '}
                  {getSubtitle()}
                </p>
              </div>

              {workshop.consent ? (
                <div className={'section-margin'}>{getAddress()}</div>
              ) : null}

              {workshop.consent ? (
                <div className={'object-mobile-contact-info'}>
                  {getContactInfo()}
                </div>
              ) : null}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              className={
                !preview
                  ? 'object-slider-section-tablet'
                  : 'object-slider-section-tablet-preview'
              }
            >
              {imageMetas?.length > 0 && (
                <MapCardSlider
                  handleScroll={onScroll}
                  children={showImages()}
                  sliderStyle={mainSliderStyle}
                  currentIndex={index}
                />
              )}
            </div>
            <div className={'object-mobile-section section-margin'}>
              {getCaption()}
            </div>

            <div className={'object-mobile-section object-map-section'}>
              <p className={'card-section-labels'}>
                {t('Locate this craft workshop on the map')}{' '}
              </p>
              <MiniMap
                workshop={workshop}
                type={'workshop'}
                lang={lang}
                i18n={i18n}
              />
            </div>

            <div className={'object-mobile-section'}>
              <small className={'object-caption'}>
                If you would like to update any outdated or incorrect
                information listed about this craft workshop, please contact{' '}
                <span className={'object-caption'}>
                  <a href={'mailto:livingheritage@mit.edu'}>
                    {' '}
                    livingheritage@mit.edu
                  </a>
                </span>
                .
              </small>
            </div>

            {similarWorkshops ? (
              <div
                className={'object-suggestion-section'}
                style={{ padding: '12px 24px' }}
              >
                <p className={'object-caption'}>
                  {t('Discover similar craft workshops')}
                </p>
                <div className={'object-suggestion-container'}>
                  <div className={'object-suggestion-parent'}>
                    <Slider>
                      {similarWorkshops?.map((shop) => (
                        <div key={shop.ID} className="object-img">
                          <ImagePreview
                            workshop={shop}
                            grayscale={true}
                            routeToAPI={'../api/imageMetaData/'}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default Workshop;
