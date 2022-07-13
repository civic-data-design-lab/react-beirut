import { ToggleSlider }  from "react-toggle-slider";
import React, {useEffect, useState} from "react";



const ActiveFilter = ({toggleStatus, updateToggle, resetToggle}) => {

    // function changes state to match toggle
    const onToggle = (state) => {
        updateToggle(state)
        if (navigator.cookieEnabled) {
            sessionStorage.setItem("prevFilterToggle", JSON.stringify(state))
        }
    }


    return (
            <div className={'toggle-container'}>
                <ToggleSlider
                    key={resetToggle}
                    onToggle={(state) => onToggle(state)} active={toggleStatus}
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
            </div>
        )
}

export default ActiveFilter