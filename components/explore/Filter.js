import React, {useState} from "react";
import { ToggleSlider }  from "react-toggle-slider";
import imageCard from "../discover/ImageCard";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ImageCard from "../discover/ImageCard";


export default class Filter extends React.Component {

    constructor(props) {
        super(props);
        // default filter parameters
        this.state = {
            filteredCrafts : this.props.settings['filteredCraftsParent'],
            startYear : this.props.settings['startYearParent'],
            endYear : this.props.settings['endYearParent'],
            toggleStatus : this.props.settings['toggleParent'],
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

    determineCraftButtonClass = (craftName) => {
        let index = this.state.filteredCrafts.indexOf(craftName);
        if (index >-1) {
            return ('hstg-btn-pill-small-selected')
        } else {
            return ('hstg-btn-pill-small')
        }

    }




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

                <div className={'filterCard'}>

                    <div className={'searchby-section'}>
                        <p>Search By</p>
                        <button className={'close-filter-btn'} onClick={this.props.closeFilter}>X</button>
                    </div>

                    <hr/>

                    <div>
                        <p>Craft Type</p>
                        <button id={'architectural-btn'} className={this.determineCraftButtonClass('architectural')} onClick={() => this.selectedCraft('architectural')}>Cuisine</button>
                        <button id={'cuisine-btn'} className={this.determineCraftButtonClass('cuisine')} onClick={() => this.selectedCraft('cuisine')}>Cuisine</button>
                        <button id={'decorative-btn'} className={this.determineCraftButtonClass('decorative')} onClick={() => this.selectedCraft('decorative')}>Decorative</button>
                        <button id={'fashion-btn'} className={this.determineCraftButtonClass('fashion')} onClick={() => this.selectedCraft('fashion')}>Fashion</button>
                        <button id={'functional-btn'} className={this.determineCraftButtonClass('functional')} onClick={() => this.selectedCraft('functional')}>Functional</button>
                        <button id={'furniture-btn'} className={this.determineCraftButtonClass('furniture')} onClick={() => this.selectedCraft('furniture')}>Furniture</button>
                        <button id={'textiles-btn'} className={this.determineCraftButtonClass('textiles')} onClick={() => this.selectedCraft('textiles')}>Textiles</button>
                    </div>

                    <hr/>

                    <div>
                        <p>Time Range</p>
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
                    </div>

                    <hr/>

                    <div className={'toggle-section'}>
                        <p>Only show active businesses</p>
                        <ToggleSlider state={this.state.toggleStatus} onToggle={(state) => this.onToggle(state)} active={this.state.toggleStatus} draggable={false} barBackgroundColorActive={"#9C6340"}/>
                    </div>

                    <hr/>

                    <div className={'reset-section'}>
                        <button className={'reset-btn'} onClick = {() => this.onReset()}> Reset Filters </button>
                    </div>



                </div>
                <div className={'arrow-down'}></div>

            </>


        );
    }
}