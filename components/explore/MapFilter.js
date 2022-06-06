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
                    <h1>Search By</h1>
                    <button className={'close-card-btn'} onClick={this.props.closeFilter}>X</button>
                </div>
                <hr/>
                <div className={"card-section"}>
                    <p>Craft Type</p>
                    <CraftFilter filteredCrafts={this.props.filteredCrafts} updateCrafts={this.props.updateCrafts}/>
                </div>
                <hr/>
                <div className={"card-section"}>
                    <p>Time Range</p>
                    <YearFilter startYear={this.props.startYear} endYear={this.props.endYear}
                                updateYears={this.props.updateYears}/>
                </div>
                <hr/>
                <div className={'toggle-section'}>
                    <p>Only show active businesses</p>
                    <ActiveFilter toggleStatus={this.props.toggleStatus} updateToggle={this.props.updateToggle}
                                  resetToggle={this.props.resetToggle}/>
                </div>
                <hr/>
                <div className={'reset-section'}>
                    <button className={'reset-btn'} onClick = {this.props.reset}> Reset Filters </button>
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
                                  <button className={'btn-pill view-map-btn'} onClick={this.props.closeFilter}>View Map</button>
                              </div>
                            </div>
                          </div>
                        </div>

                </Mobile>

            </>


        );
    }
}