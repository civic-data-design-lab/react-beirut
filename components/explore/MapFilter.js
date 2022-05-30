import React, {useState} from "react";
import CraftFilter from "./filterparts/CraftFilter";
import YearFilter from "./filterparts/YearFilter";
import ActiveFilter from "./filterparts/ActiveFilter";



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
            button.className='hstg-btn-pill-small-selected'
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


    render () {
        console.log("MapFilter ", this.state);
        return (
            <>
                <div className={'filterCard'}>
                    <div className={'searchby-section'}>
                        <p>Search By</p>
                        <button className={'close-filter-btn'} onClick={this.props.closeFilter}>X</button>
                    </div>
                    <hr/>
                    <div>
                        <p>Craft Type</p>
                        <CraftFilter filteredCrafts={this.state.filteredCrafts} updateCrafts={this.props.updateCrafts}/>
                    </div>
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
                </div>
                <div className={'arrow-down'}/>
            </>


        );
    }
}