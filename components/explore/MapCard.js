import React, { useEffect } from "react";
import Slider from "../Slider";
import ImagePreview from "../discover/ImagePreview";


// assumes workshop or archive is passed in as a prop
export default class MapCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workshop : null
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

        console.log('getting images')

        if (!this.props.workshop.images) {
            return
        }

        let images = this.props.workshop.images.map((image) => (
            <img className={'mapCard-img'} src={`/api/images/${image}.jpg`} alt="img" />))
        return images
    }


    createMapCardContent = () => {
        if (this.props.type === "workshop") {
            return (
                <div className={'mapCard'} id={`mapCard${this.props.id}`}>

                        <button onClick = {this.props.closeMapCard}> close mapCard </button>

                        <p>{this.props.id}</p>
                        <p>{this.getShopName()}</p>
                        <p>{this.getDecadeEstablished()}
                            {this.props.workshop.craft_discipline.map((craft) => {
                            if (craft.toUpperCase() === "OTHER") {
                                return null
                            } else {
                                return "| " + craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase() + " ";
                            }
                        })} </p>

                        <div className={'slider-section'}><Slider children={this.getImages()}/></div>

                        <hr/>
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






