import React from "react";



export default class SearchBar extends React.Component {


    state = {
        searchEntry:''
    }

    inputUpdate = () => {
        let value = document.getElementById('mapSearch').value
        this.setState({searchEntry: value}, () => this.props.callBack(this.state.searchEntry))
    }

    clearSearch = () => {
        this.setState({searchEntry: ''}, () => this.props.callBack(this.state.searchEntry))
        let searchBar = document.getElementById('mapSearch')
        searchBar.value = ''
}







    render () {
        return (
            <div>

                <span>
                <input id="mapSearch" type="search" placeholder="Enter Shop Name" onChange={this.inputUpdate}/>

                </span>


            </div>
        )
    }
}