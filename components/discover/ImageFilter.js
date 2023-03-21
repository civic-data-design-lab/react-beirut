import React from 'react';
import CraftFilter from '../filterparts/CraftFilter';
import ContentFilter from '../filterparts/ContentFilter';
import YearFilter from '../filterparts/YearFilter';
import ActiveFilter from '../filterparts/ActiveFilter';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import Info from '../Info';
import SearchBar from '../Map/SearchBar';
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

const ImageFilter = ({
  filteredCrafts,
  startYear,
  endYear,
  toggleWorkshopStatus,
  toggleArchiveStatus,
  updateWorkshopToggle,
  updateArchiveToggle,
  filteredContent,
  updateContent,

  resetWorkshopToggle,
  resetArchiveToggle /**/,
  updateCrafts,
  updateYears,
  reset,
  close,
  i18n,
  searchValue,
  searchCallBack,
}) => {
  const { t } = useTranslation();

  const getImageFilterContent = () => {
    return (
      <>
        <div
          className={'image-filter-section'}
          style={{
            flexBasis: '35%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
          }}
        >
          <div>
            <p>{t('Craft Type')}</p>
            <hr />
            <CraftFilter
              filteredCrafts={filteredCrafts}
              updateCrafts={updateCrafts}
            />
          </div>
          <div>
            <p>{t('Image Content')}</p>
            <hr />
            <ContentFilter
              filteredContent={filteredContent}
              updateContent={updateContent}
            />
          </div>
        </div>
        <div className={'image-filter-section'} style={{ flexBasis: '35%' }}>
          <p>
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
          <hr />
          <YearFilter
            startYear={startYear}
            endYear={endYear}
            updateYears={updateYears}
          />
        </div>
        <div
          className={'image-filter-section image-filter-section-col'}
          style={{ flexBasis: '30%' }}
        >
          <div
            style={{
              display: 'flex',
              rowGap: '0.5rem',
              flexDirection: 'column',
            }}
          >
            <p>{t('Data Type')}</p>
            <div className={`image-filter-toggle-section`}>
              <ActiveFilter
                toggleStatus={toggleWorkshopStatus}
                updateToggle={updateWorkshopToggle}
                resetToggle={resetWorkshopToggle}
                forWorkshops={true}
              />
              <p>{t('Show Crafts Workshops')}</p>
            </div>

            <div className={`image-filter-toggle-section`}>
              <ActiveFilter
                toggleStatus={toggleArchiveStatus}
                updateToggle={updateArchiveToggle}
                resetToggle={resetArchiveToggle}
                forWorkshops={false}
              />
              <p>{t('Show Archival Images')}</p>
            </div>
          </div>
          <SearchBar
            callBack={searchCallBack}
            placeHolder={'Search for Craft Workshops and Images'}
            value={searchValue}
            map={false}
          />
          <div>
            <button className={'reset-btn card-labels'} onClick={reset}>
              {t('Reset Filters')}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Desktop>
        <div className={'image-filter detach'}>
          <div className={'image-filter-container'}>
            {getImageFilterContent()}
          </div>
        </div>
      </Desktop>

      <Tablet>
        <div className={'image-filter-container detach'}>
          {getImageFilterContent()}
        </div>
      </Tablet>

      <Mobile>
        <div className="card">
          <div className="card__cover">
            <div className="card__wrapper">
              <div className={'image-filter-container'}>
                <div className={'close-btn-container'}>
                  <p
                    className={'card-section-labels'}
                    style={{ fontWeight: 600 }}
                  >
                    {t('Filter By')}
                  </p>
                  <button className={'close-card-btn'} onClick={close}>
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
                  <p className={'card-section-labels'}>{t('Time Range')}</p>
                  <YearFilter
                    startYear={startYear}
                    endYear={endYear}
                    updateYears={updateYears}
                  />
                </div>
                <hr />
                <div
                  className={'d-flex flex-column w-100'}
                  style={{ rowGap: '.25rem' }}
                >
                  <div className={`image-filter-toggle-section`}>
                    <p>{t('Show Crafts Workshops')}</p>
                    <ActiveFilter
                      toggleStatus={toggleWorkshopStatus}
                      updateToggle={updateWorkshopToggle}
                      resetToggle={resetWorkshopToggle}
                      forWorkshops={true}
                    />
                  </div>

                  <div className={`image-filter-toggle-section`}>
                    <p>{t('Show Archival Images')}</p>
                    <ActiveFilter
                      toggleStatus={toggleArchiveStatus}
                      updateToggle={updateArchiveToggle}
                      resetToggle={resetArchiveToggle}
                      forWorkshops={false}
                    />
                  </div>
                </div>
                <SearchBar
                  callBack={searchCallBack}
                  placeHolder={'Search for Craft Workshops and Images'}
                  value={searchValue}
                  map={false}
                />
                <hr />
                <div className={'card-section-centered'}>
                  <button className={'reset-btn card-labels'} onClick={reset}>
                    {t('Reset')}
                  </button>
                </div>
                <div className={'card-section-centered'}>
                  <button className={'btn-pill view-map-btn'} onClick={close}>
                    <span className={'view-map-label'}>{t('View Images')}</span>
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

export default ImageFilter;
