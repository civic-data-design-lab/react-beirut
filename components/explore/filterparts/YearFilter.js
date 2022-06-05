import React, {useState} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class YearFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startYear : this.props.startYear,
            endYear : this.props.endYear
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("component updated ", this.props.startYear, this.props.endYear)
        if (prevProps !== this.props) {
            //console.log("here")
            this.setState({
                startYear: this.props.startYear,
                endYear: this.props.endYear})
        }
        //console.log("component updated ", this.state.startYear, this.state.endYear)
    }

    // function that updates state based on slider changes
    onSliderUpdate = (value) => {
        this.setState({startYear:value[0], endYear:value[1]}, () => this.props.updateYears([this.state.startYear, this.state.endYear]))
        // this.props.updateYears([value[0], value[1]])
    }



    render() {
        //console.log("year filter values ", this.state.startYear, this.state.endYear)
        //console.log("year filter values ", this.props.startYear, this.props.endYear)
        return (
            <>
                <Slider range

                                value={[this.state.startYear, this.state.endYear]}
                                marks={{
                                    //1900: '1900',
                                    //1910: '1910',
                                    1920: '1920',
                                    1930: '1930',
                                    1940: '1940',
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
                                min={1920}
                                max={2030}
                                defaultValue={[this.state.startYear, this.state.endYear]}
                                step={10}
                                allowCross = {false}
                                onChange = {(value) => this.onSliderUpdate(value)}
                                onAfterChange = {(value) => this.onSliderUpdate(value)}
                        />
            </>
        )
    }
}