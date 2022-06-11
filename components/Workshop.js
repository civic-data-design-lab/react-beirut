import ImagePreview from './discover/ImagePreview';
import MapCardSlider from './Map/MapCardSlider';
import Slider from './Slider';
import { Workshop as WorkshopType, ImageMeta } from '../models/Types';
import MiniMap from "./discover/MiniMap";
import {useEffect, useRef, useState} from "react";
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

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
const Workshop = ({ workshop, imageMetas, imageSrc, similarWorkshops, handleClose, includeSuggestion}) => {


  const getImages = () => {
      const thumbImage = imageMetas.filter(
      (image) => image.img_id === workshop.thumb_img_id
        );
      const remainingImages = imageMetas.filter(
          (image) => image.img_id !== workshop.thumb_img_id
        );
      const orderedImages = [...thumbImage, ...remainingImages];
      console.log("ordered images ", orderedImages)
      return orderedImages
  }

  const [index, setIndex] = useState(0)
  const [images, setImages] = useState(getImages())


  const onScroll = () => {
        const slider = document.querySelector('.mapSlider-container')
        const firstImage = document.querySelector('.mapCard-img')
        const parentPos = slider.getBoundingClientRect()
        const childPos = firstImage.getBoundingClientRect()
        const relativePos = parentPos.left - childPos.left;
        const parentWidth = parentPos.width;
        setIndex(Math.round(relativePos/parentWidth))
    }


    useEffect(() => {
      setIndex(0)
      setImages(getImages())
      console.log("images ", images)
    }, [workshop]);

  const getShopName = () => {

        if (workshop.shop_name['content']) {
            return workshop.shop_name['content']
        } else if (workshop.shop_name['content_orig']) {
            return workshop.shop_name['content_orig']
        } else {
            return 'Shop'
        }
    }



  const getCaption = () => {
        console.log('current images image metadata ', images[index])
        //return <p>{this.state.currentImageIndex}</p>
        //let imageContainer = document.querySelector('.mapSlider-wrapper');
        //return (<p>{imageContainer.offsetWidth}</p>)

        const currentMetaData = images[index]
        const viewKeywords = ["storefront", "street", "interior", "indoor"];
        const interiorKeywords = ["interior", "inside", "indoor"]
        const viewSet = new Set(viewKeywords);

        if (currentMetaData) {
            if (currentMetaData.caption) {
                return <p className={'object-caption'}>{currentMetaData.caption}</p>
            } else if (currentMetaData.type.length === 1) {
                if (viewSet.has(currentMetaData.type[0])) {
                    return <p className={'object-caption'}>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} view of {getShopName()}. </p>
                } else if (currentMetaData.type[0] === "crafts" || currentMetaData.type[0] === "craft") {
                    return <p className={'object-caption'}>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} produced by {getShopName()}</p>
                } else if (currentMetaData.type[0] === "craftsperson") {
                    return <p className={'object-caption'}>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} of {getShopName()}</p>
                }
            } else if (currentMetaData.type.length === 2) {
                const craftspersonIndex = currentMetaData.type.indexOf("craftsperson")

                const storefrontIndex = currentMetaData.type.indexOf("storefront")
                const indoorMap = interiorKeywords.map((word)=> {
                    return currentMetaData.type.indexOf(word)>-1
                })

                const craftMap = ["crafts", "craft"].map((word) => {
                    return currentMetaData.type.indexOf(word)>-1
                })
                if (craftspersonIndex>-1 && storefrontIndex>-1) {
                    return <p className={'object-caption'}>Craftsperson in front of {getShopName()}.</p>
                } else if (craftspersonIndex>-1 && indoorMap.indexOf(true)>-1) {
                    return <p className={'object-caption'}>Craftsperson inside {getShopName()}.</p>
                } else if (craftMap.indexOf(true)>-1 && indoorMap.indexOf(true)>-1) {
                    return <p className={'object-caption'}>Crafts produced in {getShopName()}.</p>
                } else if (craftMap.indexOf(true)>-1 && currentMetaData.type.indexOf('storefront')>-1) {
                    return <p className={'object-caption'}>Crafts displayed in storefront of {getShopName()}.</p>
                }

            }
        }
    }


  const getSubtitle = () => {
        let craftsList = []
        let otherList = []
        workshop.craft_discipline.forEach(craft =>
            {
            if (craft.toUpperCase() === "OTHER") {
                if (workshop.craft_discipline_other) {
                    const other = workshop.craft_discipline_other.charAt(0).toUpperCase() + workshop.craft_discipline_other.slice(1).toLowerCase()
                    if (craftsList.indexOf(other) < 0) {
                        otherList.push(workshop.craft_discipline_other.toLowerCase())
                        if (craftsList.length < 1) {
                            craftsList.push(other)
                        } else {
                            craftsList.push(" | " + other)
                        }
                    }
                }
            } else {
                if (craftsList.length<1) {
                    craftsList.push(craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase());
                } else {
                    //console.log("subtitle debug ", craftsList, otherList, craft.toLowerCase())
                    //console.log(otherList.indexOf(craft.toLowerCase()))
                    if (otherList.indexOf(craft.toLowerCase())<0)
                    craftsList.push(" | " + craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase());
                }
            }
        }
        )
        return craftsList
 }

 const getDecadeEstablished = () => {
        if (!workshop.decade_established) {
            return null
        }
        //console.log(this.props.type)

        if (workshop.decade_established[0]) {
            return `Since ${workshop.decade_established[0]} | `
        } else {
                return null
            }
        }






  const showImages = () => {
    return images.map((image) => {
      return (
        <img
          key={image.img_id}
          className="mapCard-img objectSlider-img"
          style={{
            width: '100%',
            height: '100%',
            marginRight: '10px',
            objectFit: 'cover',
            scrollSnapAlign: 'center',
            borderRadius: '0px'
          }}
          src={imageSrc || image.src}
          alt=""
        />
      );
    });
  };

  return (
    <>

        <Desktop>

            <div className={'popup-section'}>
                <div className={'object-slider-section'}>
                {imageMetas?.length > 0 && (
                    <MapCardSlider
                        handleScroll={onScroll}
                        children={showImages()}
                        sliderStyle={mainSliderStyle}
                    />
                )}
            </div>
            </div>

            <div className={'popup-section'}>
                <div className={'object-title-section'}>
                        <h1 className={'object-name'}>{getShopName()}</h1>
                        <p className={'object-subtitle'}>{getDecadeEstablished()}{getSubtitle()}</p>
                        <br/>
                        <p className={'object-caption'}>{getCaption()}</p>
                </div>


                <div className={'object-map-section'}>
                    <p className={'object-caption'}>Locate this craft workshop on the map </p>
                    <div className={'miniMap-container'}>
                        <MiniMap workshop={workshop} type={'workshop'}/>
                    </div>
                </div>

                {includeSuggestion ?

                <div className={"object-suggestion-section"}>
                    <p className={'object-caption'}>
                        Discover similar craft workshops
                    </p>
                    <div className={'object-suggestion-container'}>
                    <div className={'object-suggestion-parent'}>
                        <Slider>
                      {similarWorkshops?.map((shop) => (
                        <div key={shop.ID} className="object-img">
                          <ImagePreview workshop={shop} grayscale={true} />
                        </div>
                      ))}
                    </Slider>
                    </div>
                        </div>
                </div> : null }
            </div>
        </Desktop>

        <Tablet>
            <div className={'popup-section'}>
                <div className={'object-title-section'}>
                <h1 className={'object-name'}>{getShopName()}</h1>
                <p className={'object-subtitle'}>{getDecadeEstablished()}{getSubtitle()}</p>
                <br/>
                <p className={'object-caption'}>{getCaption()}</p>
                </div>

                <div className={'object-slider-section-tablet'}>
                {imageMetas?.length > 0 && (
                    <MapCardSlider
                        handleScroll={onScroll}
                        children={showImages()}
                        sliderStyle={mainSliderStyle}
                    />
                )}
            </div>
            <div className={'object-map-section'}>
                    <p className={'object-caption'}>Locate this craft workshop on the map </p>
                    <div className={'miniMap-container'}>
                        <MiniMap workshop={workshop} type={'workshop'}/>
                        </div>
            </div>

                { includeSuggestion ?
            <div className={"object-suggestion-section"}>
                    <p className={'object-caption'}>
                        Discover similar craft workshops
                    </p>
                    <div className={'object-suggestion-container'}>
                    <div className={'object-suggestion-parent'}>
                        <Slider>
                      {similarWorkshops?.map((shop) => (
                        <div key={shop.ID} className="object-img">
                          <ImagePreview workshop={shop} grayscale={true} />
                        </div>
                      ))}
                    </Slider>
                    </div>
                        </div>
                </div> : null }
            </div>
        </Tablet>

        <Mobile>
            <div className={'popup-section'}>
                <div style={{position:'sticky', top:'0px', backgroundColor:'#faf8f6', zIndex:300}}>
                <button className={'close-card-btn object-mobile-close'} onClick={handleClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5098 3.86961L15.7298 2.09961L5.83984 11.9996L15.7398 21.8996L17.5098 20.1296L9.37984 11.9996L17.5098 3.86961Z" fill="#333333"/>
                    </svg>
                </button>
                <div className={'object-mobile-heading'}>
                    <p className={'object-mobile-title'}>{getShopName()}</p>
                    <p className={'object-mobile-subtitle'}>{getDecadeEstablished()}{getSubtitle()}</p>
                </div>
                </div>

                <div style={{display:'flex', flexDirection:'column', justifyContent:"space-between"}}>

                <div className={'object-slider-section-tablet'}>
                {imageMetas?.length > 0 && (
                    <MapCardSlider
                        handleScroll={onScroll}
                        children={showImages()}
                        sliderStyle={mainSliderStyle}
                    />
                )}
            </div>
                <div className={'object-mobile-section'}>
                    <p>{getCaption()}</p>
                </div>

                <div className={'object-mobile-section object-map-section'}>
                    <p className={'card-section-labels'}>Locate this craft workshop on the map </p>
                        <MiniMap workshop={workshop} type={'workshop'}/>
                </div>

                { includeSuggestion ? <div className={'object-mobile-section object-suggestion-section'}>
                    <p className={'card-section-labels'}>
                        Discover similar craft workshops
                    </p>
                    <div className={'object-suggestion-container'}>
                    <div className={'object-suggestion-parent'}>
                        <Slider>
                      {similarWorkshops?.map((shop) => (
                        <div key={shop.ID} className="object-img">
                          <ImagePreview workshop={shop} grayscale={true} />
                        </div>
                      ))}
                    </Slider>
                    </div>
                        </div>
                </div> : null }
            </div>
                </div>
        </Mobile>






    </>
  );
};

export default Workshop;

