// import { } from '../../lib/apiUtils';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ImageFeed from '../discover/ImageFeed';
import ImageFilter from '../discover/ImageFilter';
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 687, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 688 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

const DiscoverLayout = ({ children }) => {
  const router = useRouter();
  const [workshops, setWorkshops] = useState([]);
  const [archive, setArchive] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showFilter, setFilter] = useState(false);

  const [numberCrafts, setNumber] = useState(7);
  const [filteredCraftsImage, setCrafts] = useState(["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"]);
  const [startYearImage, setStartYear] = useState(1900);
  const [endYearImage, setEndYear] = useState(2030);
  const [toggleImage, setToggle] = useState(false)



  useEffect(() => {
    console.log('fetching');

    Promise.all([fetch('/api/workshops'), fetch('/api/archive')]).then(
      ([workshopsResponse, archiveResponse]) => {
        Promise.all([workshopsResponse.json(), archiveResponse.json()]).then(
          ([workshopsData, archiveData]) => {
            setWorkshops(workshopsData.response);
            setArchive(archiveData.response);
          }
        );
      }
    );
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
  }

  const updateCrafts = (craftData) => {
      setCrafts(craftData);
      setNumber(craftData.length)
       }

  const updateYears = (yearData) => {
      setStartYear(yearData[0]);
      setEndYear(yearData[1])
  }

  const updateToggle = (toggleData) => {
      setToggle(toggleData)
    }


  const handleReset = () => {
      console.log("reset")

      setCrafts(["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"])
      setNumber(7)
      setStartYear(1920)
      setEndYear(2030)
      setToggle(false)

  }

  const handleClose = () => {
      setFilter(false)
  }

    const filterData = {
                'filteredCrafts' : filteredCraftsImage,
                'filteredStartYear' : startYearImage,
                'filteredEndYear' : endYearImage,
                'filteredToggleStatus' : toggleImage,
            }


  return (
    <>
        <Desktop>
          <Head>
            <title>Discover | Intangible Heritage Atlas</title>
          </Head>
          <div className="container">
            <div className="title-card">
              <div className="text-container">
                <h1>DISCOVER</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>

              <button className={'reset-btn image-filter-btn'} onClick={expandFilter}>Filter By</button>
            </div>
            <hr />
            {showFilter ?
                <ImageFilter
                  filteredCrafts={filteredCraftsImage}
                  startYear={startYearImage}
                  endYear={endYearImage}
                  toggleStatus={toggleImage}
                  updateCrafts={updateCrafts}
                  updateYears={updateYears}
                  updateToggle={updateToggle}
                  reset={handleReset}

                />
                : null}
            <ImageFeed
              objects={workshops.concat(archive)}
              selectedCard={selectedCard}
              onCloseCard={resetSelected}
              onExpandCard={handleExpand}
              imageFilterData={filterData}

            />
          </div>
          {children}
            </Desktop>

      <Mobile>
                    <Head>
            <title>Discover | Intangible Heritage Atlas</title>
          </Head>
          <div className="container">
            <div className="title-card">
              <div className="text-container">
                <h1>DISCOVER</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>

              <button className={'reset-btn image-filter-btn'} onClick={expandFilter}>Filter By</button>
            </div>
            <hr />
            {showFilter ?
                <ImageFilter
                  filteredCrafts={filteredCraftsImage}
                  startYear={startYearImage}
                  endYear={endYearImage}
                  toggleStatus={toggleImage}
                  updateCrafts={updateCrafts}
                  updateYears={updateYears}
                  updateToggle={updateToggle}
                  reset={handleReset}
                  close={handleClose}

                />
                : null}
            <ImageFeed
              objects={workshops.concat(archive)}
              selectedCard={selectedCard}
              onCloseCard={resetSelected}
              onExpandCard={handleExpand}
              imageFilterData={filterData}

            />
          </div>
          {children}



      </Mobile>



        </>

  );
};

// /* Retrieves workshops data from mongodb database */
// export async function getStaticProps() {
//   const workshops = await getAllWorkshops({ lean: true });
//   const archive = await getAllArchives({ lean: true, visualOnly: true });
//   return { props: { workshops, archive } };
// }

export default DiscoverLayout;
