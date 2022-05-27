import React, {useState} from "react";
import { ToggleSlider }  from "react-toggle-slider";
import Card from "../Card";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


export default class Filter extends React.Component {

    constructor(props) {
        super(props);
        // default filter parameters
        this.state = {
            filteredCrafts : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
            startYear : 1950,
            endYear : 2030,
            toggleStatus : false,
            };

    }


    // function for handling when a craft button is selected, updates state accprdingly
    selectedCraft = (craftType) => {
        let craftsList = this.state.filteredCrafts;
        let selectedAlready = craftsList.indexOf(craftType)
        if (selectedAlready > -1) {
            craftsList.splice(selectedAlready, 1)
            let button = document.getElementById(`${craftType}-btn`)
            button.className='hstg-btn-pill-small'
        } else {
            craftsList.push(craftType)
            let button = document.getElementById(`${craftType}-btn`)
            button.className='hstg-btn-pill-small-selected'
        }

        // callback passed as a prop from explore.js that passes state back up everytime a craft button is pressed
        this.setState({filteredCrafts: craftsList}, () => this.props.callBack(this.state))
    };



    // function to handle when the reset filter button is pressed
    onReset = () => {
        const defaultCrafts = ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"]
        for (const craft of defaultCrafts) {
            let button = document.getElementById(`${craft}-btn`)
            button.className='hstg-btn-pill-small-selected'
            console.log('reset')
        }
        this.resetSlider();
        this.resetToggle();
        this.setState({filteredCrafts:defaultCrafts, toggleStatus:false, startYear: 1950, endYear: 2030}, () => this.props.callBack(this.state))
    }

    // function that updates state based on slider changes
    onSliderUpdate = (value) => {
        this.setState({startYear:value[0], endYear:value[1]}, () => this.props.callBack(this.state))
    }

    // function resets slider to default position
    resetSlider() {
        this.setState({
            startYear: 1950,
            endYear: 2030
        });
    }

    // function changes state to match toggle
    onToggle = (state) => {
        this.setState({toggleStatus:state}, () => this.props.callBack(this.state))
    }

    // function tries to reset toggle to default state (WORK IN PROGRESS)
    resetToggle() {
        this.setState({
            toggleStatus: false,
        });
    }


    render () {
        return (
            <>


                <div>
                    <button id={'architectural-btn'} className={'hstg-btn-pill-small-selected'} onClick={() => this.selectedCraft('architectural')}>Architectural</button>
                    <button id={'cuisine-btn'} className={'hstg-btn-pill-small-selected'} onClick={() => this.selectedCraft('cuisine')}>Cuisine</button>
                    <button id={'decorative-btn'} className={'hstg-btn-pill-small-selected'} onClick={() => this.selectedCraft('decorative')}>Decorative</button>
                    <button id={'fashion-btn'} className={'hstg-btn-pill-small-selected'} onClick={() => this.selectedCraft('fashion')}>Fashion</button>
                    <button id={'functional-btn'} className={'hstg-btn-pill-small-selected'} onClick={() => this.selectedCraft('functional')}>Functional</button>
                    <button id={'furniture-btn'} className={'hstg-btn-pill-small-selected'} onClick={() => this.selectedCraft('furniture')}>Furniture</button>
                    <button id={'textiles-btn'} className={'hstg-btn-pill-small-selected'} onClick={() => this.selectedCraft('textiles')}>Textiles</button>
                </div>

                <Slider range
                        value={[this.state.startYear, this.state.endYear]}
                        marks={{
                            1950: '1950',
                            1960: `1960`,
                            1970: '1970',
                            1980: '1980',
                            1990: '1990',
                            2000: '2000',
                            2010: '2010',
                            2020: '2020',
                            2030: `2030`
                }}
                        min={1950}
                        max={2030}
                        defaultValue={[this.state.startYear, this.state.endYear]}
                        step={10}
                        allowCross = {false}
                        onChange = {(value) => this.onSliderUpdate(value)}
                        onAfterChange = {(value) => this.onSliderUpdate(value)}
                />

                <ToggleSlider state={this.state.toggleStatus} onToggle={(state) => this.onToggle(state)} active={false} draggable={false} barBackgroundColorActive={"#9C6340"}/>
                <button onClick = {() => this.onReset()}> Reset Filters </button>







            </>


        );
    }
}