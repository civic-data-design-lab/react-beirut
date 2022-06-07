import React from "react";
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


export default class LayersControl extends React.Component {

    constructor(props) {
        super(props);
        this.clickLayerButton = this.clickLayerButton.bind(this)
        this.state = {
            selected:null,
            currentLayer: this.props.currentLayer
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentLayer !== prevProps.currentLayer) {
            this.setState({currentLayer: this.props.currentLayer})
        }
    }

    clickLayerButton (e) {
        let layerName = e.target.id;
        this.props.updateMapLayer(layerName)

    }

    getClassName = (key) => {
        console.log("here")
        console.log("props ", this.props.currentLayer)
        console.log("state ", this.state.currentLayer)
        if (key === this.state.currentLayer) {
            return "lc-button-labels-wrapper-selected"
        } else {
            return "lc-button-labels-wrapper"
        }
    }

    getMapLayerButtons = () => {
        let buttons = []
        for (const [key, value] of Object.entries(this.props.allLayers)) {
        buttons.push(
            <>

                        <button className={`mapLayerButtons ${this.getClassName(key)}`} key ={key} id={`${key}-button`} onClick={this.clickLayerButton}>
                        <p className={'lc-button-year map-name-label'} id={key} onClick={this.clickLayerButton}> {key} </p>
                        <p className={'lc-button-ref map-name-reference'} id={key} onClick={this.clickLayerButton}> {value} </p>
                        </button>
                        <hr/>
                </>
        )
        }

        return buttons
    }


    onReset = () => {
        this.props.updateMapLayer(null)

    }

    layersControlContent = () => {
        return (
            <>
                <div className={'close-btn-container padded-lc-section'}>
                    <p className={'card-labels'}>Historic Maps</p>
                    <button className={'close-card-btn'} onClick={this.props.closeLayersControl}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                         </svg>
                    </button>
                </div>
                <hr/>

                <div className={'lc-buttons-section'}>
                    {this.getMapLayerButtons()}
                </div>
                <div className={'reset-section padded-lc-section'}>
                    <button className={'reset-btn'} onClick = {this.onReset}> Reset Maps </button>
                </div>
            </>



        )
}







    render () {


        return (
            <>
            <Desktop>
                <div className={'layersControlCard'}>
                    {this.layersControlContent()}
                </div>
            </Desktop>

            <Tablet>
                <div className={'layersControlCard'}>
                    {this.layersControlContent()}
                </div>
            </Tablet>

            <Mobile>
                <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                                  <div className={'layersControlCard'}>
                                        {this.layersControlContent()}
                                        <button className={'btn-pill lc-showMap-btn view-map-btn'} onClick={this.props.closeLayersControl}>
                                            <span className={'view-map-label'}>View Map</span>
                                        </button>

                                  </div>
                            </div>
                          </div>
                        </div>
            </Mobile>


            </>
        )
    }
}