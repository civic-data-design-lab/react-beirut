import { ToggleSlider }  from "react-toggle-slider";
import React from "react";

export default class ActiveFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleStatus : this.props.toggleStatus
        }
    }

    // function changes state to match toggle
    onToggle = (state) => {
        this.setState({toggleStatus:state}, () => this.props.updateToggle(this.state.toggleStatus))
    }


    render() {
        return (
            <>
                <ToggleSlider state={this.state.toggleStatus} onToggle={(state) => this.onToggle(state)} active={this.state.toggleStatus} draggable={false} barBackgroundColorActive={"#9C6340"}/>
            </>
        )
    }
}