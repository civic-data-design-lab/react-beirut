import React, { useEffect } from "react";
import Slider from "../Slider";
import MapCardSlider from "./MapCardSlider";




// assumes workshop or archive is passed in as a prop
export default class MapCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            caption: null,
            workshop : null,
            similarWorkshops: null,
            mainSliderStyle : {
            'sliderContainer': 'mapSlider-container',
            'buttonLabel': 'slider-btn-label',
            'prevButton': 'btn-prev',
            'nextButton': 'btn-next',
            'wrapperContainer': 'mapSlider-wrapper'
            }
        }

    }



    getShopName = () => {

        if (this.props.workshop.shop_name['content']) {
            return this.props.workshop.shop_name['content']
        } else if (this.props.workshop.shop_name['content_orig']) {
            return this.props.workshop.shop_name['content_orig']
        } else {
            return 'No Shop Name'
        }

        //this.props.workshop.shop_name['content'] ? this.props.workshop.shop_name['content'] : (this.props.workshop.shop_name['content_orig'] ? this.props.workshop.shop_name['content_orig'] : 'No Shop Name')
    }

    getDecadeEstablished = () => {
        if (!this.props.workshop.decade_established) {
            return 'EST ???? '
        }
        if (this.props.workshop.decade_established[0]) {
            return `EST ${this.props.workshop.decade_established[0]} `}
        else {
            return 'EST ???? '
        }
    }

    getImages = () => {

        if (!this.props.workshop.images) {
            return
        }
        console.log('getting images ', this.props.workshop.images)
       //let slider = document.getElementsByClassName()

        let images = this.props.workshop.images.map((image) => (
            <img key={image} className={'mapCard-img'} src={`/api/images/${image}.jpg`} alt="img" />))
        return images
    }

    getThumbnails = () => {
        if (!this.state.similarWorkshops) {
            return
        }

        let thumbNails = this.state.similarWorkshops.map((simWorks) => (
            <img key={simWorks.thumb_img_id} className={'mapCard-img'} src={`/api/images/${simWorks.thumb_img_id}.jpg`} alt="img" />
        ))
        return thumbNails
    }

    getCaption = (metaData) => {
        this.setState({caption: metaData})
    }


    createMapCardContent = () => {

        if (this.props.type === "workshop") {
            return (
                <div className={'mapCard'} id={`mapCard${this.props.id}`}>

                        <div className={'searchby-section'}>
                            <p>{this.getShopName()}</p>
                            <button onClick = {this.props.closeMapCard} className={'close-filter-btn'}> X </button>
                        </div>



                        <p>{this.getDecadeEstablished()}
                            {this.props.workshop.craft_discipline.map((craft) => {
                            if (craft.toUpperCase() === "OTHER") {
                                return null
                            } else {
                                return "| " + craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase() + " ";
                            }
                        })} </p>

                        {(this.props.workshop.images.length !== 0) ? <MapCardSlider children={this.getImages()} sliderStyle={this.state.mainSliderStyle} getImageData={this.getCaption}/>:null}

                        <p>{this.state.caption}</p>

                        <hr/>
                        <p>Explore Similar Shops</p>





                </div>
            )
        } else {
            return (
                <div className={'mapCard'} id={`mapCard${this.props.id}`}>
                    <button onClick = {this.props.closeMapCard}> close mapCard </button>
                    archive type </div>
            )
        }
    }



    render() {
        console.log("mapcard images ", this.props.workshop)


        const yearEST = 1950
        const specificCategory = 'Metal'

        return (
            <>
                {this.props.workshop && this.createMapCardContent()}

            </>
        )
    }
}






