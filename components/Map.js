import mapboxGl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

//! MISSING TOKEN
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = ({ workshops }) => {
  const map = useRef(null);

  useEffect(() => {
    mapboxGl.accessToken = ACCESS_TOKEN;
    map.current = new mapboxGl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/casillasenrique/ckwarozh81rip14qkloft3opq', // style URL
      center: [35.5, 33.893894], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });
  }, []);

  useEffect(() => {
    if (!workshops) {
      return;
    }

    // Display workshops as markers on the map
    const markers = workshops.map((workshop) => {
      const el = document.createElement('div');
      // el.style.backgroundImage = `url('/api/images/${workshop.thumb_img_id}.jpg')`;
      // el.style.backgroundSize = 'cover';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.backgroundColor = '#abe';
      el.style.borderRadius = '50%';

      if (!workshop.location.geo) {
        console.warn(`${workshop.ID} has no geo location`);
        return;
      }

      const { lng, lat } = workshop.location.geo;
      if (lng && lat) {
        new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
      }

      return el;
    });
    
  }, [workshops]);

  return (
    <div
      id='map'
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        zIndex: -1,
      }}
    ></div>
  );
};

export default Map;
