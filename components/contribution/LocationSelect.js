import mapboxGl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { MAPBOX_STYLE_URL } from '../../lib/utils';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const LocationSelect = ({ onUpdate }) => {
  useEffect(() => {
    mapboxGl.accessToken = ACCESS_TOKEN;
    const map = new mapboxGl.Map({
      container: 'map', // container ID
      style: MAPBOX_STYLE_URL, // style URL
      center: [35.5, 33.893894], // starting position [lng, lat]
      zoom: 12, // starting zoom
      // maxZoom: 15,
      minZoom: 10,
    });

    const marker = new mapboxGl.Marker({
      draggable: true,
      color: '#85cbd4',
    })
      .setLngLat([35.5, 33.893894])
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      console.log(lngLat);
      onUpdate(lngLat);
    }

    marker.on('dragend', onDragEnd);
  }, []);

  return <div id="map"></div>;
};

export default LocationSelect;
