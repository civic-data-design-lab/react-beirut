import React, { useEffect } from "react";
import Slider from "../Slider";
import MapCardSlider from "./MapCardSlider";
import { useMediaQuery } from 'react-responsive'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";


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
        let metaData = []
        for (const image_id of images) {
                 const response = await fetch(`api/imageMetaData/${image_id}`)
                 const res = await response.json()
                 metaData.push(res['response'][0])
             }
        this.setState({imageMetaData:metaData})
        //console.log("metadata ", this.state.imageMetaData)
    }

    getCaption = () => {
        //console.log('current images image metadata ', this.state.imageMetaData[this.state.currentImageIndex])
        //return <p>{this.state.currentImageIndex}</p>
        //let imageContainer = document.querySelector('.mapSlider-wrapper');
        //return (<p>{imageContainer.offsetWidth}</p>)

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
                if (this.props.workshop.craft_discipline_other) {
                    const other = this.props.workshop.craft_discipline_other.charAt(0).toUpperCase() + this.props.workshop.craft_discipline_other.slice(1).toLowerCase()
                    if (craftsList.indexOf(other) < 0) {
                        otherList.push(this.props.workshop.craft_discipline_other.toLowerCase())
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
        return images.map((image) => {return <img key={image} className={'mapCard-img'} src={`/api/images/${image}.jpg`} alt="img" />})

    }

    getThumbnails = () => {
        return this.state.similarObjects.map((object) => {
            //console.log(object.thumb_img_id)
            //const coords = [workshop.location.geo['lng'], workshop.location.geo['lat']]
            //return <div className={'exploreShop-div'}><img src={`/api/images/${workshop.thumb_img_id}.jpg`} className={'exploreShops-img'} key={workshop.thumb_img_id}/></div>

            if (object.thumb_img_id) {
                return(

                <img src={`/api/images/${object.thumb_img_id}.jpg`} className={'exploreShops-img'} id={object.ID}  key={object.thumb_img_id} onClick={this.clickExplore}/>)

            } else {
                return null
            }
        })
    }






    createMapCardContent = () => {

        if (this.props.type === "workshop") {
            return (
                <div className={'mapCard'} id={`mapCard${this.props.id}`}>

                        <div className={'close-btn-container'}>
                            <div>
                                <p className={'shopName-text'}>{this.getShopName() || "Craft Shop (No name provided)"}</p>
                                <p className={'shopSubtitle-text'}>{this.getDecadeEstablished()} {this.getSubtitle()} </p>
                            </div>

                            <button className={'close-card-btn'} onClick = {this.props.closeMapCard} >
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
                            <p className={'exploreShops-label'}>Explore Similar Shops</p>
                            <div className={'exploreContainer'}>
                                {this.state.similarObjects ? <Slider children={this.getThumbnails()}/> : null}
                            </div>
                        </> : null ) : null
                    }
                </div>
            )
        } else {
            return (
                <div className={'mapCard'} id={`mapCard${this.props.id}`}>

                        <div className={'close-btn-container'}>
                            <div>
                                <p className={'shopName-text'}>{this.getShopName() || "Craft Shop (No name provided)"}</p>
                                <p className={'shopSubtitle-text'}>{this.getPrimaryDecade()} {this.getSubtitle()} </p>
                            </div>

                            <button className={'close-card-btn'} onClick = {this.props.closeMapCard} >
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
                </div>
            )
        }
    }



    render() {
        console.log("similarobjects ", this.state.similarObjects)



        return (
            <>
                <Desktop>
                    {this.props.workshop && this.createMapCardContent()}
                </Desktop>

                <Mobile>
                    <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                                {this.props.workshop && this.createMapCardContent()}
                            </div>
                          </div>
                    </div>
                </Mobile>

            </>
        )
    }
}







