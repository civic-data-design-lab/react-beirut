import React, {useEffect, useState} from "react";
import { useMediaQuery } from 'react-responsive'
import {useTranslation} from "react-i18next";


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



const LayersControl = ({currentLayer, allLayers, updateMapLayer, closeLayersControl}) => {

    const { t } = useTranslation();

    const [selected, setSelected] = useState(null);
    const [currentLayerState, setCurrentLayerState] = useState(currentLayer)

    useEffect(()=>{
        setCurrentLayerState(currentLayer)
    }, [currentLayer])


    const clickLayerButton = (e) => {
        let layerName = e.target.id;
        console.log(layerName);
        updateMapLayer(layerName)

    }

    const getClassName = (key) => {
        if (key === currentLayerState) {
            return "lc-button-labels-wrapper-selected"
        } else {
            return "lc-button-labels-wrapper"
        }
    }

    const getMapLayerButtons = () => {
        let buttons = []
        for (const [key, value] of Object.entries(allLayers)) {
        buttons.push(
            <>
                <button className={`mapLayerButtons ${getClassName(value[0])}`} key ={value[0]} id={value[0]} onClick={clickLayerButton}>
                    <p className={'lc-button-year map-name-label'} id={value[0]} onClick={clickLayerButton}> {value[0]} </p>
                    <p className={'lc-button-ref map-name-reference'} id={value[0]} onClick={clickLayerButton}> {value[1]} </p>
                </button>
                <hr/>
            </>
        )
        }
        return buttons
    }


    const onReset = () => {
        updateMapLayer(null)
    }

    const layersControlContent = () => {
        return (
            <>
                <div className={'close-btn-container padded-lc-section'}>
                    <p className={'card-labels'}>{t('Historical Maps')}</p>
                    <button className={'close-card-btn'} onClick={closeLayersControl}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                         </svg>
                    </button>
                </div>
                <hr/>

                <div className={'lc-buttons-section'}>
                    {getMapLayerButtons()}
                </div>
                <div className={'card-section-centered padded-lc-section'}>
                    <button className={'reset-btn'} onClick = {onReset}>{t('Reset Maps')} </button>
                </div>
            </>

        )
}

return (
            <>
            <Desktop>
                <div className={'layersControlCard'}>
                    {layersControlContent()}
                </div>
            </Desktop>

            <Tablet>
                <div className={'layersControlCard'}>
                    {layersControlContent()}
                </div>
            </Tablet>

            <Mobile>
                <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                                  <div className={'layersControlCard'}>
                                        {layersControlContent()}
                                      <div className={'card-section-centered'}>
                                        <button className={'btn-pill lc-showMap-btn view-map-btn'} onClick={closeLayersControl}>
                                            <span className={'view-map-label'}>View Map</span>
                                        </button>
                                          </div>

                                  </div>
                            </div>
                          </div>
                        </div>
            </Mobile>


            </>
        )
}

export default LayersControl;