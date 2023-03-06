import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getAllArchives, getAllWorkshops } from '../../lib/apiUtils';
import MapFilter from '../../components/Map/MapFilter';
import React from 'react';
import Legend from '../../components/Map/Legend';
import MapCard from '../../components/Map/MapCard';
import LayersControl from '../../components/Map/LayersControl';
import { useMediaQuery } from 'react-responsive';

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

const Map = dynamic(() => import('../../components/Map/Map'), {
  loading: () => 'Loading...',
  ssr: false,
});

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.updateCrafts = this.updateCrafts.bind(this);
    this.updateYears = this.updateYears.bind(this);
    this.updateWorkshopToggle = this.updateWorkshopToggle.bind(this);
    this.updateArchiveToggle = this.updateArchiveToggle.bind(this);

    this.state = {
      mapLayer: null,
      allLayers: {
        1: [
          '1876',
          'Löytved, J., Stuckly, A. (1876). ',
          'a639tump',
          [35.501735813111736, 33.89746631938645],
          15.38818825030279,
          'Map of Beirut dedicated to His Imperial Majesty Sultan Abdul Hamid II',
          ' (Trans.). Item GE D 16879, (60 x 35cm), C Register. National Library of France. Paris, France.',
        ],
        2: [
          '1919',
          "Service Géographique de l'Armée. Éditeur Scientifique. (1919). ",
          '1elupriz',
          [35.498677035021956, 33.893437188342475],
          13.785065425449796,
          'Map of Beirut (Provisional Edition)',
          ' (Trans.). Item GE SH 19 PF 1 QUATER DIV 16 P 17 (2), (76 x 91cm). National Library of France, Departments of Maps and Plans. Paris, France.',
        ],
        3: [
          '1920',
          'Armée Française du Levant. Bureau Topographique. (1920).  ',
          '67ffz8i7',
          [35.505290624632835, 33.88882411869989],
          13.639303743791698,
          'Beirut',
          '(Trans.). Item GE C-5752, (82 x 57cm). National Library of France, Departments of Maps and Plans. Paris, France.',
        ],
        4: [
          '1945',
          'Institut Géographique National. (1945). ',
          '1945_cropped',
          [35.50229661568903, 33.8893239106455],
          13.739534370107044,
          'City of Beirut',
          " (Trans.). Item MAP G7474.B4 1945.I5, (53 x 72cm). Black and white reprint of the original map. MIT Rotch Library. Cambridge (MA), USA.', '1945_cropped",
        ],
        5: [
          '1958',
          'US Army Corps of Engineers. Army Map Service (1984). ',
          '28tahetd',
          [35.49966548072621, 33.890504692600885],
          13.731385906406157,
          'Beirut',
          ' (Trans.). Item Series K921 Sheet Beyrouth Editions 6-AMS. The Perry-Castañeda Library (PCL) Map Collection. The University of Texas. Austin (TX), USA.',
        ],
        6: [
          '1984',
          'Geoprojects (U.K.) Ltd. (1984). ',
          '1984',
          [35.50586102530747, 33.89044326579804],
          13.709053598967705,
          'Beirut',
          ' (Trans.). Item MAP G7474.B4P2 1984.G4, (51 x 73cm). Black and white reprint of the original map printed in Henley-on-Thames, England. MIT Rotch Library. Cambridge (MA), USA.',
        ],
      },
      toggleWorkshopReset: false,
      toggleArchiveReset: false,
      filteredCraftsParent: [
        'architectural',
        'cuisine',
        'decorative',
        'fashion',
        'functional',
        'furniture',
        'textiles',
      ],
      startYearParent: 1890,
      endYearParent: 2030,
      toggleWorkshopParent: true,
      toggleArchiveParent: true,
      search: '',
      on: false,
      showMapCard: false,
      id: null,
      type: null,
      workshop: null,
      showLayersControl: false,
      // mapCenter : [0,0],
      mapZoom: 13.25,
      coords: [35.51, 33.893894], //[35.510, 33.893894],
      width: null,
      swiping: null,
      setSwiping: false,
    };
  }

  setCoords = (coords) => {
    this.setState({ coords: coords });
  };

  setSwiping = (y) => {
    this.setState({ swiping: y });
  };

  updateMapLayer = (mapLayer) => {
    if (mapLayer === this.state.mapLayer) {
      this.setState({ mapLayer: null });
    } else {
      this.setState({ mapLayer: mapLayer });
    }
  };

  updateCrafts = (craftData) => {
    this.setState({
      filteredCraftsParent: craftData,
    });
  };

  updateYears = (yearData) => {
    this.setState({
      startYearParent: yearData[0],
      endYearParent: yearData[1],
    });
  };

  updateWorkshopToggle = (toggleData) => {
    if (!this.state.toggleArchiveParent && !toggleData) {
      this.setState({
        toggleArchiveParent: true,
        toggleArchiveReset: !this.state.toggleArchiveReset,
      });
    }

    this.setState({
      toggleWorkshopParent: toggleData,
    });
  };

  updateArchiveToggle = (toggleData) => {
    if (!this.state.toggleWorkshopParent && !toggleData) {
      this.setState({
        toggleWorkshopParent: true,
        toggleWorkshopReset: !this.state.toggleWorkshopReset,
      });
    }

    this.setState({
      toggleArchiveParent: toggleData,
    });
  };

  toggleFilterPanel = () => {
    this.setState({ on: !this.state.on }, () =>
      this.state.on ? this.setState({ showLayersControl: false }) : null
    );
  };

  closeFilter = () => {
    this.setState({ on: false });
  };

  triggerReset = () => {
    this.setState({
      filteredCraftsParent: [
        'architectural',
        'cuisine',
        'decorative',
        'fashion',
        'functional',
        'furniture',
        'textiles',
      ],
      startYearParent: 1890,
      endYearParent: 2030,
      toggleParent: false,
    });
  };

  openMapCard = (id, type) => {
    if (this.state.showMapCard) {
      if (this.state.id === id) {
        this.setState({
          showMapCard: false,
          id: null,
          type: null,
          coords: false,
        });
      } else {
        this.setState({ showMapCard: true, id: id, type: type }, () => {
          if (this.state.type === 'workshop') {
            fetch(`/api/workshops/${this.state.id}`)
              .then((res) => res.json())
              .then((res) => this.setState({ workshop: res['response'] }))
              .then(() => {
                try {
                  this.setState({
                    coords: [
                      this.state.workshop.location.geo.lng,
                      this.state.workshop.location.geo.lat,
                    ],
                  });
                } catch (e) {
                  console.error('could not set coordinates state');
                }
              });
          } else {
            fetch(`/api/archive/${this.state.id}`)
              .then((res) => res.json())
              .then((res) => this.setState({ workshop: res['response'] }))
              .then(() => {
                try {
                  this.setState({
                    coords: [
                      this.state.workshop.primary_location.geo.lng,
                      this.state.workshop.primary_location.geo.lat,
                    ],
                  });
                } catch (e) {
                  console.error('could not set coordinates state');
                }
              });
          }
        });
      }
    } else {
      this.setState({ showMapCard: true, id: id, type: type }, () => {
        if (this.state.type === 'workshop') {
          fetch(`/api/workshops/${this.state.id}`)
            .then((res) => res.json())
            .then((res) => this.setState({ workshop: res['response'] }))
            .then(() =>
              this.setState({
                coords: [
                  this.state.workshop.location.geo['lng'],
                  this.state.workshop.location.geo['lat'],
                ],
              })
            );
        } else {
          fetch(`/api/archive/${this.state.id}`)
            .then((res) => res.json())
            .then((res) => this.setState({ workshop: res['response'] }))
            .then(() =>
              this.setState({
                coords: [
                  this.state.workshop.primary_location.geo['lng'],
                  this.state.workshop.primary_location.geo['lat'],
                ],
              })
            );
        }
      });
    }
  };
  setMapZoom = (zoom) => {
    this.setState({
      mapZoom: zoom,
    });
  };

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    if (window.innerWidth > 991) {
      this.setState({ mapZoom: 13.5 });
      return 13.5;
    } else if (window.innerWidth > 688) {
      this.setState({ mapZoom: 12.5 });
      return 12.5;
    } else {
      this.setState({ mapZoom: 11.5 });
      return 11.5;
    }

    if (!this.state.showMapCard) {
      {
        this.setState({
          coords: [35.51, 33.893894],
        });
      }
    }
  };

  closeMapCard = () => {
    this.setState({ showMapCard: false, id: null, coords: false });
  };

  toggleLayersControl = () => {
    this.setState({ showLayersControl: !this.state.showLayersControl }, () =>
      this.state.showLayersControl ? this.setState({ on: false }) : null
    );
  };

  openLayersControl = () => {
    this.setState({ on: false, id: null, showLayersControl: true });
  };

  closeLayersControl = () => {
    this.setState({ showLayersControl: false });
  };

  setMapLayerSettings = (coords, zoom) => {
    this.setState({ coords: coords, mapZoom: zoom });
  };

  onReset = () => {
    this.setState({
      filteredCraftsParent: [
        'architectural',
        'cuisine',
        'decorative',
        'fashion',
        'functional',
        'furniture',
        'textiles',
      ],
      startYearParent: 1890,
      endYearParent: 2030,
      toggleWorkshopParent: true,
      toggleArchiveParent: true,
      toggleWorkshopReset: !this.state.toggleWorkshopReset,
      toggleArchiveReset: !this.state.toggleArchiveReset,
    });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const filterSearchData = {
      filteredCraftsParent: this.state.filteredCraftsParent,
      startYearParent: this.state.startYearParent,
      endYearParent: this.state.endYearParent,
      toggleStatusParent: this.state.toggleParent,
      search: this.state.search,
    };

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="viewport-fit=cover, width=device-width, initial-scale=1.0"
          />
          <title>Map | Living Heritage Atlas</title>
        </Head>
        <div className={'explore-page-container'}>
          <Map
            i18n={this.props.i18n}
            showMapCard={this.state.showMapCard}
            lang={this.props.lang}
            setMapLayerSettings={this.setMapLayerSettings}
            closeMapCard={this.closeMapCard}
            setMapZoom={this.setMapZoom}
            mapZoom={this.state.mapZoom}
            handleResize={this.handleResize}
            mapCenter={this.state.mapCenter}
            allLayers={this.state.allLayers}
            mapLayer={this.state.mapLayer}
            workshops={this.props.workshops}
            archives={this.props.archives}
            search={this.state.search}
            numberCrafts={this.state.filteredCraftsParent.length}
            toggleWorkshopStatus={this.state.toggleWorkshopParent}
            toggleArchiveStatus={this.state.toggleArchiveParent}
            startYear={this.state.startYearParent}
            endYear={this.state.endYearParent}
            filteredCrafts={this.state.filteredCraftsParent}
            openMapCard={this.openMapCard}
            coords={this.state.coords}
            id={this.state.id}
            setSwiping={this.setSwiping}
          />
          {this.state.on ? (
            <MapFilter
              filteredCrafts={this.state.filteredCraftsParent}
              startYear={this.state.startYearParent}
              endYear={this.state.endYearParent}
              search={this.state.search}
              updateCrafts={this.updateCrafts}
              updateYears={this.updateYears}
              closeFilter={this.closeFilter}
              triggerReset={this.triggerReset}
              reset={this.onReset}
              updateWorkshopToggle={this.updateWorkshopToggle}
              updateArchiveToggle={this.updateArchiveToggle}
              toggleWorkshopStatus={this.state.toggleWorkshopParent}
              toggleArchiveStatus={this.state.toggleArchiveParent}
              toggleWorkshopReset={this.state.toggleWorkshopReset}
              toggleArchiveReset={this.state.toggleArchiveReset}
            />
          ) : null}

          <div className={'filterSection'}>
            <button
              className={'filterButton filterSettingsButton btn-interactivity'}
              onClick={this.toggleFilterPanel}
            >
              <span style={{ color: 'blue' }}>
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
                    fill="white"
                  />
                </svg>
              </span>
            </button>
            <button
              className={'filterButton layerControlButton btn-interactivity'}
              onClick={this.toggleLayersControl}
            >
              <svg
                width="24"
                height="27"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.8133 11.6937L12 19.3337L2.17333 11.6937L0 10.0003L12 0.666992L24 10.0003L21.8133 11.6937ZM2.16 15.0803L11.9867 22.7203L21.8267 15.067L24 16.7603L12 26.0937L0 16.7603L2.16 15.0803Z"
                  fill="#AEAEAE"
                />
              </svg>
            </button>
          </div>

          {this.state.showMapCard &&
          this.state.workshop &&
          this.state.workshop.images ? (
            <MapCard
              id={this.state.id}
              type={this.state.type}
              workshop={this.state.workshop}
              closeMapCard={this.closeMapCard}
              openMapCard={this.openMapCard}
              i18n={this.props.i18n}
              swiping={this.state.swiping}
              setSwiping={this.setSwiping}
            />
          ) : null}

          {this.state.showLayersControl ? (
            <LayersControl
              currentLayer={this.state.mapLayer}
              allLayers={this.state.allLayers}
              updateMapLayer={this.updateMapLayer}
              closeLayersControl={this.closeLayersControl}
            />
          ) : null}

          {!this.state.showLayersControl && !this.state.on ? (
            <Legend width={this.state.width} />
          ) : null}
        </div>
      </>
    );
  }
}

/* Retrieves workshops data from mongodb database */

export async function getServerSideProps() {
  const workshops = await getAllWorkshops();
  const archives = await getAllArchives();
  return { props: { workshops, archives } };
}
