import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import CraftFilter from "../filterparts/CraftFilter";
import YearFilter from "../filterparts/YearFilter";
import ActiveFilter from "../filterparts/ActiveFilter";
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

import {TRANSLATIONS} from "../../lib/utils";

import i18n from "i18next";
import { Trans, useTranslation, initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);




const ImageFilter = ({
                         filteredCrafts,
                         startYear,
                         endYear,
                         toggleStatus,
                         updateCrafts,
                         updateYears,
                         updateToggle,
                         reset,
                         resetToggle,
                         close}) => {

    const { t } = useTranslation();



    const getImageFilterContent = () => {
        return (
            <>
                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>
                        <p>{t('Craft Type')}</p>
                        <hr/>
                        <CraftFilter filteredCrafts={filteredCrafts} updateCrafts={updateCrafts}/>
                    </div>
                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>
                        <p>{t('Time Range')}</p>
                        <hr/>
                        <YearFilter startYear={startYear} endYear={endYear}
                                    updateYears={updateYears}/>
                    </div>
                    <div className={'image-filter-section image-filter-section-col'} style={{flexBasis: '30%'}}>
                        <div className={'image-filter-toggle-section'}>
                            <p>{t('Only Show Active Businesses')}</p>
                            <ActiveFilter toggleStatus={toggleStatus} updateToggle={updateToggle}
                                          resetToggle={resetToggle}/>
                        </div>

                        <div >
                            <button className={'reset-btn card-labels'} onClick={reset}>{t('Reset Filters')}</button>
                        </div>
                    </div>
                </>
        )
    }


        return (
            <>
                <Desktop>
                    <div className={'image-filter-container detach'}>
                    {getImageFilterContent()}
                    </div>

                </Desktop>

                <Tablet>
                    <div className={'image-filter-container detach'}>
                    {getImageFilterContent()}
                    </div>
                </Tablet>

                <Mobile>
                    <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                               <div className={'image-filter-container'}>
                                   <div className={"close-btn-container"}>
                                       <p className={'card-section-labels'} style={{fontWeight:600}}>Filters</p>
                                       <button className={'close-card-btn'} onClick={close}>
                                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                                           </svg>
                                       </button>
                                   </div>
                                   <hr/>
                                   <div className={'card-section'}>
                                       <p className={'card-section-labels'}>Craft Type</p>
                                       <CraftFilter filteredCrafts={filteredCrafts} updateCrafts={updateCrafts}/>
                                   </div>
                                   <hr/>
                                   <div className={'card-section'}>
                                       <p className={'card-section-labels'}>Time Range</p>
                                       <YearFilter startYear={startYear} endYear={endYear}
                                    updateYears={updateYears}/>
                                   </div>
                                   <hr/>
                                   <div className={'toggle-section'}>
                                       <p className={'card-section-labels'}>Show Only Current Craft Workshops</p>
                                       <ActiveFilter toggleStatus={toggleStatus} updateToggle={updateToggle}
                                          resetToggle={resetToggle}/>
                                   </div>
                                   <hr/>
                                   <div className={'card-section-centered'}>
                                       <button className={'reset-btn card-labels'} onClick={reset}>Reset</button>
                                   </div>
                                   <div className={'card-section-centered'}>
                                       <button className={'btn-pill view-map-btn'} onClick={close}><span className={'view-map-label'}>View Images</span></button>
                                   </div>

                               </div>
                            </div>
                          </div>
                        </div>
                </Mobile>

            </>
        )

}

export default ImageFilter;
