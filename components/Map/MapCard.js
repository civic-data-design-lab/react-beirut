import React, { useEffect } from "react";
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

import i18n from "i18next";
import { Trans, useTranslation, initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Explore Similar Shops": "Explore Similar Shops"
        }
      },
      ar: {
        translation: {
            "Explore Similar Shops": "اكتشف المحلات المشابهة"
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });



// assumes workshop or archive is passed in as a prop
export default class MapCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            caption: null,
            workshop : null,
            similarObjects: null,
            imageMetaData: [],
            currentImageIndex: 0,
            invalidImages: [],
            mainSliderStyle : {
            'sliderContainer': 'mapSlider-container',
            'buttonLabel': 'slider-btn-label',
            'prevButton': 'btn-prev',
            'nextButton': 'btn-next',
            'wrapperContainer': 'mapSlider-wrapper'
            }
        }

    }

    onScroll = () => {
        const slider = document.querySelector('.mapCard-slider-container')
        const firstImage = document.querySelector('.mapCard-img')
        const parentPos = slider.getBoundingClientRect()
        const childPos = firstImage.getBoundingClientRect()
        const relativePos = parentPos.left - childPos.left;
        const parentWidth = parentPos.width;
        this.setState({  currentImageIndex: Math.round(relativePos/parentWidth)});
        //console.log(" index ", this.state.currentImageIndex)
    }




    async fetchSimilarWorkshops() {
    const response = await fetch(`api/similarWorkshops/${this.props.workshop.ID}`);
    const res = await response.json();
    this.setState({similarObjects:res['response']});
    }

    async fetchSimilarArchives() {
        const response = await fetch(`api/similarArchives/${this.props.workshop.ID}`);
        const res = await response.json();
        this.setState({similarObjects:res['response']});
    }

    async fetchImageMetaData() {

        const thumbImage = this.props.workshop.images.filter(
            (image) => image.img_id === this.props.workshop.thumb_img_id);
        const remainingImages = this.props.workshop.images.filter(
            (image) => image.img_id !== this.props.workshop.thumb_img_id
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
        this.setState({imageMetaData:metaData, validImages:validImages})
        //console.log("metadata ", this.state.imageMetaData)
    }

    getCaption = () => {
        //console.log('current images image metadata ', this.state.imageMetaData[this.state.currentImageIndex])
        //return <p>{this.state.currentImageIndex}</p>
        //let imageContainer = document.querySelector('.mapSlider-wrapper');
        //return (<p>{imageContainer.offsetWidth}</p>)

        //if (this.state.invalidImages.indexOf(this.state.currentImageIndex)>-1) {
        //    return <p>Image unavailable</p>
        //}

        const currentMetaData = this.state.imageMetaData[this.state.currentImageIndex]


        //console.log("metadata ", currentMetaData)
        const viewKeywords = ["storefront", "street", "interior", "indoor"];
        const interiorKeywords = ["interior", "inside", "indoor"]
        const viewSet = new Set(viewKeywords);

        if (currentMetaData) {
            if (currentMetaData.caption) {
                return <p>{currentMetaData.caption}</p>
            } else if (currentMetaData.type.length === 1) {
                if (viewSet.has(currentMetaData.type[0])) {
                    return <p>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} view of {this.getShopName() || "shop"}. </p>
                } else if (currentMetaData.type[0] === "crafts" || currentMetaData.type[0] === "craft") {
                    return <p>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} produced by {this.getShopName() || "shop"}.</p>
                } else if (currentMetaData.type[0] === "craftsperson") {
                    return <p>{currentMetaData.type[0].charAt(0).toUpperCase() + currentMetaData.type[0].slice(1).toLowerCase()} of {this.getShopName() || "shop"}.</p>
                } else if (currentMetaData.type[0] === "text") {
                    return <p>Text</p>
                }
            } else if (currentMetaData.type.length === 2) {
                let craftspersonIndex = currentMetaData.type.indexOf("craftsperson")
                if (craftspersonIndex>-1) {
                    craftspersonIndex = currentMetaData.type.indexOf("craftperson")
                }

                const storefrontIndex = currentMetaData.type.indexOf("storefront")
                const indoorMap = interiorKeywords.map((word)=> {
                    return currentMetaData.type.indexOf(word)>-1
                })

                const craftMap = ["crafts", "craft"].map((word) => {
                    return currentMetaData.type.indexOf(word)>-1
                })
                if (craftspersonIndex>-1 && storefrontIndex>-1) {
                    return <p>Craftsperson in front of {this.getShopName()|| "shop"}.</p>
                } else if (craftspersonIndex>-1 && indoorMap.indexOf(true)>-1) {
                    return <p>Craftsperson inside {this.getShopName()|| "shop"}.</p>
                } else if (craftMap.indexOf(true)>-1 && indoorMap.indexOf(true)>-1) {
                    return <p>Crafts produced in {this.getShopName()|| "shop"}.</p>
                } else if (craftMap.indexOf(true)>-1 && currentMetaData.type.indexOf('storefront')>-1) {
                    return <p>Crafts displayed in storefront of {this.getShopName()|| "shop"}.</p>
                }

            }
        }
    }



    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.setState({invalidImages:[]})
        if (this.props.type === "workshop") {
            this.fetchSimilarWorkshops();
        } else {
            this.fetchSimilarArchives();
        }

        if (this.props.workshop.images) {
           this.fetchImageMetaData()
        }
    }

    componentDidUpdate(prevProps) {
     if (prevProps.workshop.ID !== this.props.workshop.ID) {

         this.setState({invalidImages:[]})
         if (this.props.type === "workshop") {
             this.fetchSimilarWorkshops();
         } else {
             this.fetchSimilarArchives();
         }

         if (this.props.workshop.images) {
             this.fetchImageMetaData()
             //console.log("metaData ", metaData)
         }
     }
   }

   componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
   }


    clickExplore = (e) => {
        this.props.openMapCard(e.target.id, this.props.type)
    }


    getShopName = () => {

        if (this.props.workshop.shop_name['content']) {
            return this.props.workshop.shop_name['content']
        } else if (this.props.workshop.shop_name['content_orig']) {
            return this.props.workshop.shop_name['content_orig']
        } else {
            return null
        }
    }

    getReferenceName = () => {
        return this.props.workshop.reference.name;
    }

    getDecadeEstablished = () => {
        if (!this.props.workshop.decade_established) {
            return null
        }
        //console.log(this.props.type)

        if (this.props.workshop.decade_established[0]) {
            return `EST. ${this.props.workshop.decade_established[0]} | `
        } else {
                return null
            }
        }

    getPrimaryDecade = () => {
        if (!this.props.workshop.primary_decade) {
            return null
        }

        if (this.props.workshop.primary_decade[0]) {
            return `Taken ${this.props.workshop.primary_decade[0]} | `
        } else {
            return null
        }

        }

    getSubtitle = () => {
        let craftsList = []
        let otherList = []
        this.props.workshop.craft_discipline.forEach(craft =>
            {
            if (craft.toUpperCase() === "OTHER") {
                if (this.props.workshop.craft_discipline_other && this.props.workshop.craft_discipline_other.length>0) {
                    this.props.workshop.craft_discipline_other.map((craftOther)=>{
                        const other = craftOther.charAt(0).toUpperCase() + craftOther.slice(1).toLowerCase()
                        if (craftsList.indexOf(other) < 0) {
                            otherList.push(craftOther.toLowerCase())
                        if (craftsList.length < 1) {
                            craftsList.push(other)
                        } else {
                            craftsList.push(" | " + other)
                        }
                    }
                    })
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

    handleOnError = (e) => {

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
        console.log("metadata ", this.state.imageMetaData)



    }




    getImages = () => {

        if (!this.props.workshop.images) {
            return
        }
        const thumbImage = this.props.workshop.images.filter(
            (image) => image.img_id === this.props.workshop.thumb_img_id);
        const remainingImages = this.props.workshop.images.filter(
            (image) => image.img_id !== this.props.workshop.thumb_img_id
        );
        const images = [...thumbImage, ...remainingImages];
        console.log('images ', images)
        return images.map((image, index) => {return <img key={image} id={index} className={'mapCard-img'} src={`/api/images/${image}.jpg`} alt="img" onError={this.handleOnError} />})

    }

    getThumbnails = () => {
        return this.state.similarObjects.map((object) => {
            //console.log(object.thumb_img_id)
            //const coords = [workshop.location.geo['lng'], workshop.location.geo['lat']]
            //return <div className={'exploreShop-div'}><img src={`/api/images/${workshop.thumb_img_id}.jpg`} className={'exploreShops-img'} key={workshop.thumb_img_id}/></div>


            if (object.thumb_img_id) {
                return(

                <img src={`/api/images/${object.thumb_img_id}.jpg`} className={'exploreShops-img'} id={object.ID}  key={object.thumb_img_id} onClick={this.clickExplore} onError={this.handleOnError}/>)

            } else {
                return null
            }
        })
    }






    createMapCardContent = () => {

        if (this.props.type === "workshop") {
            return (
                <>


                        <div className={'close-btn-container'}>
                            <div>
                                <p className={'shopName-text'}>{this.getShopName() || "Craft Shop (No name provided)"}</p>
                                <p className={'shopSubtitle-text'}>{this.getDecadeEstablished()} {this.getSubtitle()} </p>
                            </div>

                            <button className={'close-card-btn close-mapcard'} onClick = {this.props.closeMapCard} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                                </svg>
                            </button>
                        </div>





                        {(this.props.workshop.images.length !== 0) ?
                            <>
                            <div className={'mapCard-slider-container'} >
                                <MapCardSlider handleScroll={this.onScroll} children={this.getImages()} sliderStyle={this.state.mainSliderStyle} getImageData={this.getCaption()}/>
                            </div>
                            <div>
                                {this.getCaption()}
                            </div>
                            </>
                            : null}

                        <hr/>
                    {this.state.similarObjects ? (this.getThumbnails().length>0 ? <>
                            <Trans><p className={'exploreShops-label'}>{t('Explore Similar Shops')}</p></Trans>
                            <div className={'exploreContainer'}>
                                {this.state.similarObjects ? <Slider children={this.getThumbnails()}/> : null}
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
                                <p className={'shopName-text'}>{this.getShopName() || "Craft Shop (No name provided)"}</p>
                                <p className={'shopSubtitle-text'}>{this.getPrimaryDecade()} {this.getSubtitle()} </p>
                            </div>

                            <button className={'close-card-btn close-mapcard'} onClick = {this.props.closeMapCard} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                                </svg>
                            </button>


                        </div>

                        {(this.props.workshop.images.length !== 0) ?
                            <>
                            <div className={'mapCard-slider-container'} >
                                <MapCardSlider children={this.getImages()} sliderStyle={this.state.mainSliderStyle}/>
                            </div>

                            <div>
                                {this.getCaption()}
                            </div>
                            </>
                            : null}

                        <hr/>
                        {this.state.similarObjects ? (this.getThumbnails().length>0 ? <>
                            <p className={'exploreShops-label'}>Explore Similar Images</p>
                            <div className={'exploreContainer'}>
                                {this.state.similarObjects ? <Slider children={this.getThumbnails()}/> : null}
                            </div>
                        </> : null ) : null
                    }
                </>
            )
        }
    }



    render() {

        const { t } = this.props;



        return (
            <>
                <Desktop>
                    <div className={'mapCard'} id={`mapCard${this.props.id}`}>
                    {this.props.workshop && this.createMapCardContent()}
                    </div>
                </Desktop>

                <Tablet>
                    <div className={'mapCard'} id={`mapCard${this.props.id}`}>
                    {this.props.workshop && this.createMapCardContent()}
                    </div>
                </Tablet>

                <Mobile>

                            <div className={'mapCard-drag-container'}>

                                <Draggable axis="y" bounds={".mapCard-drag-container"}>
                                    <div className={'mapCard'} id={`mapCard${this.props.id}`}>
                                    <div className={'mapCard-dragger'}>
                                        <svg width="24" height="4" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="1.5" y1="2.26367" x2="22.5" y2="2.26367" stroke="#CFCFCF" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                    </div>
                                    {this.props.workshop && this.createMapCardContent()}
                                        </div>
                                </Draggable>

                            </div>

                </Mobile>

            </>
        )
    }
}







