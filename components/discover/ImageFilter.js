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


export default class ImageFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredCrafts : this.props.filteredCrafts,
            startYear : this.props.startYear,
            endYear : this.props.endYear,
            toggleStatus : this.props.toggleStatus,
            reset : this.props.resetToggle}

        }

    getImageFilterContent = () => {
        return (
            <>
                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>
                        <p>Craft Type</p>
                        <hr/>
                        <CraftFilter filteredCrafts={this.props.filteredCrafts} updateCrafts={this.props.updateCrafts}/>
                    </div>
                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>
                        <p>Time Range</p>
                        <hr/>
                        <YearFilter startYear={this.props.startYear} endYear={this.props.endYear}
                                    updateYears={this.props.updateYears}/>
                    </div>
                    <div className={'image-filter-section image-filter-section-col'} style={{flexBasis: '30%'}}>
                        <div className={'image-filter-toggle-section'}>
                            <p>Only Show Current Craft Workshops</p>
                            <ActiveFilter toggleStatus={this.props.toggleStatus} updateToggle={this.props.updateToggle}
                                          resetToggle={this.props.resetToggle}/>
                        </div>

                        <div >
                            <button className={'reset-btn card-labels'} onClick={this.props.reset}>Reset Filter</button>
                        </div>
                    </div>
                </>
        )
    }


    render () {

        return (
            <>
                <Desktop>
                    <div className={'image-filter-container detach'}>
                    {this.getImageFilterContent()}
                    </div>

                </Desktop>

                <Tablet>
                    <div className={'image-filter-container detach'}>
                    {this.getImageFilterContent()}
                    </div>
                </Tablet>

                <Mobile>
                    <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                               <div className={'image-filter-container'}>
                                   <div className={"close-btn-container"}>
                                       <p className={'card-section-labels'} style={{fontWeight:600}}>Filters</p>
                                       <button className={'close-card-btn'} onClick={this.props.close}>
                                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                                           </svg>
                                       </button>
                                   </div>
                                   <hr/>
                                   <div className={'card-section'}>
                                       <p className={'card-section-labels'}>Craft Type</p>
                                       <CraftFilter filteredCrafts={this.props.filteredCrafts} updateCrafts={this.props.updateCrafts}/>
                                   </div>
                                   <hr/>
                                   <div className={'card-section'}>
                                       <p className={'card-section-labels'}>Time Range</p>
                                       <YearFilter startYear={this.props.startYear} endYear={this.props.endYear}
                                    updateYears={this.props.updateYears}/>
                                   </div>
                                   <hr/>
                                   <div className={'toggle-section'}>
                                       <p className={'card-section-labels'}>Show Only Current Craft Workshops</p>
                                       <ActiveFilter toggleStatus={this.props.toggleStatus} updateToggle={this.props.updateToggle}
                                          resetToggle={this.props.resetToggle}/>
                                   </div>
                                   <hr/>
                                   <div className={'card-section-centered'}>
                                       <button className={'reset-btn card-labels'} onClick={this.props.reset}>Reset</button>
                                   </div>
                                   <div className={'card-section-centered'}>
                                       <button className={'btn-pill view-map-btn'} onClick={this.props.close}><span className={'view-map-label'}>View Images</span></button>
                                   </div>

                               </div>
                            </div>
                          </div>
                        </div>
                </Mobile>

            </>
        )
    }
}
