import React, {useState} from "react";
import CraftFilter from "../filterparts/CraftFilter";
import YearFilter from "../filterparts/YearFilter";
import ActiveFilter from "../filterparts/ActiveFilter";
import Card from "../Card";
import { useMediaQuery } from 'react-responsive'
import i18n from "i18next";
import {initReactI18next, useTranslation} from "react-i18next";
import {TRANSLATIONS} from "../../lib/utils";

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

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);



const MapFilter = ({filteredCrafts, startYear, endYear, toggleStatus, search,
                            updateCrafts, updateYears, updateToggle, closeFilter, triggerReset, reset, resetToggle}) => {


    const { t } = useTranslation();
    const filterCardContent = () => {
        return(
            <>
                <div className={"close-btn-container"}>
                    <p className={'card-labels'}>{t('Filter By')}</p>
                    <button className={'close-card-btn'} onClick={closeFilter}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                         </svg>
                    </button>
                </div>
                <hr/>
                <div className={"card-section"}>
                    <p className={'card-section-labels'}>{t('Craft Type')}</p>
                    <CraftFilter filteredCrafts={filteredCrafts} updateCrafts={updateCrafts}/>
                </div>
                <hr/>
                <div className={"card-section"}>
                    <p className={'card-section-labels'}>{t('Time Range')}</p>
                    <YearFilter startYear={startYear} endYear={endYear}
                                updateYears={updateYears}/>
                </div>
                <hr/>
                <div className={'toggle-section'}>
                    <p className={'card-section-labels'}>{t('Show only current craft workshops')}</p>
                    <ActiveFilter toggleStatus={toggleStatus} updateToggle={updateToggle}
                                  resetToggle={resetToggle}/>
                </div>
                <hr/>
                <div className={'card-section-centered'}>
                    <button className={'reset-btn card-labels'} onClick = {reset}> {t('Reset Filters')} </button>
                </div>
            </>
        )
    }

        return (
            <>
                <Desktop>
                    <div className={'filterCard'}>
                        {filterCardContent()}
                    </div>
                </Desktop>

                <Tablet>
                    <div className={'filterCard'}>
                        {filterCardContent()}
                    </div>
                </Tablet>

                <Mobile>

                        <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">

                              <div className="filterCard animateCard">
                                  {filterCardContent()}
                                  <div className={'card-section-centered'}>
                                      <button className={'btn-pill view-map-btn'} onClick={closeFilter}>
                                      <span className={'view-map-label'}>View Map</span>
                                        </button>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>

                </Mobile>

            </>


        );

}

export default MapFilter