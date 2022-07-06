import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked:false,
      prevDisable: true,
      nextDisable:
        this.refs && this.refs.offsetWidth >= this.refs.scrollWidth
          ? true
          : false,
    };
  }

  componentDidMount() {
    this.checkChildren(this.refs.offsetWidth, this.refs.scrollWidth);
  }

  checkChildren = (offsetWidthValue, scrollWidthValue) => {
    console.log('check children');
    this.setState({
      prevDisable: this.refs.scrollLeft <= 0 ? true : false,
      nextDisable:
        this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue
          ? true
          : false,
    });
  };

  render() {
    const offsetWidthValue = this.refs.offsetWidth,
      scrollWidthValue = this.refs.scrollWidth;

    return (
      <div
        className="slider-container"
        ref={(el) => {
          this.refs = el;
        }}
      >
        <div className="slider-wrapper">{this.props.children}</div>

        <button
          className={`btn prev ${this.state.prevDisable ? 'disable' : ''}`}
          disabled={this.state.prevDisable}
          onClick={() => {
            this.refs.scrollLeft -= offsetWidthValue / 2;
            this.checkChildren(offsetWidthValue, scrollWidthValue);
            this.setState({clicked:!this.state.clicked})
            console.log("clicked!")
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} width={8}/>
        </button>
        <button
          className={`btn next ${this.state.nextDisable ? 'disable' : ''}`}
          disabled={this.state.nextDisable}
          onClick={() => {
            this.refs.scrollLeft += offsetWidthValue / 2;
            this.checkChildren(offsetWidthValue, scrollWidthValue);
            this.setState({clicked:!this.state.clicked})
            console.log("clicked!")
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} width={8}/>
        </button>

        <div className={`blur-btns prev ${this.state.prevDisable ? 'disable' : ''}`}/>
        <div className={`blur-btns next ${this.state.nextDisable ? 'disable' : ''}`}/>
        {this.state.clicked?
            <div className={"testDiv"}>
              <p>HIIIIIII</p>
            </div>:null}


      </div>
    );
  }
}
