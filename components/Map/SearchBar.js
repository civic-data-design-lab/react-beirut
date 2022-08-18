import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {TRANSLATIONS} from "../../lib/utils";
import axios from "axios";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


const SearchBar = ({callBack, placeHolder="Search", value=null, map=true}) => {
    const { t } = useTranslation();
    const [searchEntry, setSearchEntry] = useState('')
    const [searchItems, setSearchItems] = useState([])

    useEffect(()=>{
        forwardGeocoding();
    }, [value])


    const inputUpdate = () => {
        let value = document.getElementById('mapSearch').value
        callBack(value)
        forwardGeocoding(value);
    }

    const clearSearch = () => {
        callBack('')
        let searchBar = document.getElementById('mapSearch')
        searchBar.value = ''
    }

    const forwardGeocoding = (value) => {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?autocomplete=false&access_token=${MAPBOX_ACCESS_TOKEN}`;
        axios
            .get(endpoint, {
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((res) => {
                // console.log(res.data.features);
                console.log(value, res.data.features)
                let resItems = []
                for (const v of res.data.features) {
                    // console.log(v.center[0].toFixed(3) + " " + v.center[1].toFixed(3), v.place_name);
                    resItems.push(
                        <div key={v.id} className={"search-item"}
                             // TODO: fly to {v.center[0].toFixed(3) + " " + v.center[1].toFixed(3)}
                        >
                            {v.place_name}
                        </div>
                    )
                }

                setSearchItems(resItems);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {

            });
    };

    return (

            <div className={`${map?"searchbar":"image-searchbar"}`}>
                <span>
                <input id="mapSearch" type="search" placeholder={t(placeHolder)} onChange={inputUpdate} value={value}/>
                </span>

                {map?
                <div className={"search-items mt-2"}>
                    {searchItems}
                </div> :
                null}
            </div>

        )
}

export default SearchBar