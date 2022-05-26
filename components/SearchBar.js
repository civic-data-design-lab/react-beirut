import React from "react";



export default class SearchBar extends React.Component {


    state = {
        searchEntry:''
    }

    inputUpdate = () => {
        let value = document.getElementById('mapSearch').value
        this.setState({searchEntry: value}, () => this.props.callBack(this.state.searchEntry))
    }







    render () {
        return (
            <div>
                <input id="mapSearch" type="text" placeholder="Enter Shop Name" onChange={this.inputUpdate}/>
            </div>
        )
    }
}