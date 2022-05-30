import React, { createRef } from 'react';

export default class MapCardSlider extends React.Component {
  constructor(props) {
    super(props);

    // create a ref to store the DOM element
    this.sliderContainerRef = createRef();
    this.wrapperContainerRef = createRef();
    this.nextBtnRef = createRef();
    this.prevBtnRef = createRef();
  }

  scrollLeft = () => {
    const container = this.sliderContainerRef.current;
    const wrapper = this.wrapperContainerRef.current;
    const itemWidth = container.clientWidth;

    wrapper.scrollBy({ left: -itemWidth, top: 0, behavior: 'smooth' });

    if (this.props.getImageData) {
      this.props.getImageData('bye');
    }
  };

  scrollRight = () => {
    const container = this.sliderContainerRef.current;
    const wrapper = this.wrapperContainerRef.current;
    const itemWidth = container.clientWidth;

    wrapper.scrollBy({ left: itemWidth, top: 0, behavior: 'smooth' });

    if (this.props.getImageData) {
      this.props.getImageData('hi');
    }
  };

  checkIfScroll = () => {
    console.log('check');
  };

  render() {
    const { sliderStyle, children } = this.props;

    return (
      <>
        <div
          className={sliderStyle['sliderContainer']}
          ref={this.sliderContainerRef}
        >
          {children.length > 0 ? (
            <button
              className={sliderStyle['prevButton']}
              ref={this.prevBtnRef}
              onClick={this.scrollLeft}
            >
              <span className={sliderStyle['buttonLabel']}>&lt;</span>
            </button>
          ) : null}

          <div
            className={sliderStyle['wrapperContainer']}
            ref={this.wrapperContainerRef}
          >
            {children}
          </div>
          {children.length > 0 ? (
            <button
              className={`${sliderStyle['nextButton']}`}
              onClick={this.scrollRight}
              ref={this.nextBtnRef}
            >
              <span className={sliderStyle['buttonLabel']}>&gt;</span>
            </button>
          ) : null}
        </div>
      </>
    );
  }
}
