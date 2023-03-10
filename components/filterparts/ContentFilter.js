import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../lib/utils';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);

/**
 *
 * @param {Array<string>} filteredContent list of strings representing what image content the user currently filtered for
 * @param {function} updateContent callback for how to update filteredContent
 * @returns {void}
 */

const ContentFilter = ({ filteredContent, updateContent }) => {
  const { t } = useTranslation();

  // function for handling when a content button is selected, updates state accprdingly
  const selectedContent = (contentType) => {
    let contentList = [...filteredContent];
    let selectedAlready = contentList.indexOf(contentType);
    if (contentType === 'all') {
      contentList = ['indoor', 'outdoor', 'person', 'craft'];
    } else {
      if (selectedAlready > -1) {
        contentList.splice(selectedAlready, 1);
      } else {
        contentList.push(contentType);
      }
    }

    if (navigator.cookieEnabled) {
      sessionStorage.setItem('prevFilterContent', JSON.stringify(contentList));
    }

    // callback passed as a prop from explore.js (map?) that passes state back up everytime a content button is pressed
    updateContent(contentList);
  };

  const determineContentButtonClass = (contentName) => {
    if (contentName === 'all') {
      return `hstg-btn-pill-small hstg-btn-pill-small`;
    } else {
      let index = filteredContent.indexOf(contentName);
      if (index > -1) {
        return `hstg-btn-pill-small-selected hstg-btn-pill-small-selected`;
      } else {
        return `hstg-btn-pill-small hstg-btn-pill-small`;
      }
    }
  };

  return (
    <>
      <div className={'craftFilter-container'}>
        <div className={'craftFilter-buttons-container'}>
          <button
            id={'outdoor-btn'}
            className={determineContentButtonClass('outdoor')}
            onClick={() => selectedContent('outdoor')}
          >
            {t('Outdoor')}
          </button>

          <button
            id={'person-btn'}
            className={determineContentButtonClass('person')}
            onClick={() => selectedContent('person')}
          >
            {t('Craftperson')}
          </button>

          <button
            id={'craft-btn'}
            className={determineContentButtonClass('craft')}
            onClick={() => selectedContent('craft')}
          >
            {t('Craft')}
          </button>

          <button
            id={'indoor-btn'}
            className={determineContentButtonClass('indoor')}
            onClick={() => selectedContent('indoor')}
          >
            {t('Indoor')}
          </button>

          <button
            id={'all-content-btn'}
            className={determineContentButtonClass('all')}
            onClick={() => selectedContent('all')}
          >
            {t('Select All')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ContentFilter;
