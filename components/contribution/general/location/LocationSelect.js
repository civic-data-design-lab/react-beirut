import mapboxGl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { MAPBOX_STYLE_URL } from '../../../../lib/utils';

import { Trans, useTranslation } from "react-i18next";


const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const LocationSelect = ({ onUpdate, formData }) => {

  const {t} = useTranslation();
  useEffect(() => {
    let markerLocation
    if (formData && formData.lat && formData.lng) {
      markerLocation = [formData.lng, formData.lat]
    } else {
      markerLocation = [35.5, 33.893894]
    }

    mapboxGl.accessToken = ACCESS_TOKEN;
    const map = new mapboxGl.Map({
      container: 'map', // container ID
      style: MAPBOX_STYLE_URL, // style URL
      center: markerLocation, // starting position [lng, lat]
      zoom: 12, // starting zoom
      // maxZoom: 15,
      minZoom: 10,
    });

    const marker = new mapboxGl.Marker({
      draggable: true,
      color: '#85cbd4',
    })
      .setLngLat(markerLocation)
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      // console.log(lngLat);
      onUpdate(lngLat);
    }

    marker.on('dragend', onDragEnd);
  }, []);

  return <div id="map" className={'contributeMap'}/>;
};

export default LocationSelect;
