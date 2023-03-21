import { ToggleSlider } from 'react-toggle-slider';
import React, { useEffect, useState } from 'react';
import { faShop, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActiveFilter = ({
  toggleStatus,
  updateToggle,
  resetToggle,
  forWorkshops,
}) => {
  // function changes state to match toggle

  const onToggle = (state) => {
    updateToggle(state);
    if (forWorkshops) {
      if (navigator.cookieEnabled) {
        sessionStorage.setItem(
          'prevFilterWorkshopToggle',
          JSON.stringify(state)
        );
      }
    } else {
      if (navigator.cookieEnabled) {
        sessionStorage.setItem(
          'prevFilterArchiveToggle',
          JSON.stringify(state)
        );
      }
    }
  };

  return (
    <div className="active-filter-container">
      <div className={'toggle-container'}>
        <ToggleSlider
          key={resetToggle}
          onToggle={(state) => onToggle(state)}
          active={toggleStatus}
          draggable={false}
          barBackgroundColorActive={'#9C6340'}
          handleBackgroundColor={'#9C6340'}
          handleSize={20}
          padding={0}
          handleBorderRadius={50}
          barWidth={36}
          barHeight={10}
          barBorderRadius={50}
          barBackgroundColor={'#f1f1ec'}
          barStyles={{
            borderWidth: 0.5,
            borderStyle: 'solid',
            borderColor: '#9C6340',
          }}
        />
      </div>
      <FontAwesomeIcon icon={forWorkshops ? faShop : faImage} width={20} />
    </div>
  );
};

export default ActiveFilter;
