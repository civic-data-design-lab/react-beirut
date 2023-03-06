// import { } from '../../lib/apiUtils';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ImageFeed from '../../components/discover/ImageFeed';
import ImageFilter from '../../components/discover/ImageFilter';
import { useMediaQuery } from 'react-responsive';

import { getAllWorkshops, getAllArchives } from '../../lib/apiUtils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

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

const Discover = ({ children, i18n }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [workshops, setWorkshops] = useState([]);
  const [archive, setArchive] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showFilter, setFilter] = useState(false);

  const [numberCrafts, setNumber] = useState(7);
  const [filteredCraftsImage, setCrafts] = useState([
    'architectural',
    'cuisine',
    'decorative',
    'fashion',
    'functional',
    'furniture',
    'textiles',
  ]);
  const [startYearImage, setStartYear] = useState(1890);
  const [endYearImage, setEndYear] = useState(2030);

  const [toggleWorkshopImage, setWorkshopToggle] = useState(true);
  const [resetWorkshopToggleImage, setResetWorkshopToggle] = useState(false);

  const [toggleArchiveImage, setArchiveToggle] = useState(true);
  const [resetArchiveToggleImage, setResetArchiveToggle] = useState(false);

  const [search, setSearch] = useState('');

  const storeScrollPosition = (scrollPos) => {
    // console.log("saved ", scrollPos)
    sessionStorage.setItem('prevScrollPos', scrollPos);
  };

  const storeSearch = (search) => {
    sessionStorage.setItem('prevSearch', search);
  };

  const stopScroll = () => {
    const prevPos = sessionStorage.getItem('prevScrollPos');
    if (prevPos && parseInt(prevPos) === window.scrollY) {
      sessionStorage.removeItem('prevScrollPos');
    }
  };

  useEffect(() => {
    console.log(toggleWorkshopImage);
    console.log(toggleArchiveImage);
  });

  useEffect(() => {
    console.log('fetching');

    Promise.all([fetch('/api/workshops'), fetch('/api/archive')]).then(
      ([workshopsResponse, archiveResponse]) => {
        Promise.all([workshopsResponse.json(), archiveResponse.json()])
          .then(([workshopsData, archiveData]) => {
            setWorkshops(workshopsData.response);
            setArchive(archiveData.response);
          })
          .then(() => {
            if (navigator.cookieEnabled) {
              const prevFilterCrafts =
                sessionStorage.getItem('prevFilterCrafts');
              const prevFilterStartYear = sessionStorage.getItem(
                'prevFilterStartYear'
              );
              const prevFilterEndYear =
                sessionStorage.getItem('prevFilterEndYear');
              const prevFilterWorkshopToggle = sessionStorage.getItem(
                'prevFilterWorkshopToggle'
              );
              const prevFilterArchiveToggle = sessionStorage.getItem(
                'prevFilterArchiveToggle'
              );
              if (prevFilterCrafts) {
                setCrafts(JSON.parse(prevFilterCrafts));
              }
              if (prevFilterStartYear) {
                setStartYear(JSON.parse(prevFilterStartYear));
              }
              if (prevFilterEndYear) {
                setEndYear(JSON.parse(prevFilterEndYear));
              }
              if (prevFilterWorkshopToggle) {
                setWorkshopToggle(JSON.parse(prevFilterWorkshopToggle));
              }

              if (prevFilterArchiveToggle) {
                setArchiveToggle(JSON.parse(prevFilterArchiveToggle));
              }

              const filterShow = sessionStorage.getItem('showFilter');
              if (filterShow) {
                console.log('toggle ', JSON.parse(filterShow));
                setFilter(JSON.parse(filterShow));
              }

              const prevScrollPos = sessionStorage.getItem('prevScrollPos');
              console.log('prev scroll pos ', prevScrollPos);
              if (prevScrollPos) {
                // $('#content').animate({ scrollTop: elementOffset }, 200);
                // window.scrollTo({ top: parseFloat(prevScrollPos), behavior: 'smooth' })
                try {
                  document.getElementById(prevScrollPos).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                  });
                  sessionStorage.removeItem('prevScrollPos');
                } catch (e) {
                  console.log("can't scroll here yet");
                }
              }
            }

            const prevSearch = sessionStorage.getItem('prevSearch');
            console.log('prevSearch Exists! ', prevSearch);
            if (prevSearch) {
              setSearch(prevSearch);
            }
          });
      }
    );

    console.log('done fetching');

    //window.addEventListener("scroll", stopScroll)

    //return () => {
    //  window.removeEventListener('scroll', stopScroll);
    //};
  }, []);

  useEffect(() => {
    const { show } = router.query;
    if (!show) {
      setSelectedCard(null);
      return;
    }

    const card = workshops.find((w) => w.ID === show);
    if (!card) {
      // No card matches that ID
      setSelectedCard(null);
      return;
    }

    setSelectedCard(show);
  }, [router.query.show]);

  const handleExpand = (id) => {
    router.push(`/discover?show=${id}`, undefined, { shallow: true });
  };

  const resetSelected = () => {
    router.push(`/discover`, undefined, { shallow: true });
  };

  const expandFilter = () => {
    setFilter(!showFilter);
    if (navigator.cookieEnabled) {
      sessionStorage.setItem('showFilter', JSON.stringify(!showFilter));
    }
  };

  const updateCrafts = (craftData) => {
    setCrafts(craftData);
    setNumber(craftData.length);
  };

  const updateYears = (yearData) => {
    setStartYear(yearData[0]);
    setEndYear(yearData[1]);
  };

  const updateWorkshopToggle = (toggleData) => {
    if (!toggleArchiveImage && !toggleData) {
      setArchiveToggle(true);
      setResetArchiveToggle(!resetArchiveToggleImage);
      sessionStorage.setItem('prevFilterArchiveToggle', 'true');
    }
    setWorkshopToggle(toggleData);
  };

  const updateArchiveToggle = (toggleData) => {
    if (!toggleWorkshopImage && !toggleData) {
      setWorkshopToggle(true);
      setResetWorkshopToggle(!resetWorkshopToggleImage);
      sessionStorage.setItem('prevFilterWorkshopToggle', 'true');
    }
    setArchiveToggle(toggleData);
  };

  const handleReset = () => {
    console.log('RESET');

    setResetWorkshopToggle(!resetWorkshopToggleImage);
    setResetArchiveToggle(!resetArchiveToggleImage);
    setCrafts([
      'architectural',
      'cuisine',
      'decorative',
      'fashion',
      'functional',
      'furniture',
      'textiles',
    ]);
    setNumber(7);
    setStartYear(1890);
    setEndYear(2030);
    setWorkshopToggle(true);
    setArchiveToggle(true);

    const resetKeys = [
      'prevFilterCrafts',
      'prevFilterStartYear',
      'prevFilterEndYear',
      'prevFilterToggle',
    ];
    resetKeys.map((key) => {
      sessionStorage.removeItem(key);
    });
  };

  const handleClose = () => {
    setFilter(false);
    if (navigator.cookieEnabled) {
      sessionStorage.setItem('showFilter', JSON.stringify(false));
    }
  };

  const filterData = {
    filteredCrafts: filteredCraftsImage,
    filteredStartYear: startYearImage,
    filteredEndYear: endYearImage,
    filteredToggleWorkshopStatus: toggleWorkshopImage,
    filteredToggleArchiveStatus: toggleArchiveImage,
  };

  return (
    <>
      <Head>
        <title>Discover | Living Heritage Atlas</title>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0"
        />
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            {/* <h1 className={'discover-text'}>{t('Discover')}</h1> */}
            <p className={'discover-text'}>
              {t(
                'Discover local workshops and archival images of craftsmanship in the Living Heritage Atlas | Beirut database'
              )}
            </p>
          </div>

          <button
            className={'reset-btn image-filter-btn discover-text'}
            onClick={expandFilter}
          >
            <Desktop>
              <div className={'filter-section'}>
                <p>{t('Filter By')}</p>
              </div>

              <span className={'filter-section'}>
                {showFilter ? (
                  <FontAwesomeIcon icon={faChevronUp} width={'1em'} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} width={'1em'} />
                )}
              </span>
            </Desktop>

            <Tablet>
              <div className={'filter-section'}>
                <p>{t('Filter By')}</p>
              </div>

              <span className={'filter-section'}>
                {showFilter ? (
                  <FontAwesomeIcon icon={faChevronUp} width={'1em'} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} width={'1em'} />
                )}
              </span>
            </Tablet>

            <Mobile>
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 0L0 2L18 2V0L0 0ZM7 12H11V10H7V12ZM15 7L3 7V5L15 5V7Z"
                  fill="#AEAEAE"
                />
              </svg>
            </Mobile>
          </button>
        </div>
        <hr />
        <div className={'discover-card'}>
          {showFilter ? (
            <ImageFilter
              filteredCrafts={filteredCraftsImage}
              startYear={startYearImage}
              endYear={endYearImage}
              toggleWorkshopStatus={toggleWorkshopImage}
              toggleArchiveStatus={toggleArchiveImage}
              updateWorkshopToggle={updateWorkshopToggle}
              updateArchiveToggle={updateArchiveToggle}
              resetWorkshopToggle={resetWorkshopToggleImage}
              resetArchiveToggle={resetArchiveToggleImage}
              updateCrafts={updateCrafts}
              updateYears={updateYears}
              reset={handleReset}
              close={handleClose}
              i18n={i18n}
              searchValue={search}
              searchCallBack={(input) => {
                console.log(input);
                if (navigator.cookieEnabled) {
                  console.log('saving input as ', input);
                  setSearch(input);
                  storeSearch(input);
                }
                setSearch(input);
              }}
            />
          ) : null}

          {workshops[0] ? (
            <ImageFeed
              objects={workshops.concat(archive)}
              // selectedCard={selectedCard}
              // onCloseCard={resetSelected}
              // onExpandCard={handleExpand}
              imageFilterData={filterData}
              imageSearchData={search}
              storeScrollPosition={storeScrollPosition}
            />
          ) : (
            <>
              <div className="loader" />
              <br />
              <p>{t('Loading Workshops and Archival Images')}</p>
            </>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

/* Retrieves workshops data from mongodb database */
export async function getStaticProps() {
  const workshops = await getAllWorkshops({ lean: true });
  const archive = await getAllArchives({ lean: true, visualOnly: true });
  return { props: { workshops, archive } };
}

export default Discover;
