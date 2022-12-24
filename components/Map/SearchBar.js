import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../lib/utils';
import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
// added to env
const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

const SearchBar = ({
  callBack,
  placeHolder = 'Search',
  value = null,
  map = true,
  flyTo = null,
}) => {
  const { t } = useTranslation();
  const [searchItems, setSearchItems] = useState([]);
  const [showItems, setShowItems] = useState(true);

  useEffect(() => {
    forwardGeocoding();
  }, [value]);

  const inputUpdate = () => {
    let value = document.getElementById('mapSearch').value;
    callBack(value);
    forwardGeocoding(value);
  };

  const clearSearch = () => {
    callBack('');
    let searchBar = document.getElementById('mapSearch');
    searchBar.value = '';
  };

  const forwardGeocoding = (value) => {
    const endpoint = `https://api.maptiler.com/geocoding/${value}.json?key=${MAPTILER_KEY}&bbox=35.462,33.861,35.547,33.9109`;
    if (value) {
      if (!showItems) setShowItems(true);
      axios
        .get(endpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // console.log(res.data.features);
          let resItems = [];
          console.log(res);
          for (const v of res.data.features) {
            // console.log(v.center[0].toFixed(3) + " " + v.center[1].toFixed(3), v.place_name);
            resItems.push(
              <div
                key={v.id}
                className={'search-item'}
                onClick={() => {
                  flyTo(v.center[0], v.center[1]);
                  setShowItems(false);
                  let search = document.getElementById('mapSearch');
                  search.value = v.place_name;
                }}
                // TODO: fly to {v.center[0].toFixed(3) + " " + v.center[1].toFixed(3)}
              >
                {v.place_name}
              </div>
            );
          }

          setSearchItems(resItems);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    } else {
      setSearchItems(null);
    }
  };

  return (
    <div className={`${map ? 'searchbar' : 'image-searchbar'}`}>
      <span>
        <input
          id="mapSearch"
          type="search"
          placeholder={t(placeHolder)}
          onChange={inputUpdate}
          value={value}
        />
      </span>

      {map ? (
        <div className={'search-items mt-2'}>{showItems && searchItems}</div>
      ) : null}
    </div>
  );
};

export default SearchBar;
