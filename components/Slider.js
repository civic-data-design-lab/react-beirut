import React, { Component, createRef } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";


export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.sliderContainerRef = createRef();
    this.wrapperContainerRef = createRef();
    this.nextBtnRef = createRef();
    this.prevBtnRef = createRef();

    this.state = {
      clicked:false,
      prevDisable: true,
      nextDisable:
        this.sliderContainerRef && this.sliderContainerRef.offsetWidth >= this.sliderContainerRef.scrollWidth
          ? true
          : false,
    };
  }

    scrollLeft = () => {
    const container = this.sliderContainerRef.current;
    const wrapper = this.wrapperContainerRef.current;
    const itemWidth = wrapper.clientWidth;
    container.scrollBy({ left: -itemWidth, top: 0, behavior: 'smooth' });
    this.checkChildren(itemWidth, itemWidth/2);
  };

  scrollRight = () => {
    const container = this.sliderContainerRef.current;
    const wrapper = this.wrapperContainerRef.current;
    const itemWidth = container.clientWidth;
    container.scrollBy({ left: itemWidth, top: 0, behavior: 'smooth' });
    this.checkChildren(itemWidth, itemWidth/2);
  };

  componentDidMount() {
    this.checkChildren(this.sliderContainerRef.current.offsetWidth, this.sliderContainerRef.current.scrollWidth);
  }

  checkChildren = (offsetWidthValue, scrollWidthValue) => {
    this.setState({
      prevDisable: this.sliderContainerRef.current.scrollLeft <= 0 ? true : false,
      nextDisable:
        this.sliderContainerRef.current.scrollLeft + offsetWidthValue >= scrollWidthValue
          ? true
          : false,
    });
  };

  render() {

    return (
      <div
        className="slider-container"
        id={"slider-container"}
        ref={this.sliderContainerRef}
      >
        <div className="slider-wrapper"
             ref={this.wrapperContainerRef}>
          {this.props.children}
        </div>

        <button
          className={`btn prev ${this.state.prevDisable ? 'disable' : ''}`}
          disabled={this.state.prevDisable}
          ref={this.prevBtnRef}>
          onClick={() => {
            this.scrollLeft()
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} width={8}/>
        </button>
        <button
          className={`btn next ${this.state.nextDisable ? 'disable' : ''}`}
          disabled={this.state.nextDisable}
          ref={this.nextBtnRef}
          onClick={() => {
            this.scrollRight()
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} width={8}/>
        </button>

        <div className={`blur-btns prev ${this.state.prevDisable ? 'disable' : ''}`}/>
        <div className={`blur-btns next ${this.state.nextDisable ? 'disable' : ''}`}/>



      </div>
    );
  }
}

