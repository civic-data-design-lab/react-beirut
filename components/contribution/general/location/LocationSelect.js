import mapboxGl from 'mapbox-gl';
import React from 'react';
import Dialogue from '../Dialogue';
import { booleanWithin } from '@turf/turf';
import { point, polygon } from '@turf/helpers';
import { MAPBOX_STYLE_URL } from '../../../../lib/utils';
import mapboxGL from 'mapbox-gl/dist/mapbox-gl-unminified';
import SearchBar from '../../../Map/SearchBar';
import MapSearchBar from '../../../MapSearchBar';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAP_LABELS = [
  'road-label',
  'road-intersection',
  'waterway-label',
  'natural-line-label',
  'natural-point-label',
  'water-line-label',
  'water-point-label',
  'poi-label',
  'airport-label',
  'settlement-subdivision-label',
  'settlement-minor-label',
  'settlement-major-label',
  'state-label',
  'country-label',
];

let markerRef;

const lebanon = polygon([
  [
    [33.860897, 35.450896],
    [33.916889, 35.450896],
    [33.916889, 35.574654],
    [33.860897, 35.574654],
    [33.860897, 35.450896],
  ],
]);

function checkInLebanon(coord) {
  console.log('coord ', coord);
  const p = point([coord.longitude, coord.latitude]);
  return booleanWithin(p, lebanon);
}

export default class LocationSelect extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
    this.searchMap = this.searchMap.bind(this);
    this.toSearch = this.toSearch.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.state = {
      search: '',
      geoLocateDialog: null,
      geoLocateTitle: null,
      geoLocateLoader: false,
      lat: '',
      lng: '',
    };
  }

  searchMap = (searchQuery) => {
    this.setState({ search: searchQuery });
  };

  toSearch = (lat, lon) => {
    if (checkInLebanon({ longitude: lon, latitude: lat })) {
      if (markerRef) {
        markerRef.setLngLat([lat, lon]);
        this.props.onUpdate({ lng: lat, lat: lon });
        this.setState({ lat: lat, lng: lon });
      }
      map.current.flyTo({
        center: [lat, lon],
        zoom: 16,
        speed: 0.5, // make the flying slow//
        essential: true,
      });
    }
  };

  componentDidMount() {
    let markerLocation;
    if (
      this.props.formData &&
      this.props.formData.lat &&
      this.props.formData.lng
    ) {
      markerLocation = [this.props.formData.lng, this.props.formData.lat];
    } else {
      markerLocation = [35.5, 33.893894];
    }

    mapboxGl.accessToken = ACCESS_TOKEN;
    if (
      mapboxGL.getRTLTextPluginStatus() !== 'loaded' &&
      mapboxGL.getRTLTextPluginStatus() !== 'deferred'
    ) {
      if (mapboxGl.getRTLTextPluginStatus() === 'unavailable') {
        mapboxGl.setRTLTextPlugin(
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
          null,
          true // Lazy load the plugin
        );
      }
    }
    map.current = new mapboxGl.Map({
      container: 'map', // container ID
      style: MAPBOX_STYLE_URL, // style URL
      center: markerLocation, // starting position [lng, lat]
      zoom: 12, // starting zoom
      // maxZoom: 15,
      minZoom: 10,
      maxBounds: [
        [35.450896, 33.860897],
        [35.574654, 33.916889],
      ],
    });

    MAP_LABELS.forEach((layer) => {
      try {
        map.current.setLayoutProperty(layer, 'text-field', [
          'get',
          `name_${this.props.i18n.language}`,
        ]);
      } catch (e) {}
    });

    const marker = new mapboxGl.Marker({
      draggable: true,
      color: '#85cbd4',
    })
      .setLngLat(markerLocation)
      .addTo(map.current);

    const onDragEnd = () => {
      const lngLat = marker.getLngLat();
      this.props.onUpdate(lngLat);
      this.setState({ lat: lngLat.lat, lng: lngLat.lng });
    };

    marker.on('dragend', onDragEnd);

    markerRef = marker;

    map.current.addControl(new mapboxGL.NavigationControl(), 'bottom-right');
    map.current.addControl(new mapboxGL.FullscreenControl(), 'bottom-right');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.i18n.language !== this.props.i18n.language) {
      map.current.getStyle().layers.forEach((layer) => {
        if (layer.layout && layer.layout['text-field']) {
          map.current.setLayoutProperty(layer.id, 'text-field', [
            'get',
            `name_${this.props.i18n.language}`,
          ]);
        }
      });
    }

    // if (prevState.lat !== this.state.lat || prevState.lng !== this.state.lng) {
    //   if (this.state.lat && this.state.lng && markerRef) {
    //     try {
    //       markerRef.setLngLat([
    //         parseFloat(this.state.lng),
    //         parseFloat(this.state.lat),
    //       ]);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // }
  }

  geolocate = () => {
    console.log('CLICKED GEOLOCATE');
    const success = (position) => {
      console.log('CLICKED GEOLOCATE');

      if (
        !checkInLebanon({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      ) {
        this.setState({
          geoLocateDialog: 'You are not located in Beirut!',
          geoLocateTitle: 'Geolocation Failed',
          geoLocateLoader: false,
        });
      } else {
        this.setState({
          geoLocateDialog: null,
          geoLocateTitle: null,
          geoLocateLoader: false,
        });
        this.toSearch(position.coords.latitude, position.coords.longitude);
      }
    };

    const error = () => {
      console.log('FAILED GEOLOCATE');
      this.setState({
        geoLocateTitle: "We couldn't find you!",
        geoLocateDialog:
          "There was an error. Please make sure location services and access are enabled in your system's and browser's settings.",
        geoLocateLoader: false,
      });
    };

    if (!navigator.geolocation) {
      this.setState({
        geoLocateTitle: 'Geolocation is not supported!',
        geoLocateDialog:
          "Please make sure location services and access are enabled in your system's and browser's settings.",
        geoLocateLoader: false,
      });
    } else {
      this.setState({
        geoLocateTitle: 'Geolocation in process',
        geoLocateDialog: 'Loading...',
        geoLocateLoader: true,
      });
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  render() {
    return (
      <div className={'position-relative'}>
        <div id="map" className={'contributeMap'} />

        <div className="locationSearchContainer">
          <MapSearchBar callback={this.toSearch} />
          <div className="coordinateInputContainer">
            <input
              className="coordinateInput"
              placeholder="latitude"
              value={this.state.lat}
              onChange={(e) => {
                this.setState({ lat: e.target.value });
                try {
                  if (markerRef) {
                    markerRef.setLngLat([
                      parseFloat(e.target.value),
                      parseFloat(this.state.lng),
                    ]);
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            ></input>
            <input
              className="coordinateInput"
              placeholder="longitude"
              value={this.state.lng}
              onChange={(e) => {
                this.setState({ lng: e.target.value });
                try {
                  if (markerRef) {
                    markerRef.setLngLat([
                      parseFloat(this.state.lat),
                      parseFloat(e.target.value),
                    ]);
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            ></input>
          </div>
        </div>
        <button
          type="button"
          className={'nav-ctr-btn geolocate-btn btn-interactivity'}
          onClick={(e) => {
            e.preventDefault();
            console.log('clicked button');
            this.geolocate();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.94 11C20.48 6.83 17.17 3.52 13 3.06V1H11V3.06C6.83 3.52 3.52 6.83 3.06 11H1V13H3.06C3.52 17.17 6.83 20.48 11 20.94V23H13V20.94C17.17 20.48 20.48 17.17 20.94 13H23V11H20.94ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5C8.13 5 5 8.13 5 12Z"
              fill="#AEAEAE"
            />
          </svg>
        </button>

        {this.state.geoLocateDialog ? (
          <Dialogue
            title={this.state.geoLocateTitle}
            content={this.state.geoLocateDialog}
            accept={false}
            cancel={false}
            cardCover={false}
            loader={this.state.geoLocateLoader}
            handleClose={() => {
              this.setState({
                geoLocateDialog: null,
                geoLocateTitle: null,
                geoLocateLoader: false,
              });
            }}
          />
        ) : null}
      </div>
    );
  }
}
