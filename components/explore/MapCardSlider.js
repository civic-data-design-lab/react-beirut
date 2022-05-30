import React from "react";



export default class MapCardSlider extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.getImageData) {
            this.props.getImageData('arrived')
        }


    }

    scrollLeft = () => {
        const container = document.querySelector('.mapSlider-container');
        const wrapper = container.querySelector('.mapSlider-wrapper');
        const nextBtn = container.querySelector('.btn-next');
        const prevBtn = container.querySelector('.btn-prev');
        const itemWidth = container.querySelector('.mapCard-img').clientWidth;
        wrapper.scrollBy({left: -itemWidth, top: 0, behavior: 'smooth'});
        if (this.props.getImageData) {
            this.props.getImageData('bye')
        }
    }

    scrollRight = () => {
        const container = document.querySelector('.mapSlider-container');
        const wrapper = container.querySelector('.mapSlider-wrapper');
        const nextBtn = container.querySelector('.btn-next');
        const prevBtn = container.querySelector('.btn-prev');
        const itemWidth = container.querySelector('.mapCard-img').clientWidth;
        wrapper.scrollBy({left: itemWidth, top: 0, behavior: 'smooth'});

        if (this.props.getImageData) {
            this.props.getImageData('hi')
        }

    }


    render () {
        console.log("styling ", this.props.sliderStyle)
        return (
            <>
                <div className={this.props.sliderStyle['sliderContainer']}>

                    {(this.props.children.length>0) ? <button className={this.props.sliderStyle['prevButton']} onClick={this.scrollLeft}><span className={this.props.sliderStyle['buttonLabel']}>&lt;</span></button> : null}

                    <div className={this.props.sliderStyle['wrapperContainer']}>
                        {this.props.children}
                    </div>
                    {(this.props.children.length>0) ? <button className={this.props.sliderStyle['nextButton']} onClick={this.scrollRight}><span className={this.props.sliderStyle['buttonLabel']}>&gt;</span></button> : null}
                </div>

            </>
        )
    }







}



