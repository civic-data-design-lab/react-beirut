import React, {useState} from "react";
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';




const YearFilter = ({startYear, endYear, updateYears}) => {


    // function that updates state based on slider changes
    const onSliderUpdate = (value) => {
        updateYears([value[0], value[1]])
        if (navigator.cookieEnabled) {
            sessionStorage.setItem("prevFilterStartYear", JSON.stringify(value[0]))
            sessionStorage.setItem("prevFilterEndYear", JSON.stringify(value[1]))
        }
        // this.props.updateYears([value[0], value[1]])
    }

    const getCustomHandle = () => {
        return (
            <div style={{backgroundColor: "black", height: 100, width: 100, borderRadius: "50%"}}/>
        )
    }





    return (
            <>

                <div className={"yearFilter-container"}>

                <Slider range

                value={[startYear, endYear]}
                dots={false}
                marks={{
                    1890: '1890',
                    //1900: '1900',
                    1910: '1910',
                    //1920: '1920',
                    1930: '1930',
                    //1940: '1940',
                    1950: '1950',
                    //1960: `1960`,
                    1970: '1970',
                    //1980: '1980',
                    1990: '1990',
                    //2000: '2000',
                    2010: '2010',
                    //2020: '2020',
                    2030: `2030`
        }}
                min={1890}
                max={2030}
                defaultValue={[startYear, endYear]}
                step={10}
                allowCross = {false}
                onChange = {(value) => onSliderUpdate(value)}
                onAfterChange = {(value) => onSliderUpdate(value)}

                handleStyle={{backgroundColor:"#9C6340", opacity:"100%", borderColor:"#9C6340"}}
                //handleStyleActive={{backgroundColor:"#9C6340", borderColor:"#9C6340"}}

                trackStyle={{backgroundColor:"#9C6340"}}
                railStyle={{backgroundColor:"#f1f1ec"}}
                handle={getCustomHandle}

        />

                    </div>




            </>
        )
}

export default YearFilter