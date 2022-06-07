import { ToggleSlider }  from "react-toggle-slider";
import React, {useEffect, useState} from "react";




export default class ActiveFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleStatus : this.props.toggleStatus,
            resetToggle : this.props.resetToggle
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                toggleStatus: this.props.toggleStatus,
                resetToggle : this.props.resetToggle
            })
        }

        console.log("check state ", this.state)
    }

    // function changes state to match toggle
    onToggle = (state) => {
        this.setState({toggleStatus:state}, () => this.props.updateToggle(this.state.toggleStatus))
    }





    render() {




        return (
            <>
                <ToggleSlider
                    key={this.state.resetToggle}
                    onToggle={(state) => this.onToggle(state)} active={this.state.toggleStatus}
                    draggable={false}
                    barBackgroundColorActive={"#9C6340"}
                    handleBackgroundColor={"#9C6340"}
                    handleSize={20}
                    padding={0}
                    handleBorderRadius={50}
                    barWidth={36}
                    barHeight={10}
                    barBorderRadius={50}
                    barBackgroundColor={"#f1f1ec"}

                    barStyles={{
                        borderWidth: 0.5,
                        borderStyle: "solid",
                        borderColor: "#9C6340"}
                    }





                />
            </>
        )
    }
}