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
      scrolledAmount: 0,
      prevDisable: true,
      nextDisable:
          this.sliderContainerRef && this.sliderContainerRef.offsetWidth >= this.sliderContainerRef.scrollWidth,
    };
  }

    scrollLeft = () => {
    const container = this.sliderContainerRef.current;
    const wrapper = this.wrapperContainerRef.current;
    const itemWidth = wrapper.clientWidth;
    console.log("itemWidth is ", itemWidth)
    this.setState({scrolledAmount:this.state.scrolledAmount-=itemWidth/2})
    wrapper.scrollLeft -= itemWidth/2 //({ left: -itemWidth/2, top: 0, behavior: 'smooth' });
    this.checkChildren(itemWidth, itemWidth/2);
  };

  scrollRight = () => {
    const container = this.sliderContainerRef.current;
    const wrapper = this.wrapperContainerRef.current;
    const itemWidth = wrapper.clientWidth;
    console.log("itemWidth is ", itemWidth)
    this.setState({scrolledAmount:this.state.scrolledAmount+=itemWidth/2})
    wrapper.scrollLeft += itemWidth/2;//{ left: itemWidth/2, top: 0, behavior: 'smooth' });
    this.checkChildren(itemWidth, itemWidth/2);
  };

  componentDidMount() {
    this.checkChildren(this.sliderContainerRef.current.offsetWidth, this.sliderContainerRef.current.scrollWidth);
  }

  checkChildren = (offsetWidthValue, scrollWidthValue) => {
    console.log(this.state.scrolledAmount)
    console.log(scrollWidthValue)
    console.log(offsetWidthValue)
    let offsetConstant
    if (window.innerWidth>688) {
      offsetConstant=1.5
    } else {
      offsetConstant=2.0
    }
    this.setState({
      prevDisable: this.state.scrolledAmount - scrollWidthValue < 0,
      nextDisable:
        this.state.scrolledAmount + scrollWidthValue > offsetWidthValue * offsetConstant,
    });
    if (this.state.scrolledAmount > offsetWidthValue*offsetConstant) {
      this.setState({
        scrolledAmount: offsetWidthValue-scrollWidthValue
      })
    } else if (this.state.scrolledAmount < 0) {
      this.setState({
        scrolledAmount: 0
      })
    }
  };

  render() {

    return (
        <div>
      <div
        className="slider-container"
        id={"slider-container"}
        ref={this.sliderContainerRef}
      >
        <div className="slider-wrapper"
             ref={this.wrapperContainerRef}
        onScroll={()=>{console.log("scrolling")}}>

          {this.props.children}
        </div>

        <button
          className={`btn prev ${this.state.prevDisable ? 'disable' : ''}`}
          disabled={this.state.prevDisable}
          ref={this.prevBtnRef}
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

      </div>
    );
  }
}

