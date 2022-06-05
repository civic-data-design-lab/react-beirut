import MapCardSlider from './explore/MapCardSlider';
import Slider from './Slider';
import { Archive as ArchiveType, ImageMeta } from '../models/Types';
import MiniMap from "./discover/MiniMap";
import ImagePreview from "./discover/ImagePreview";
import {useState, useEffect} from "react";

const mainSliderStyle = {
  sliderContainer: 'mapSlider-container',
  buttonLabel: 'slider-btn-label',
  prevButton: 'btn-prev',
  nextButton: 'btn-next',
  wrapperContainer: 'mapSlider-wrapper',
};

/**
 * This component can be used to display a generic archive, either on the
 * Discover page or the Explore page, or as the archive preview in the
 * contribution page.
 *
 * @param {object} props - Props
 * @param {ArchiveType} props.archive - Archive object to display
 * @param {ImageMeta[]} props.imageMetas - Image metadata for the archive,
 *    provided in an array
 * @param {string} props.imageSrc - Image source for the archive's images.
 *    Right now this is only really needed by the contribution preview.
 * @param {ArchiveType[]} props.similarArchives- Similar archive objects to
 *    display, provided in an array which may be empty or null.
 * @returns {JSX.Element}
 */
const Archive = ({ archive, imageMetas, imageSrc, similarArchives }) => {


  const getImages = () => {
      const thumbImage = imageMetas.filter(
      (image) => image.img_id === archive.thumb_img_id
        );
      const remainingImages = imageMetas.filter(
          (image) => image.img_id !== archive.thumb_img_id
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
    }, [archive]);

  const getShopName = () => {

        if (archive.shop_name['content']) {
            return archive.shop_name['content']
        } else if (arhive.shop_name['content_orig']) {
            return archive.shop_name['content_orig']
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
                return <p>{currentMetaData.caption}</p>
            } else if (currentMetaData.type.length === 1) {
                if (viewSet.has(currentMetaData.type[0])) {
                    return <p>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} view of {getShopName()}. </p>
                } else if (currentMetaData.type[0] === "crafts" || currentMetaData.type[0] === "craft") {
                    return <p>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} produced by {getShopName()}</p>
                } else if (currentMetaData.type[0] === "craftsperson") {
                    return <p>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} of {getShopName()}</p>
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
                    return <p>Craftsperson in front of {getShopName()}.</p>
                } else if (craftspersonIndex>-1 && indoorMap.indexOf(true)>-1) {
                    return <p>Craftsperson inside {getShopName()}.</p>
                } else if (craftMap.indexOf(true)>-1 && indoorMap.indexOf(true)>-1) {
                    return <p>Crafts produced in {getShopName()}.</p>
                } else if (craftMap.indexOf(true)>-1 && currentMetaData.type.indexOf('storefront')>-1) {
                    return <p>Crafts displayed in storefront of {getShopName()}.</p>
                }

            }
        }
    }




  const showImages = () => {

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
              handleScroll={onScroll}
            />
          )}
        </div>
      </div>
      <div className="card__item">
        <div className="container__preview-content">
          <div className="container__text">
            <div className="container__title">
              <h1>
                {archive.shop_name.content || archive.shop_name.content_orig}
              </h1>
              <p className="type">
                {archive.craft_discipline_category.join(' | ')}
              </p>
            </div>
            <div>
              {getCaption()}
            </div>
          </div>
          <div className="container__map">
            <p>See it on map</p>
            <div className="map">
              <MiniMap workshop={archive} type={'archive'}/>
            </div>

          </div>
          <div className="container__suggestion">
            <p>Explore similar images</p>
            <div className="parent">
              <Slider>
                {similarArchives?.map((image) => (
                  <div key={image.ID} className="container__img">
                    <ImagePreview workshop={image} />
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

export default Archive;
