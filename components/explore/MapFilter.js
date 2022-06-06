import React, {useState} from "react";
import CraftFilter from "../filterparts/CraftFilter";
import YearFilter from "../filterparts/YearFilter";
import ActiveFilter from "../filterparts/ActiveFilter";
import Card from "../Card";
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



export default class MapFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filteredCrafts : this.props.filteredCrafts,
            startYear : this.props.startYear,
            endYear : this.props.endYear,
            toggleStatus : this.props.toggleStatus};
    }






    filterCardContent() {
        return(
            <>
                <div className={"close-btn-container"}>
                    <p className={'card-labels'}>Filter By</p>
                    <button className={'close-card-btn'} onClick={this.props.closeFilter}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#404044"/>
                         </svg>
                    </button>
                </div>
                <hr/>
                <div className={"card-section"}>
                    <p className={'card-section-labels'}>Craft Type</p>
                    <CraftFilter filteredCrafts={this.props.filteredCrafts} updateCrafts={this.props.updateCrafts}/>
                </div>
                <hr/>
                <div className={"card-section"}>
                    <p className={'card-section-labels'}>Time Range</p>
                    <YearFilter startYear={this.props.startYear} endYear={this.props.endYear}
                                updateYears={this.props.updateYears}/>
                </div>
                <hr/>
                <div className={'toggle-section'}>
                    <p className={'card-section-labels'}>Only show active businesses</p>
                    <ActiveFilter toggleStatus={this.props.toggleStatus} updateToggle={this.props.updateToggle}
                                  resetToggle={this.props.resetToggle}/>
                </div>
                <hr/>
                <div className={'reset-section'}>
                    <button className={'reset-btn card-labels'} onClick = {this.props.reset}> Reset Filters </button>
                </div>
            </>
        )
    }




    render () {

        console.log("checking props here ", this.props)
        console.log("checking state here " ,this.state)

        return (
            <>
                <Desktop>
                    <div className={'filterCard'}>
                        {this.filterCardContent()}
                    </div>
                </Desktop>

                <Mobile>

                        <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                              <div className="filterCard animateCard">
                                  {this.filterCardContent()}
                                  <button className={'btn-pill view-map-btn'} onClick={this.props.closeFilter}>
                                      <span className={'view-map-label'}>View Map</span>
                                  </button>
                              </div>
                            </div>
                          </div>
                        </div>

                </Mobile>

            </>


        );
    }
}