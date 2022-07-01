import mapboxGl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { MAPBOX_STYLE_URL } from '../../../../lib/utils';

import { Trans, useTranslation } from "react-i18next";
import React from "react";
import mapboxGL from "mapbox-gl/dist/mapbox-gl-unminified";


const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default class LocationSelect extends React.Component {
    constructor(props) {
        super(props);
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        console.log("printing props ", this.props)
      let markerLocation
      if (this.props.formData && this.props.formData.lat && this.props.formData.lng) {
      markerLocation = [this.props.formData.lng, this.props.formData.lat]
      } else {
      markerLocation = [35.5, 33.893894]
    }

      mapboxGl.accessToken = ACCESS_TOKEN;
      if (mapboxGL.getRTLTextPluginStatus() !== 'loaded' && mapboxGL.getRTLTextPluginStatus() !== 'deferred') {
            console.log('here')
            if (mapboxGl.getRTLTextPluginStatus() === 'unavailable'){
                console.log('here again')
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

     map.current.on('load', ()=>{
                map.current.getStyle().layers.forEach((layer) => {
                if (layer.layout && layer.layout['text-field']) {
                    map.current.setLayoutProperty(layer.id, 'text-field', [
                        'get',
                        `name_${this.props.i18n.language}`
                    ]);
                }
            });
            })

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
    }

    marker.on('dragend', onDragEnd);
    }

   componentDidUpdate(prevProps, prevState, snapshot) {
       map.current.getStyle().layers.forEach((layer) => {
           if (layer.layout && layer.layout['text-field']) {
               map.current.setLayoutProperty(layer.id, 'text-field', [
                   'get',
                   `name_${this.props.i18n.language}`
               ]);
           }
       });
   }


    render () {
               return <div id="map" className={'contributeMap'}/>;
           }


}




