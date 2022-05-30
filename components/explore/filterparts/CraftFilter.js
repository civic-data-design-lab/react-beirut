import React, {useState} from "react";

export default class CraftFilter extends React.Component {

    // props to pass in: filteredCrafts: craftFilter state of parent, updateCrafts: callback from parent to update its state

    constructor(props) {
        super(props);

        this.state = {
            filteredCrafts : this.props.filteredCrafts
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
        this.setState({filteredCrafts: craftsList}, () => this.props.updateCrafts(this.state.filteredCrafts))
    };

    determineCraftButtonClass = (craftName) => {
        let index = this.state.filteredCrafts.indexOf(craftName);
        if (index >-1) {
            return ('hstg-btn-pill-small-selected')
        } else {
            return ('hstg-btn-pill-small')
        }
    }


    render () {
        return (
            <>
                <button id={'architectural-btn'} className={this.determineCraftButtonClass('architectural')} onClick={() => this.selectedCraft('architectural')}>Architectural</button>
                <button id={'cuisine-btn'} className={this.determineCraftButtonClass('cuisine')} onClick={() => this.selectedCraft('cuisine')}>Cuisine</button>
                <button id={'decorative-btn'} className={this.determineCraftButtonClass('decorative')} onClick={() => this.selectedCraft('decorative')}>Decorative</button>
                <button id={'fashion-btn'} className={this.determineCraftButtonClass('fashion')} onClick={() => this.selectedCraft('fashion')}>Fashion</button>
                <button id={'functional-btn'} className={this.determineCraftButtonClass('functional')} onClick={() => this.selectedCraft('functional')}>Functional</button>
                <button id={'furniture-btn'} className={this.determineCraftButtonClass('furniture')} onClick={() => this.selectedCraft('furniture')}>Furniture</button>
                <button id={'textiles-btn'} className={this.determineCraftButtonClass('textiles')} onClick={() => this.selectedCraft('textiles')}>Textiles</button>

            </>
        )
    }
}