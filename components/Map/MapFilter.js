import React, { useState } from 'react';
import CraftFilter from '../filterparts/CraftFilter';
import YearFilter from '../filterparts/YearFilter';
import ContentFilter from '../filterparts/ContentFilter';
import ActiveFilter from '../filterparts/ActiveFilter';
import Card from '../Card';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import Info from '../Info';

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
          <button className={'close-card-btn'} onClick={closeFilter}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#404044"
              />
            </svg>
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
        <div className="toggle-section-container">
          <div className={'toggle-section'}>
            <p className={'card-section-labels'}>{t('Show craft workshops')}</p>
            <ActiveFilter
              toggleStatus={toggleWorkshopStatus}
              updateToggle={updateWorkshopToggle}
              resetToggle={toggleWorkshopReset}
              forWorkshops={true}
            />
          </div>
          <div className={'toggle-section'}>
            <p className={'card-section-labels'}>{t('Show archival images')}</p>
            <ActiveFilter
              toggleStatus={toggleArchiveStatus}
              updateToggle={updateArchiveToggle}
              resetToggle={toggleArchiveReset}
              forWorkshops={false}
            />
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
