import React, {useState} from "react";
import CraftFilter from "./filterparts/CraftFilter";
import YearFilter from "./filterparts/YearFilter";
import ActiveFilter from "./filterparts/ActiveFilter";
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


    // function to handle when the reset filter button is pressed
    onReset = () => {
        const defaultCrafts = ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"]
        for (const craft of defaultCrafts) {
            let button = document.getElementById(`${craft}-btn`)
            button.className=`hstg-btn-pill-small-selected hstg-btn-pill-small-selected--${craft}`
        }

        this.setState({
            startYear: 1950,
            endYear: 2030
        });


        this.resetToggle();
        this.props.triggerReset();
    }


    // function resets slider to default position
    resetSlider() {
        this.setState({
            startYear: 1950,
            endYear: 2030
        });
    }


    // function tries to reset toggle to default state (WORK IN PROGRESS)
    resetToggle() {
        this.setState({
            toggleStatus: false,
        });
    }

    filterCardContent() {
        return(
            <>
                        <div className={'close-btn-container'}>
                            <button className={'close-card-btn'} onClick={this.props.closeFilter}>X</button>
                        </div>
                        <div>
                            <p>Search By</p>
                        </div>
                        <hr/>


                            <CraftFilter filteredCrafts={this.state.filteredCrafts} updateCrafts={this.props.updateCrafts}/>

                        <hr/>
                        <div>
                            <p>Time Range</p>
                            <YearFilter startYear={this.state.startYear} endYear={this.state.endYear}
                                        updateYears={this.props.updateYears}/>
                        </div>
                        <hr/>
                        <div className={'toggle-section'}>
                            <p>Only show active businesses</p>
                            <ActiveFilter toggleStatus={this.state.toggleStatus} updateToggle={this.props.updateToggle}/>
                        </div>
                        <hr/>
                        <div className={'reset-section'}>
                            <button className={'reset-btn'} onClick = {this.onReset}> Reset Filters </button>
                        </div>
            </>
        )
    }




    render () {

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
                              <div className="filterCard">
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