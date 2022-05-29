import React from "react";



export default class MapCardSlider extends React.Component {

    constructor(props) {
        super(props);
    }

    scrollLeft = () => {
        const container = document.querySelector('.mapSlider-container');
        const wrapper = container.querySelector('.mapSlider-wrapper');
        const nextBtn = container.querySelector('.btn-next');
        const prevBtn = container.querySelector('.btn-prev');
        const itemWidth = container.querySelector('.mapCard-img').clientWidth;
        wrapper.scrollBy({left: -itemWidth, top: 0, behavior: 'smooth'});
    }

    scrollRight = () => {
        const container = document.querySelector('.mapSlider-container');
        const wrapper = container.querySelector('.mapSlider-wrapper');
        const nextBtn = container.querySelector('.btn-next');
        const prevBtn = container.querySelector('.btn-prev');
        const itemWidth = container.querySelector('.mapCard-img').clientWidth;
        wrapper.scrollBy({left: itemWidth, top: 0, behavior: 'smooth'});

    }


    render () {
        console.log("styling ", this.props.sliderStyle)
        return (
            <>
                <div className={this.props.sliderStyle['sliderContainer']}>

                    <button className={this.props.sliderStyle['prevButton']} onClick={this.scrollLeft}><span className={this.props.sliderStyle['buttonLabel']}>&lt;</span></button>

                    <div className={this.props.sliderStyle['wrapperContainer']}>
                        {this.props.children}
                    </div>
                    <button className={this.props.sliderStyle['nextButton']} onClick={this.scrollRight}><span className={this.props.sliderStyle['buttonLabel']}>&gt;</span></button>
                </div>

            </>
        )
    }







}



