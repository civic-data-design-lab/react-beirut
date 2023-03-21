import React, { useState } from 'react';
import CraftFilter from '../filterparts/CraftFilter';
import YearFilter from '../filterparts/YearFilter';
import ContentFilter from '../filterparts/ContentFilter';
import ActiveFilter from '../filterparts/ActiveFilter';
import Card from '../Card';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import Info from '../Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 687, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 688 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const MapFilter = ({
  filteredCrafts,
  startYear,
  endYear,
  toggleWorkshopStatus,
  toggleArchiveStatus,
  search,
  updateCrafts,
  updateYears,
  updateWorkshopToggle,
  updateArchiveToggle,
  closeFilter,
  triggerReset,
  reset,
  toggleWorkshopReset,
  toggleArchiveReset,
  updateContent,
  filteredContent,
}) => {
  const { t } = useTranslation();
  const filterCardContent = () => {
    return (
      <>
        <div className={'close-btn-container'}>
          <p className={'card-labels'}>{t('Filter By')}</p>
          <button
            className={'close-card-btn close-mapcard'}
            onClick={closeFilter}
          >
            <FontAwesomeIcon icon={faXmark} size={'sm'} />
          </button>
        </div>
        <hr />
        <div className={'card-section'}>
          <p className={'card-section-labels'}>{t('Craft Type')}</p>
          <CraftFilter
            filteredCrafts={filteredCrafts}
            updateCrafts={updateCrafts}
          />
        </div>
        <hr />
        <div className={'card-section'}>
          <p className={'card-section-labels'}>{t('Image Content')}</p>
          <ContentFilter
            filteredContent={filteredContent}
            updateContent={updateContent}
          />
        </div>
        <hr />
        <div className={'card-section'}>
          <p className={'card-section-labels'}>
            {t('Time Range')} &thinsp;
            <span>
              <Info
                icon={'info'}
                text={
                  'Archival images will be filtered by the year they were taken while craft workshops will be filtered by the year they were established.'
                }
              />
            </span>
          </p>

          <YearFilter
            startYear={startYear}
            endYear={endYear}
            updateYears={updateYears}
          />
        </div>
        <hr />
        <p className={'card-section-labels'}>{t('Data Type')}</p>

        <div className="toggle-section-container">
          <div className={'toggle-section'}>
            <ActiveFilter
              toggleStatus={toggleWorkshopStatus}
              updateToggle={updateWorkshopToggle}
              resetToggle={toggleWorkshopReset}
              forWorkshops={true}
            />
            <p className={'card-section-labels'}>{t('Show craft workshops')}</p>
          </div>
          <div className={'toggle-section'}>
            <ActiveFilter
              toggleStatus={toggleArchiveStatus}
              updateToggle={updateArchiveToggle}
              resetToggle={toggleArchiveReset}
              forWorkshops={false}
            />
            <p className={'card-section-labels'}>{t('Show archival images')}</p>
          </div>
        </div>
        <hr />
        <div className={'card-section-centered'}>
          <button className={'reset-btn card-labels'} onClick={reset}>
            {' '}
            {t('Reset Filters')}{' '}
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Desktop>
        <div className={'filterCard'}>{filterCardContent()}</div>
      </Desktop>

      <Tablet>
        <div className={'filterCard'}>{filterCardContent()}</div>
      </Tablet>

      <Mobile>
        <div className="card">
          <div className="card__cover">
            <div className="card__wrapper">
              <div className="filterCard animateCard">
                {filterCardContent()}
                <div className={'card-section-centered'}>
                  <button
                    className={'btn-pill view-map-btn'}
                    onClick={closeFilter}
                  >
                    <span className={'view-map-label'}>{t('View Map')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default MapFilter;
