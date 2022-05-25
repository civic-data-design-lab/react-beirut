import React, {useState} from "react";
import { ToggleSlider }  from "react-toggle-slider";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


export default class Filter extends React.Component {

    state = {
        filteredCrafts : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
        startYear : 1960,
        endYear : 2030,
        toggleStatus : false,
    };



    selectedCraft = (craftType) => {
        let craftsList = this.state.filteredCrafts;
        let selectedAlready = craftsList.indexOf(craftType)
        if (selectedAlready > -1) {
            craftsList.splice(selectedAlready, 1)
        } else {
            craftsList.push(craftType)
        }
        this.setState({filteredCrafts: craftsList}, () => this.props.callBack(this.state))
    };

    CraftFilter = () => {
        return (<div>
            <h2>Craft Type</h2>
            <button onClick={() => this.selectedCraft('architectural')}>Architectural</button>
            <button onClick={() => this.selectedCraft('cuisine')}>Cuisine</button>
            <button onClick={() => this.selectedCraft('decorative')}>Decorative</button>
            <button onClick={() => this.selectedCraft('fashion')}>Fashion</button>
            <button onClick={() => this.selectedCraft('functional')}>Functional</button>
            <button onClick={() => this.selectedCraft('furniture')}>Furniture</button>
            <button onClick={() => this.selectedCraft('textiles')}>Textiles</button>
        </div>);
    };

    defaultCrafts = ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"]

    onReset = () => {
        this.setState({filteredCrafts:this.defaultCrafts, toggleStatus:false, startYear: 1960, endYear: 2030}, () => this.props.callBack(this.state))
    }

    Reset = () => {
        return (<div>
            <button onClick = {() => this.onReset()}> Reset Filters </button>
        </div>);
    }


    yearRange = () => {

        return (<div>
                    <Slider range
          marks={{
            1960: `1960`,
            1970: '1970',
            1980: '1980',
            1990: '1990',
            2000: '2000',
            2010: '2010',
            2020: '2020',
            2030: `2030`
          }}
          min={1960}
          max={2030}
          defaultValue={[this.state.startYear, this.state.endYear]}
          step={10}
          allowCross = {false}
          onChange = {(value) => this.onSliderUpdate(value)}
          onAfterChange = {(value) => this.onSliderUpdate(value)}
        />
        </div>)
    }

    onSliderUpdate = (value) => {
        this.setState({startYear:value[0], endYear:value[1]}, () => this.props.callBack(this.state))
    }


    toggleActive = () => {
        return (<div>
            <ToggleSlider onToggle={(state) => this.onToggle(state)} active={false} draggable={false} barBackgroundColorActive={"#9C6340"}/>
        </div>)
    }

    onToggle = (state) => {
        this.setState({toggleStatus:state}, () => this.props.callBack(this.state))

    }





    render () {
        const cf = this.CraftFilter();
        const slider = this.yearRange();
        const resetButton = this.Reset();
        const toggleButton = this.toggleActive();



        return (
            <div><h2>Filter</h2>
            {cf}{slider}{toggleButton}{resetButton}

            </div>

        );
    }
}