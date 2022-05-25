import React, {useState} from "react";
import { ToggleSlider }  from "react-toggle-slider";






export default class Filter extends React.Component {

    state = {
        filteredCrafts : ["Architectural", "Cuisine", "Decorative", "Fashion", "Functional", "Furniture", "Textiles"],
        startYear : 1960,
        endYear : 2020,
        toggle : false,
        value: {
                start: 1960,
                end: 2020
            }
    };



    selectedCraft = (craftType) => {
        let craftsList = this.state.filteredCrafts;
        let selectedAlready = craftsList.indexOf(craftType)
        if (selectedAlready > -1) {
            craftsList.splice(selectedAlready, 1)
        } else {
            craftsList.push(craftType)
        }
        this.setState({filteredCrafts: craftsList})
    };

    CraftFilter = () => {
        return (<div>
            <h2>Craft Type</h2>
            <button onClick={() => this.selectedCraft('Architectural')}>Architectural</button>
            <button onClick={() => this.selectedCraft('Cuisine')}>Cuisine</button>
            <button onClick={() => this.selectedCraft('Decorative')}>Decorative</button>
            <button onClick={() => this.selectedCraft('Fashion')}>Fashion</button>
            <button onClick={() => this.selectedCraft('Functional')}>Functional</button>
            <button onClick={() => this.selectedCraft('Furniture')}>Furniture</button>
            <button onClick={() => this.selectedCraft('Textiles')}>Textiles</button>

        </div>);
    };
    defaultCrafts = ["Architectural", "Cuisine", "Decorative", "Fashion", "Functional", "Furniture", "Textiles"]


    Reset = () => {
        return (<div>
            <button onClick = {() => this.setState({filteredCrafts:this.defaultCrafts, toggleActive:false})}> Reset Filters </button>
        </div>);
    }


    yearRange = () => {

        return (<div>

        </div>)

    }


    toggleActive = () => {
        return (<div>
            <ToggleSlider onToggle={state => this.setState({toggle:state})} draggable={false} barBackgroundColorActive={"#9C6340"}/>
        </div>)
    }



    render () {
        const cf = this.CraftFilter();
        const slider = this.yearRange();
        const resetButton = this.Reset();
        const toggleButton = this.toggleActive();

        console.log("printing state ", this.state)
        return (
            <div><h2>Filter</h2>
            {cf}{slider}{toggleButton}{resetButton}

            </div>

        );
    }
}