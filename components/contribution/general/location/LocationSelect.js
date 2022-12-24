import mapboxGl from 'mapbox-gl';
import React from 'react';
import { MAPBOX_STYLE_URL } from '../../../../lib/utils';
import mapboxGL from 'mapbox-gl/dist/mapbox-gl-unminified';
import SearchBar from '../../../Map/SearchBar';

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

export default class LocationSelect extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
    this.searchMap = this.searchMap.bind(this);
    this.toSearch = this.toSearch.bind(this);
    this.state = {
      search: '',
    };
  }

  searchMap = (searchQuery) => {
    this.setState({ search: searchQuery });
  };

  toSearch = (lat, lon) => {
    map.current.flyTo({
      center: [lat, lon],
      zoom: 16,
      speed: 0.5, // make the flying slow
      essential: true,
    });
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
      console.log('here');
      if (mapboxGl.getRTLTextPluginStatus() === 'unavailable') {
        console.log('here again');
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
    });

    MAP_LABELS.forEach((layer) => {
      try {
        map.current.setLayoutProperty(layer, 'text-field', [
          'get',
          `name_${this.props.i18n.language}`,
        ]);
      } catch (e) {
        console.log('layer is not a valid layer on this map');
      }
    });

    const marker = new mapboxGl.Marker({
      draggable: true,
      color: '#85cbd4',
    })
      .setLngLat(markerLocation)
      .addTo(map.current);

    const onDragEnd = () => {
      const lngLat = marker.getLngLat();
      // console.log(lngLat);
      this.props.onUpdate(lngLat);
    };

    marker.on('dragend', onDragEnd);

    map.current.addControl(new mapboxGL.NavigationControl());
    map.current.addControl(new mapboxGL.FullscreenControl());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    map.current.getStyle().layers.forEach((layer) => {
      if (layer.layout && layer.layout['text-field']) {
        map.current.setLayoutProperty(layer.id, 'text-field', [
          'get',
          `name_${this.props.i18n.language}`,
        ]);
      }
    });
  }

  render() {
    return (
      <div className={'position-relative'}>
        <div id="map" className={'contributeMap'} />
        <SearchBar
          callBack={this.searchMap}
          value={this.state.search}
          flyTo={this.toSearch}
          placeHolder={'Search for a quarter, sector, or street'}
        />
      </div>
    );
  }
}
