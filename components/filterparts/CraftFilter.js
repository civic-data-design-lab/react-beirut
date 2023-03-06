import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../lib/utils';
import { filter } from 'jszip';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);

const CraftFilter = ({ filteredCrafts, updateCrafts }) => {
  const { t } = useTranslation();

  // props to pass in: filteredCrafts: craftFilter state of parent, updateCrafts: callback from parent to update its state

  // function for handling when a craft button is selected, updates state accprdingly
  const selectedCraft = (craftType) => {
    let craftsList = filteredCrafts;
    let selectedAlready = craftsList.indexOf(craftType);
    if (craftType === 'all') {
      craftsList = [
        'architectural',
        'cuisine',
        'decorative',
        'fashion',
        'functional',
        'furniture',
        'textiles',
      ];
    } else {
      if (selectedAlready > -1) {
        craftsList.splice(selectedAlready, 1);
        let button = document.getElementById(`${craftType}-btn`);
        button.className = `hstg-btn-pill-small--${craftType}`;
      } else {
        craftsList.push(craftType);
        let button = document.getElementById(`${craftType}-btn`);
        button.className = `hstg-btn-pill-small-selected--${craftType}`;
      }
    }

    if (navigator.cookieEnabled) {
      sessionStorage.setItem('prevFilterCrafts', JSON.stringify(craftsList));
    }

    // callback passed as a prop from explore.js (map?) that passes state back up everytime a craft button is pressed
    updateCrafts(craftsList);
  };

  const determineCraftButtonClass = (craftName) => {
    if (craftName === 'all') {
      return `hstg-btn-pill-small hstg-btn-pill-small--${craftName}`;
    } else {
      let index = filteredCrafts.indexOf(craftName);
      if (index > -1) {
        return `hstg-btn-pill-small-selected hstg-btn-pill-small-selected--${craftName}`;
      } else {
        return `hstg-btn-pill-small hstg-btn-pill-small--${craftName}`;
      }
    }
  };

  return (
    <>
      <div className={'craftFilter-container'}>
        <div className={'craftFilter-buttons-container'}>
          <button
            id={'architectural-btn'}
            className={determineCraftButtonClass('architectural')}
            onClick={() => selectedCraft('architectural')}
          >
            {t('Architectural')}
          </button>
          <button
            id={'cuisine-btn'}
            className={determineCraftButtonClass('cuisine')}
            onClick={() => selectedCraft('cuisine')}
          >
            {t('Cuisine')}
          </button>
          <button
            id={'decorative-btn'}
            className={determineCraftButtonClass('decorative')}
            onClick={() => selectedCraft('decorative')}
          >
            {t('Decorative')}
          </button>
          <button
            id={'fashion-btn'}
            className={determineCraftButtonClass('fashion')}
            onClick={() => selectedCraft('fashion')}
          >
            {t('Fashion')}
          </button>
          <button
            id={'functional-btn'}
            className={determineCraftButtonClass('functional')}
            onClick={() => selectedCraft('functional')}
          >
            {t('Functional')}
          </button>
          <button
            id={'furniture-btn'}
            className={determineCraftButtonClass('furniture')}
            onClick={() => selectedCraft('furniture')}
          >
            {t('Furniture')}
          </button>
          <button
            id={'textiles-btn'}
            className={determineCraftButtonClass('textiles')}
            onClick={() => selectedCraft('textiles')}
          >
            {t('Textiles')}
          </button>
          <button
            id={'textiles-btn'}
            className={determineCraftButtonClass('all')}
            onClick={() => selectedCraft('all')}
          >
            {t('Select All')}
          </button>
        </div>
      </div>
    </>
  );
};

export default CraftFilter;
