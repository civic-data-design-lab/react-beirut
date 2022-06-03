import React, { useEffect } from "react";
import Slider from "../Slider";
import MapCardSlider from "./MapCardSlider";
import { useMediaQuery } from 'react-responsive'


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
            mainSliderStyle : {
            'sliderContainer': 'mapSlider-container',
            'buttonLabel': 'slider-btn-label',
            'prevButton': 'btn-prev',
            'nextButton': 'btn-next',
            'wrapperContainer': 'mapSlider-wrapper'
            }
        }

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



    componentDidMount() {
        if (this.props.type === "workshop") {
            this.fetchSimilarWorkshops();
        } else {
            this.fetchSimilarArchives();
        }
    }

    componentDidUpdate(prevProps) {
     if (prevProps.workshop.ID !== this.props.workshop.ID) {
       if (this.props.type === "workshop") {
            this.fetchSimilarWorkshops();
        } else {
            this.fetchSimilarArchives();
        }
     }
   }


    clickExplore = (e) => {
        //console.log(e.target)
        this.props.openMapCard(e.target.id, this.props.type)


    }


    getShopName = () => {

        if (this.props.workshop.shop_name['content']) {
            return this.props.workshop.shop_name['content']
        } else if (this.props.workshop.shop_name['content_orig']) {
            return this.props.workshop.shop_name['content_orig']
        } else {
            return 'No Shop Name'
        }
    }

    getReferenceName = () => {
        return this.props.workshop.reference.name;
    }

    getDecadeEstablished = () => {
        if (!this.props.workshop.decade_established) {
            return null
        }
        console.log(this.props.type)

        if (this.props.workshop.decade_established[0]) {
            return `EST ${this.props.workshop.decade_established[0]} | `
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
                        otherList.push(other)
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
                    if (otherList.indexOf(craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase()<0))
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
        //console.log('getting images ', this.props.workshop.images)
       //let slider = document.getElementsByClassName()

        return this.props.workshop.images.map((image) => {return <img key={image} className={'mapCard-img'} src={`/api/images/${image}.jpg`} alt="img" />})

    }

    getThumbnails = () => {



        return this.state.similarObjects.map((object) => {
            console.log(object.thumb_img_id)
            //const coords = [workshop.location.geo['lng'], workshop.location.geo['lat']]
            //return <div className={'exploreShop-div'}><img src={`/api/images/${workshop.thumb_img_id}.jpg`} className={'exploreShops-img'} key={workshop.thumb_img_id}/></div>

            if (object.thumb_img_id) {
                return(
                <div className={"exploreShops-div"}>
                <img src={`/api/images/${object.thumb_img_id}.jpg`} className={'exploreShops-img'} id={object.ID}  key={object.thumb_img_id} onClick={this.clickExplore}/>
                <div className={'exploreShop-name'}>
                    <p>{object.shop_name['content'] || object.shop_name['content_orig'] }</p>
                </div>
            </div> )

            } else {
                return null
            }



        })

    }

    getCaption = (metaData) => {
        //this.setState({caption: metaData})
        return null;
    }


    createMapCardContent = () => {

        if (this.props.type === "workshop") {
            return (
                <div className={'mapCard'} id={`mapCard${this.props.id}`}>

                        <div className={'close-btn-container'}>

                            <button className={'close-card-btn'} onClick = {this.props.closeMapCard} > X </button>
                        </div>

                        <p>{this.getShopName()}</p>

                        <div>
                            <p>{this.getDecadeEstablished()}
                            {this.getSubtitle()}
                        </p>

                        </div>

                        {(this.props.workshop.images.length !== 0) ?
                            <>
                            <div className={'mapCard-slider-container'} >
                                <MapCardSlider children={this.getImages()} sliderStyle={this.state.mainSliderStyle} getImageData={this.getCaption()}/>
                            </div>
                            <div>
                            <p> caption </p>
                            </div>
                            </>
                            : null}




                        <hr/>
                    {this.state.similarObjects ? (this.getThumbnails().length>0 ? <>
                            <p>Explore Similar Images</p>
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

                            <button className={'close-card-btn'} onClick = {this.props.closeMapCard} > X </button>
                        </div>

                        <p>{this.getShopName() || this.getReferenceName()}</p>

                        <div>
                            <p>{this.getPrimaryDecade()} {this.getSubtitle()}</p>


                        </div>

                        {(this.props.workshop.images.length !== 0) ?
                            <>
                            <div className={'mapCard-slider-container'} >
                                <MapCardSlider children={this.getImages()} sliderStyle={this.state.mainSliderStyle} getImageData={this.getCaption()}/>
                            </div>

                            <div>
                            <p> caption </p>
                            </div>
                            </>
                            : null}




                        <hr/>
                        {this.state.similarObjects ? (this.getThumbnails().length>0 ? <>
                            <p>Explore Similar Images</p>
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







