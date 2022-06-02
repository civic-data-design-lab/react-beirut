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



    }

    clickLayerButton (e) {
        let layerName = e.target.id;
        this.props.updateMapLayer(layerName)
    }

    getMapLayerButtons = () => {
        let buttons = []
        for (const [key, value] of Object.entries(this.props.allLayers)) {
        buttons.push(
            <>

                        <button className={'mapLayerButtons'} key ={key} id={key} onClick={this.clickLayerButton}>
                        <p className={'lc-button-year'} id={key} onClick={this.clickLayerButton}> {key} </p>
                        <p className={'lc-button-ref'} id={key} onClick={this.clickLayerButton}> {value} </p>
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
                <div className={'searchby-section padded-lc-section'}>
                    <p>Historic Maps</p>
                    <button className={'close-filter-btn'} onClick={this.props.closeLayersControl}>X</button>
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

            <Mobile>
                <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                                  <div className={'layersControlCard'}>
                                        {this.layersControlContent()}
                                        <button className={'btn-pill lc-showMap-btn'} onClick={this.props.closeLayersControl}>Show Map</button>

                                  </div>
                            </div>
                          </div>
                        </div>
            </Mobile>


            </>
        )
    }
}