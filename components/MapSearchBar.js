import React, { useState, useEffect } from 'react';
// import { useGoogleMapsScript, Libraries } from 'use-google-maps-script';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
const libraries = ['places'];
const MapSearchBar = ({ callback }) => {
  // const { isLoaded, loadError } = useGoogleMapsScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY,
  //   libraries,
  // });

  const [selected, setSelected] = useState(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      bounds: {
        east: 35.586712,
        north: 33.917418,
        south: 33.853357,
        west: 35.437629,
      },

      // componentRestrictions: ['lb'],
    },
    debounce: 300,
  });

  if (status !== ' OK') {
    console.log(status);
  }

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        // console.log('📍 Coordinates: ', { lat, lng });
        callback(lng, lat);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          className={'suggestionItem'}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });

  return (
    <>
      <input
        className="locationSearchBar"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        // disabled={!ready}
        placeholder="Enter Location"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <div className={'suggestionsContainer'}>{renderSuggestions()}</div>
      )}
    </>
  );
};

export default MapSearchBar;
