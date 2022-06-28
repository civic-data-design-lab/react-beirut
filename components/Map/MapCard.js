import React, {useEffect, useState} from "react";
import Slider from "../Slider";
import MapCardSlider from "./MapCardSlider";
import { useMediaQuery } from 'react-responsive'
import Draggable from "react-draggable";




const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 687, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 688 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

import {TRANSLATIONS} from "../../lib/utils";

import { Trans, useTranslation} from "react-i18next";





// assumes workshop or archive is passed in as a prop
const MapCard = ({workshop, type, id, closeMapCard, openMapCard, i18n}) => {

    const { t } = useTranslation();

    const [caption, setCaption] = useState(null);
    //const [workshop, setWorkshop] = useState(null);
    const [similarObjects, setSimilarObjects] = useState(null);
    const [imageMetaData, setImageMetaData] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [invalidImages, setInvalidImages] = useState([]);
    const [validImages, setValidImages] = useState([]);
    const mainSliderStyle = {
            'sliderContainer': 'mapSlider-container',
            'buttonLabel': 'slider-btn-label',
            'prevButton': 'btn-prev',
            'nextButton': 'btn-next',
            'wrapperContainer': 'mapSlider-wrapper'
            }


    const onScroll = () => {
        const slider = document.querySelector('.mapCard-slider-container')
        const firstImage = document.querySelector('.mapCard-img')
        const parentPos = slider.getBoundingClientRect()
        const childPos = firstImage.getBoundingClientRect()
        const relativePos = parentPos.left - childPos.left;
        const parentWidth = parentPos.width;
        if (i18n.language === "en") {
            setCurrentImageIndex(Math.round(relativePos/parentWidth));
        } else {
            setCurrentImageIndex(-(Math.round(relativePos/parentWidth)));
            // console.log(currentImageIndex)
        }
    }




    const fetchSimilarWorkshops = async() => {
        const response = await fetch(`api/similarWorkshops/${workshop.ID}`);
        const res = await response.json();
        setSimilarObjects(res['response']);
        //const crafts = await fetch('api/craftTypes');
    }

    const fetchSimilarArchives = async() => {
        const response = await fetch(`api/similarArchives/${workshop.ID}`);
        const res = await response.json();
        setSimilarObjects(res['response']);
    }

    const fetchImageMetaData = async() => {

        const thumbImage = workshop.images.filter(
            (image) => image.img_id === workshop.thumb_img_id);
        const remainingImages = workshop.images.filter(
            (image) => image.img_id !== workshop.thumb_img_id
        );
        const images = [...thumbImage, ...remainingImages];
        let validImages=[]
        let metaData = []

        for (const image_id of images) {
                 const imageResponse = await fetch(`api/images/${image_id}`)
                 if (imageResponse.status !== 404) {
                     const response = await fetch(`api/imageMetaData/${image_id}`)
                     const res = await response.json()
                     metaData.push(res['response'][0])
                     validImages.push(image_id)

                 }
             }
        setImageMetaData(metaData);
        setValidImages(validImages)
        //this.setState({imageMetaData:metaData, validImages:validImages})
        //console.log("metadata ", this.state.imageMetaData)
    }

    const getCaption = () => {
        //console.log('current images image metadata ', this.state.imageMetaData[this.state.currentImageIndex])
        //return <p>{this.state.currentImageIndex}</p>
        //let imageContainer = document.querySelector('.mapSlider-wrapper');
        //return (<p>{imageContainer.offsetWidth}</p>)

        //if (this.state.invalidImages.indexOf(this.state.currentImageIndex)>-1) {
        //    return <p>Image unavailable</p>
        //}

        const currentMetaData = imageMetaData[currentImageIndex]

        // console.log('image metaData ', imageMetaData[currentImageIndex])

        const viewKeywords = ["storefront", "street", "interior", "indoor"];
        const interiorKeywords = ["interior", "inside", "indoor"]
        const viewSet = new Set(viewKeywords);

        if (currentMetaData) {
            if (currentMetaData.caption) {
                return <p className={'object-caption'}>{currentMetaData.caption}</p>
            } else if (currentMetaData.type.length === 1) {
                if (viewSet.has(currentMetaData.type[0])) {
                    if (currentMetaData.type[0] === 'street') {
                        let arabic = t('Street view of ')
                        let interpolated = arabic.replace('X', t(getShopName()))
                        return <p>{interpolated}</p>
                    }
                    // console.log('currentMetaData ', currentMetaData.type[0])
                    // console.log('translation ', t(currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase() + ' view of '))
                    return <p className={'object-caption'}>{t(currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase() + ' view of ')} {getShopName()}</p>
                } else if (currentMetaData.type[0] === "crafts" || currentMetaData.type[0] === "craft") {
                    return <p className={'object-caption'}>{t(currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase() + ' produced by ')} {getShopName()}</p>
                } else if (currentMetaData.type[0] === "craftsperson") {
                    return <p className={'object-caption'}>{t(currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase() + ' of ')} {getShopName()}</p>
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
                    return <p className={'object-caption'}>{t('Craftsperson in front of ')} {getShopName()}</p>
                } else if (craftspersonIndex>-1 && indoorMap.indexOf(true)>-1) {
                    return <p className={'object-caption'}> {t('Craftsperson inside ')} {getShopName()}</p>
                } else if (craftMap.indexOf(true)>-1 && indoorMap.indexOf(true)>-1) {
                    return <p className={'object-caption'}>{t('Crafts produced in ')} {getShopName()}</p>
                } else if (craftMap.indexOf(true)>-1 && currentMetaData.type.indexOf('storefront')>-1) {
                    return <p className={'object-caption'}>{t('Crafts displayed in storefront of ')} {getShopName()}</p>
                }

            }
        }
    }


    useEffect(()=>{
        //window.addEventListener('resize', this.updateDimensions);
        setInvalidImages([])
        if (type === "workshop") {
            fetchSimilarWorkshops();
        } else {
            fetchSimilarArchives();
        }

        if (workshop.images) {
           fetchImageMetaData()
        }
    }, [])

    useEffect(()=>{

        setInvalidImages([])
         if (type === "workshop") {
             fetchSimilarWorkshops();
         } else {
             fetchSimilarArchives();
         }

         if (workshop.images) {
             fetchImageMetaData()
             //console.log("metaData ", metaData)
         }
    }, [workshop])



    const clickExplore = (e) => {
        openMapCard(e.target.id, type)
    }


    const getShopName = () => {

        console.log("workshop name object ", workshop.shop_name)

        if (workshop.shop_name['content']) {
            return workshop.shop_name['content']
        } else if (workshop.shop_name['content_orig']) {
            return workshop.shop_name['content_orig']
        } else {
            return t("Craft Shop (No name provided)")
        }
    }

    const getReferenceName = () => {
        return workshop.reference.name;
    }

    const getDecadeEstablished = () => {
        if (!workshop.decade_established) {
            return null
        }
        //console.log(this.props.type)

        if (workshop.decade_established[0]) {
            return t('Established ') + `${workshop.decade_established[0]} | `
        } else {
                return null
            }
        }

    const getPrimaryDecade = () => {
        if (!workshop.primary_decade) {
            return null
        }

        if (workshop.primary_decade[0]) {
            return t('Captured') + ` ${workshop.primary_decade[0]} | `
        } else {
            return null
        }

        }

    const getSubtitle = () => {
        let craftsList = []
        let otherList = []
        workshop.craft_discipline.forEach(craft =>
            {
            if (craft.toUpperCase() === "OTHER") {
                if (workshop.craft_discipline_other && workshop.craft_discipline_other.length>0) {
                    workshop.craft_discipline_other.map((craftOther)=>{
                        const other = craftOther.charAt(0).toUpperCase() + craftOther.slice(1).toLowerCase()
                        if (craftsList.indexOf(other) < 0) {
                            otherList.push(craftOther.toLowerCase())
                        if (craftsList.length < 1) {
                            craftsList.push(t(other))
                        } else {
                            craftsList.push(" | " + t(other))
                        }
                    }
                    })
                }
            } else {
                const craftStr = craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase();
                if (craftsList.length<1) {
                    craftsList.push(t(craftStr));
                } else {
                    //console.log("subtitle debug ", craftsList, otherList, craft.toLowerCase())
                    //console.log(otherList.indexOf(craft.toLowerCase()))
                    if (otherList.indexOf(craft.toLowerCase())<0) {
                    craftsList.push(" | " + t(craftStr))}
                }
            }
        }
        )
        return craftsList
 }

    const handleOnError = (e) => {

        let el = e.target
        console.log("key ", el.id)
        //let newInvImgs = this.state.invalidImages
        //newInvImgs.push(el.id)
        //this.setState({invalidImages: newInvImgs})
        //console.log("invalidImages ", this.state.invalidImages)
        //el.parentNode.removeChild(el)
        //el.src = '';
        el.classList.add('broken-img')
        //el.src = 'broken_img.png'
        el.onerror = null;
        el.alt = "Image Unavailable";
        el.title = "Image Unavailable";
        //console.log("metadata ", this.state.imageMetaData)



    }




    const getImages = () => {

        if (!workshop.images) {
            return
        }
        const thumbImage = workshop.images.filter(
            (image) => image.img_id === workshop.thumb_img_id);
        const remainingImages = workshop.images.filter(
            (image) => image.img_id !== workshop.thumb_img_id
        );
        const images = [...thumbImage, ...remainingImages];
        //console.log('images ', images)
        return images.map((image, index) => {return <img key={image} id={index} className={'mapCard-img'} src={`/api/images/${image}.jpg`} alt="img" onError={handleOnError} />})

    }

    const getThumbnails = () => {
        return similarObjects.map((object) => {
            //console.log(object.thumb_img_id)
            //const coords = [workshop.location.geo['lng'], workshop.location.geo['lat']]
            //return <div className={'exploreShop-div'}><img src={`/api/images/${workshop.thumb_img_id}.jpg`} className={'exploreShops-img'} key={workshop.thumb_img_id}/></div>



            if (object.thumb_img_id) {
                return(

                <img src={`/api/images/${object.thumb_img_id}.jpg`} className={'exploreShops-img'} id={object.ID}  key={object.thumb_img_id} onClick={clickExplore} onError={handleOnError}/>)

            } else {
                return null
            }
        })
    }






    const createMapCardContent = () => {

        if (type === "workshop") {
            return (
                <>


                        <div className={'close-btn-container'}>
                            <div>
                                <p className={'shopName-text'}>{getShopName() || "Craft Shop (No name provided)"}</p>
                                <p className={'shopSubtitle-text'}>{getDecadeEstablished()} {getSubtitle()} </p>
                            </div>

                            <button className={'close-card-btn close-mapcard'} onClick = {closeMapCard} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                                </svg>
                            </button>
                        </div>





                        {(workshop.images.length !== 0) ?
                            <>
                            <div className={'mapCard-slider-container'} >
                                <MapCardSlider handleScroll={onScroll} children={getImages()} sliderStyle={mainSliderStyle} getImageData={getCaption()}/>
                            </div>
                            <div>
                                {getCaption()}
                            </div>
                            </>
                            : null}

                        <hr/>
                    {similarObjects ? (getThumbnails().length>0 ? <>
                            <p className={'exploreShops-label'}>{t('Explore Similar Shops')}</p>
                            <div className={'exploreContainer'}>
                                {similarObjects ? <Slider children={getThumbnails()}/> : null}
                            </div>
                        </> : null ) : null
                    }
               </>
            )
        } else {
            return (
                <>


                        <div className={'close-btn-container'}>
                            <div>
                                <p className={'shopName-text'}>{getShopName() || "Craft Shop (No name provided)"}</p>
                                <p className={'shopSubtitle-text'}>{getPrimaryDecade()} {getSubtitle()} </p>
                            </div>

                            <button className={'close-card-btn close-mapcard'} onClick = {closeMapCard} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                                </svg>
                            </button>


                        </div>

                        {(workshop.images.length !== 0) ?
                            <>
                            <div className={'mapCard-slider-container'} >
                                <MapCardSlider children={getImages()} sliderStyle={mainSliderStyle}/>
                            </div>

                            <div>
                                {getCaption()}
                            </div>
                            </>
                            : null}

                        <hr/>
                        {similarObjects ? (getThumbnails().length>0 ? <>
                            <p className={'exploreShops-label'}>{t('Explore Similar Images')}</p>
                            <div className={'exploreContainer'}>
                                {similarObjects ? <Slider children={getThumbnails()}/> : null}
                            </div>
                        </> : null ) : null
                    }
                </>
            )
        }
    }



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

                                <Draggable axis="y" bounds={".mapCard-drag-container"}>
                                    <div className={'mapCard'} id={`mapCard${id}`}>
                                    <div className={'mapCard-dragger'}>
                                        <svg width="24" height="4" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="1.5" y1="2.26367" x2="22.5" y2="2.26367" stroke="#CFCFCF" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                    </div>
                                    {workshop && createMapCardContent()}
                                        </div>
                                </Draggable>

                            </div>

                </Mobile>

            </>
        )

}
export default MapCard







