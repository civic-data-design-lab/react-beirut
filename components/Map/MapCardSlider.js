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
  };

  scrollRight = () => {
    const container = this.sliderContainerRef.current;
    const wrapper = this.wrapperContainerRef.current;
    const itemWidth = container.clientWidth;

    wrapper.scrollBy({ left: itemWidth, top: 0, behavior: 'smooth' });
  };

  checkIfScroll = () => {};

  render() {
    const { sliderStyle, children } = this.props;

    return (
      <>
        <div
          className={sliderStyle['sliderContainer']}
          ref={this.sliderContainerRef}
        >
          {this.props.currentIndex > 0 ? (
            <button
              className={sliderStyle['prevButton']}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              ref={this.prevBtnRef}
              onClick={this.scrollLeft}
            >
              <svg
                width="43"
                height="38"
                viewBox="0 0 43 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.8518 12.1655L25.3816 9.96973L14.8701 19.3132L25.3816 28.6567L27.8518 26.461L19.828 19.3132L27.8518 12.1655Z"
                  fill="white"
                />
              </svg>
            </button>
          ) : null}

          <div
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onScroll={this.props.handleScroll}
            className={sliderStyle['wrapperContainer']}
            ref={this.wrapperContainerRef}
          >
            {children}
          </div>

          {this.props.currentIndex < this.props.children.length - 1 ? (
            <button
              className={`${sliderStyle['nextButton']}`}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={this.scrollRight}
              ref={this.nextBtnRef}
            >
              <svg
                width="45"
                height="38"
                viewBox="0 0 45 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9372 9.96973L16.3984 12.1655L24.6451 19.3132L16.3984 26.461L18.9372 28.6567L29.7407 19.3132L18.9372 9.96973Z"
                  fill="white"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </>
    );
  }
}
