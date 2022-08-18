import React from 'react';
import mapboxGl from "mapbox-gl";
import mapboxGL from "mapbox-gl/dist/mapbox-gl-unminified";
import Dialogue from "../contribution/general/Dialogue";
import * as ReactDOM from "react-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShop, faImage} from "@fortawesome/free-solid-svg-icons";


const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MAP_LABELS = ['road-label', 'road-intersection', 'waterway-label', 'natural-line-label', 'natural-point-label',
    'water-line-label', 'water-point-label', 'poi-label', 'airport-label', 'settlement-subdivision-label',
    'settlement-minor-label', 'settlement-major-label', 'state-label', 'country-label']


export default class App extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            activeLayer: null,
            showMapCard: false,
            width: window.innerWidth,
            height: window.innerHeight,
            coord: this.props.coords,
            geoLocateDialog: null,
            geoLocateTitle: null,
            geoLocateLoader: false,

            readZoom: this.props.mapZoom,
            markerRadius: this.getMarkerRadius(this.props.mapZoom),
            geoLocateCoords: null,
            isAfterClick: false
            //mapZoom: this.props.mapZoom

        }

        this.mapContainer = React.createRef();
        this.mappedMarkers = [];
        this.activeMarker = null;
        this.geoLocateMarker = null;
        this.colorMap = {
            "architectural": '#91B0D1',
            "cuisine": '#DFBA96',
            "decorative": '#88A384',
            "fashion": "#DEC2B4",
            "functional": "#72A1AB",
            "furniture": "#9F8278",
            "textiles": "#EACC74",
            "none": "#c9bba6"
        }
        this.clickMarker = this.clickMarker.bind(this)
        this.hoverMarker = this.hoverMarker.bind(this)
        this.leaveMarker = this.leaveMarker.bind(this)
        this.iterateObject = this.iterateObject.bind(this)
        this.iterateArray = this.iterateArray.bind(this)

    }

    iterateObject = (object, searchValue) => {
        const searchableKeys = ["shop_name", "content", "content_orig", "content_ar", "craft_discipline", "craft_discipline_category",
            "craft_discipline_other", "location", "address", "adm1", "adm2", "adm3", "adm4"]
        let filteredObject = Object.fromEntries(Object.entries(object).filter(([key]) => searchableKeys.includes(key)));

        return Object.values(filteredObject).some(val => {
            if (val) {
                if (Array.isArray(val)) {
                    return this.iterateArray(val, searchValue)
                } else if (val && typeof (val) === "object") {
                    return this.iterateObject(val, searchValue)
                } else {
                    if (typeof (val) === "string" || val instanceof String) {
                        if (val.toLowerCase().includes(searchValue.toLowerCase()) || searchValue.toLowerCase().includes(val.toLowerCase())) {
                            return true
                        }
                    }

                }
            }
        });
    }

    iterateArray = (array, searchValue) => {
        return array.some((item) => {
            if (item) {
                if (Array.isArray(item)) {
                    return this.iterateArray(item, searchValue)
                } else if (item && typeof (item) === "object") {
                    return this.iterateObject(item, searchValue)
                } else {
                    if (typeof (item) === "string" || item instanceof String) {
                        if (item.toLowerCase().includes(searchValue.toLowerCase()) || searchValue.toLowerCase().includes(item.toLowerCase())) {
                            return true
                        }
                    }

                }
            }
        })

    }

    getMarkerRadius = (currentZoom) => {
        let markerRadius
        if (currentZoom < 12.5) {
            markerRadius = 2
        } else if (currentZoom < 13) {
            markerRadius = 3
        } else if (currentZoom < 13.5) {
            markerRadius = 4
        } else if (currentZoom < 13.75) {
            markerRadius = 4.5
        } else if (currentZoom < 14) {
            markerRadius = 5
        } else if (currentZoom < 16) {
            markerRadius = 7;
        } else {
            markerRadius = 7.5;
        }
        return markerRadius
    }


    handleResize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })


        if (window.innerWidth > 991) {
            this.props.setMapZoom(13.5)
        } else if (window.innerWidth > 688) {
            this.props.setMapZoom(12.5)
        } else {
            this.props.setMapZoom(11.5)
        }
    }


    handleClickZoomIn = () => {
        map.current.zoomIn({duration: 1000});
    }

    handleClickZoomOut = () => {
        map.current.zoomOut({duration: 1000});
    }

    handleGeolocate = () => {
        const success = (position) => {
            this.setState({
                geoLocateDialog: null,
                geoLocateTitle: null,
                geoLocateLoader: false,
                geoLocateCoords: [position.coords.longitude, position.coords.latitude]
            });
            map.current.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 20
            })
        }

        const error = () => {
            this.setState({
                geoLocateTitle: 'We couldn\'t find you!',
                geoLocateDialog: 'There was an error. Please make sure location services and access are enabled in your system\'s and browser\'s settings.',
                geoLocateLoader: false
            });
        }

        if (!navigator.geolocation) {
            this.setState({
                geoLocateTitle: 'Geolocation is not supported!',
                geoLocateDialog: 'Please make sure location services and access are enabled in your system\'s and browser\'s settings.',
                geoLocateLoader: false
            });
        } else {
            this.setState({
                geoLocateTitle: 'Geolocation in process',
                geoLocateDialog: 'Loading...',
                geoLocateLoader: true
            });
            navigator.geolocation.getCurrentPosition(success, error);

        }
    }


    clickMarker(e) {

        this.setState({isAfterClick: true})
        let el = e.target;
        this.props.openMapCard(el.id, el.type);
        const popups = document.querySelector(".mapboxgl-popup")
        if (popups) {
            popups.parentNode.removeChild(popups)
        }

    }

    hoverMarker(e) {

        if (!this.state.isAfterClick) {
            let el = e.target;
            el.classList.add('hoverMarker');
            el.classList.add(`hoverMarker--${el.craft.toLowerCase()}`);
            this.showPopup(el.obj)
        }
        this.setState({isAfterClick: false})
    }

    showPopup = (obj) => {

        const popups = document.querySelector(".mapboxgl-popup")
        if (popups) {
            popups.parentNode.removeChild(popups)
        }

        const popup = new mapboxGL.Popup({closeButton: false, closeOnClick: false});
        let lng
        let lat
        try {
            lng = obj.location.geo.lng
            lat = obj.location.geo.lat
        } catch {
            lng = obj.primary_location.geo.lng
            lat = obj.primary_location.geo.lat
        }

        const popupContent = document.createElement('div');
        const popupText = (
            <>
                <p>{this.getShopName(obj)}</p>
                {obj.object==="workshop" ? <FontAwesomeIcon icon={faShop} width={14}/> : <FontAwesomeIcon icon={faImage} width={14}/> }
            </>
        )
        popupContent.className = "marker-popup"
        ReactDOM.render(popupText, popupContent);

        popup.setLngLat([lng, lat])
            .setDOMContent(popupContent)
            .addTo(map.current);
    }

    leaveMarker(e) {
        let el = e.target;
        el.classList.remove('hoverMarker');
        el.classList.remove(`hoverMarker--${el.craft.toLowerCase()}`);
        const popups = document.querySelector(".mapboxgl-popup")
        if (popups) {
            popups.parentNode.removeChild(popups)
        }
    }

    getShopName = (obj) => {
        if (obj.shop_name['content']) {
            return obj.shop_name['content']
        } else if (obj.shop_name['content_orig']) {
            return obj.shop_name['content_orig']
        } else {
            return "Craft Shop (No name provided)"
        }
    }


    componentDidMount() {


        window.addEventListener('resize', this.handleResize);
        mapboxGl.accessToken = ACCESS_TOKEN;


        if (mapboxGL.getRTLTextPluginStatus() !== 'loaded' && mapboxGL.getRTLTextPluginStatus() !== 'deferred') {
            if (mapboxGl.getRTLTextPluginStatus() === 'unavailable') {
                mapboxGl.setRTLTextPlugin(
                    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
                    null,
                    true // Lazy load the plugin
                );
            }
        }


        map.current = new mapboxGl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
            center: this.props.coords, // [35.510, 33.893894], // starting position [lng, lat]
            zoom: this.props.mapZoom //13.25, // starting zoom

            //maxBounds: [[35.383297650238326, 33.83527318407196], [35.629842811007315, 33.928357422091395]]
        });


        // add all potential layers as a source

        map.current.on('load', () => {

            for (const [key, value] of Object.entries(this.props.allLayers)) {
                const checkSourceAdded = map.current.getSource(`${value[0]}`);
                if (!checkSourceAdded) {
                    map.current.addSource(value[0], {
                        'type': 'raster',
                        'url': `mapbox://mitcivicdata.${value[2]}`
                    });
                }
                map.current.addLayer({
                    'id': value[0],
                    'source': value[0],
                    'type': 'raster',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'raster-opacity': 0.7
                    }
                });
            }

            let labels = []

            MAP_LABELS.forEach((layer) => {
                try {
                    map.current.setLayoutProperty(layer, 'text-field', [
                        'get',
                        `name_${this.props.i18n.language}`
                    ]);
                } catch (e) {
                    console.log("layer is not a valid layer on this map")
                }
            });

        });

        map.current.on('zoom', () => {
            const currentZoom = map.current.getZoom();
            const markerRadius = this.getMarkerRadius(currentZoom)

            this.setState({
                readZoom: currentZoom,
                markerRadius: markerRadius
            })

        });


        if (!this.props.workshops) {
            return;
        }

        for (const workshop of this.props.workshops) {

            const el = document.createElement('div');

            if (workshop.craft_discipline_category.length > 1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius * 2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `${this.state.markerRadius}px`;
                secondCraft.style.height = `${this.state.markerRadius * 2}px`;
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (workshop.craft_discipline_category.length < 1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = workshop.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }


            el.className = `marker marker-${workshop.ID} ${workshop.ID === this.props.id ? 'active-marker' : ''}`;
            el.style.width = `${this.state.markerRadius * 2}px`;
            el.style.height = `${this.state.markerRadius * 2}px`;
            el.style.borderRadius = '50%';
            el.id = workshop.ID;
            el.craft = workshop.craft_discipline_category[0] || 'none';
            el.onclick = this.clickMarker;
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type = 'workshop';
            el.obj = workshop;

            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                return;
            }

            const {lng, lat} = workshop.location.geo;
            if (lat && lng && workshop.images.length > 0) {
                el.lng = lng;
                el.lat = lat;
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker);
            }
        }

        for (const archive of this.props.archives) {

            const el = document.createElement('div');
            const craft = archive.craft_discipline_category[0];

            if (archive.craft_discipline_category.length > 1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius * 2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `${this.state.markerRadius}px`;
                secondCraft.style.height = `${this.state.markerRadius * 2}px`;
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (archive.craft_discipline_category.length < 1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = archive.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }


            el.className = `marker marker-${archive.ID} ${archive.ID === this.props.id ? 'active-marker' : ''}`;
            el.style.width = `${this.state.markerRadius * 2}px`;
            el.style.height = `${this.state.markerRadius * 2}px`;
            // el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = archive.ID;
            el.craft = archive.craft_discipline_category[0] || "none";
            el.onClick = () => this.clickMarker(el);
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type = 'archive'
            el.obj = archive;

            if (archive.ID === "A397612231") {
                return;
            }
            if (!archive.primary_location['geo']) {
                console.warn(`${archive.ID} has no geo location`);
                return;
            }

            const {lng, lat} = archive.primary_location['geo'];
            if (lat && lng && archive.images.length > 0) {
                el.lng = lng;
                el.lat = lat;
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker)
            }
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {



        const changedZoom = this.props.mapZoom !== prevProps.mapZoom;
        const changedCoords = this.props.coords !== prevProps.coords;
        if (changedZoom || changedCoords) {
            if (this.props.showMapCard === false && this.props.coords) {
                map.current.flyTo({
                    center: changedCoords ? this.props.coords : [35.510, 33.893894],
                    zoom: this.props.mapZoom,
                    speed: 0.5, // make the flying slow
                    essential: true
                })
            }

        }

        MAP_LABELS.forEach((layer) => {
            try {
                map.current.setLayoutProperty(layer, 'text-field', [
                    'get',
                    `name_${this.props.i18n.language}`
                ]);
            } catch (e) {
                console.log("layer is not a valid layer on this map")
            }
        });


        if (this.props.coords && (prevProps.coords !== this.props.coords) && this.props.showMapCard) {

            if (this.props.coords[0] !== 35.510 && this.props.coords[1] !== 33.893894) {
                map.current.flyTo({
                    center: this.props.coords,
                    zoom: 16,
                    offset: (this.state.width < 992) ? (687 < this.state.width ? [0, this.state.height * 0.30] : [0, -this.state.height * 0.25]) : [0, 0],
                    bearing: 0,
                    speed: 0.5, // make the flying slow
                    curve: 1, // change the speed at which it zooms out
                    essential: true
                })
            }
        }


        // change visibility of layer
        if (this.props.mapLayer !== prevProps.mapLayer) {
            if (this.props.mapLayer) {
                if (this.state.activeLayer) {
                    map.current.setLayoutProperty(this.state.activeLayer, 'visibility', 'none');
                    if (!this.props.showMapCard) {
                        let filtered = Object.fromEntries(Object.entries(this.props.allLayers).filter(([k, v]) => v[0] === this.props.mapLayer));
                        if (Object.values(filtered)[0][3]) {
                            this.props.setMapLayerSettings(Object.values(filtered)[0][3], Object.values(filtered)[0][4])
                        }
                    }
                    map.current.setLayoutProperty(this.props.mapLayer, 'visibility', 'visible');
                    this.setState({activeLayer: this.props.mapLayer})
                } else {
                    if (!this.props.showMapCard) {
                        let filtered = Object.fromEntries(Object.entries(this.props.allLayers).filter(([k, v]) => v[0] === this.props.mapLayer));
                        if (Object.values(filtered)[0][3]) {
                            this.props.setMapLayerSettings(Object.values(filtered)[0][3], Object.values(filtered)[0][4])
                        }
                    }
                    map.current.setLayoutProperty(this.props.mapLayer, 'visibility', 'visible');
                    this.setState({activeLayer: this.props.mapLayer})
                }
            } else if (this.state.activeLayer) {
                map.current.setLayoutProperty(this.state.activeLayer, 'visibility', 'none');
                this.setState({activeLayer: null})
                if (!this.props.showMapCard) {
                    this.props.setMapLayerSettings([35.510, 33.893894], this.props.handleResize())
                }
            }
        }


        // load workshop markers
        if (!this.props.workshops) {
            return;
        }

        if (prevState.readZoom !== this.state.readZoom) {
            // this.mappedMarkers.forEach((marker) => marker.remove());
        }


        if (prevState.geoLocateCoords != this.state.geoLocateCoords) {
            if (this.state.geoLocateCoords) {

                if (this.geoLocateMarker) {
                    this.geoLocateMarker.remove()
                }
                const el = document.createElement('div');
                el.id = 'geoLocate-marker';
                el.style.width = `${this.state.markerRadius * 2}px`;
                el.style.height = `${this.state.markerRadius * 2}px`;
                el.style.background = "#85cbd4";
                el.style.borderRadius = '50%';
                let marker = new mapboxGl.Marker(el).setLngLat(this.state.geoLocateCoords).addTo(map.current);
                this.geoLocateMarker = marker;
            }
        }


        if (this.props.search && (this.props.search !== prevProps.search)) {
            if (this.activeMarker) {
                document.querySelector(`.marker-${this.activeMarker}`).classList.remove("active-marker")
                this.activeMarker = null
            }
        }


        if (this.props.id && (this.props.id !== prevProps.id)) {
            const mark = document.querySelector(`.marker-${this.props.id}`)
            mark.classList.add("active-marker")
            if (this.activeMarker) {
                document.querySelector(`.marker-${this.activeMarker}`).classList.remove("active-marker")
            }
            this.activeMarker = this.props.id
        }

        const sameCrafts = prevProps.numberCrafts === this.props.numberCrafts
        const sameStartYear = prevProps.startYear === this.props.startYear
        const sameEndYear = prevProps.endYear === this.props.endYear
        const sameWorkshopToggle = prevProps.toggleWorkshopStatus === this.props.toggleWorkshopStatus
        const sameArchiveToggle = prevProps.toggleArchiveStatus === this.props.toggleArchiveStatus
        const sameSearch = prevProps.search === this.props.search
        const sameMarkerRadius = prevState.markerRadius === this.state.markerRadius


        if (sameCrafts && sameStartYear && sameEndYear && sameWorkshopToggle && sameArchiveToggle && sameSearch && sameMarkerRadius) {
            return
        }

        if (this.mappedMarkers) {
            this.mappedMarkers.forEach((marker) => marker.remove());
        }


        for (const workshop of this.props.workshops) {
            const el = document.createElement('div');


            if (workshop.craft_discipline_category.length > 1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius * 2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[1].toLowerCase()]}`;
                secondCraft.style.width = `${this.state.markerRadius}px`;
                secondCraft.style.height = `${this.state.markerRadius * 2}px`;
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (workshop.craft_discipline_category.length < 1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = workshop.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }

            el.className = `marker marker-${workshop.ID} ${workshop.ID === this.props.id ? 'active-marker' : ''}`;
            el.style.width = `${this.state.markerRadius * 2}px`;
            el.style.height = `${this.state.markerRadius * 2}px`;
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = workshop.ID;
            el.craft = workshop.craft_discipline_category[0] || 'none';
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type = 'workshop';
            el.obj = workshop;


            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                continue;
            }


            const craftType = workshop.craft_discipline_category;
            const {lng, lat} = workshop.location.geo;
            const indices = craftType.map((craft) => {
                return this.props.filteredCrafts.indexOf(craft)
            });
            const start = this.props.startYear;
            const end = this.props.endYear;
            let withinInterval = null;

            if (workshop.year_established == null) {
                if (start <= 2010 && end >= 2010) {
                    withinInterval = true;
                } else {
                    withinInterval = false;
                }
            } else {
                if (start <= workshop.year_established && workshop.year_established <= end) {
                    withinInterval = true;
                } else {
                    withinInterval = false;
                }
            }

            const noCrafts = (((!workshop.craft_discipline_category || workshop.craft_discipline_category.length < 1) && (this.props.filteredCrafts && this.props.filteredCrafts.length < 1)) || (this.props.filteredCrafts && this.props.filteredCrafts.length === 7))

            if (lat && lng && (indices[0] > -1 || (indices.length > 1 && indices[1] > -1) || noCrafts) && withinInterval) {
                if (!this.props.toggleWorkshopStatus) {
                    break
                }

                if (!workshop.images || workshop.images.length < 1) {
                    continue;
                }

                let lookup = this.props.search
                // const meetSearchCriteria = (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())))
                // TODO: edit meetSearchCriteria to accomodate other lookups
                let meetSearchCriteria
                if (!lookup) {
                    meetSearchCriteria = true
                } else {
                    meetSearchCriteria = this.iterateObject(workshop, lookup)
                }


                if (meetSearchCriteria) {


                    el.lng = lng;
                    el.lat = lat;
                    let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                    this.mappedMarkers.push(marker);
                }

            }

        }

        for (const archive of this.props.archives) {
            const craft = archive.craft_discipline_category[0];
            const el = document.createElement('div');

            if (archive.craft_discipline_category.length > 1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius * 2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `${this.state.markerRadius}px`;
                secondCraft.style.height = `${this.state.markerRadius * 2}px`;
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (archive.craft_discipline_category.length < 1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = archive.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }

            el.className = `marker marker-${archive.ID} ${archive.ID === this.props.id ? 'active-marker' : ''}`;
            el.style.width = `${this.state.markerRadius * 2}px`;
            el.style.height = `${this.state.markerRadius * 2}px`;
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = archive.ID;
            el.craft = archive.craft_discipline_category[0] || 'none';
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type = "archive";
            el.obj = archive;


            if (archive.ID === "A397612231") {
                console.warn(`${archive.ID} is ignored`);
                return;
            }
            if (!archive.primary_location['geo']) {
                console.warn(`${archive.ID} has no geo location`);
                return;
            }

            const craftType = archive.craft_discipline_category;
            const {lng, lat} = archive.primary_location["geo"];
            const indices = craftType.map((craft) => {
                return this.props.filteredCrafts.indexOf(craft)
            });
            const start = this.props.startYear;
            const end = this.props.endYear;
            let withinInterval = null;

            if (archive.primary_year) {
                if (start <= archive.primary_year && archive.primary_year <= end) {
                    withinInterval = true;
                }
            } else if (archive.primary_decade) {
                if (start <= archive.primary_decade[0] && archive.primary_decade[0] <= end) {
                    withinInterval = true
                }
            } else {
                withinInterval = false
            }


            const noCrafts = (((!archive.craft_discipline_category || archive.craft_discipline_category.length < 1) && (this.props.filteredCrafts && this.props.filteredCrafts.length < 1)) || (this.props.filteredCrafts && this.props.filteredCrafts.length === 7))
            if (lng && lat && (indices[0] > -1 || (indices.length > 1 && indices[1] > -1) || noCrafts) && withinInterval) {
                if (!this.props.toggleArchiveStatus) {
                    break
                }

                let lookup = this.props.search
                let shopName = archive.shop_name['content']
                let shopOrig = archive.shop_name['content_orig']


                // const meetSearchCriteria = (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())))
                // TODO: edit meetSearchCriteria to accomodate other lookups
                let meetSearchCriteria
                if (!lookup) {
                    meetSearchCriteria = true
                } else {
                    meetSearchCriteria = this.iterateObject(archive, lookup)
                }

                if (archive.images.length > 0 && meetSearchCriteria) {
                    el.lng = lng;
                    el.lat = lat;
                    let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                    this.mappedMarkers.push(marker);

                }

            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    render() {

        return (
            <>
                {this.state.geoLocateDialog ? <Dialogue
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
                            geoLocateLoader: false
                        })
                    }}/> : null}
                <div ref={this.mapContainer} id="map" className={'exploreMap'}/>
                <div className={"nav-ctr-container"}>
                    <button className={"nav-ctr-btn zoom-in-btn btn-interactivity"} onClick={this.handleClickZoomIn}>
                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.86719 3.76562V5.46094H0.0703125V3.76562H7.86719ZM4.88281 0.578125V8.85938H3.0625V0.578125H4.88281Z"
                                fill="#471E10"/>
                        </svg>

                    </button>
                    <button className={"nav-ctr-btn zoom-out-btn btn-interactivity"} onClick={this.handleClickZoomOut}>
                        <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.03906 0.390625V1.89062H0.90625V0.390625H5.03906Z" fill="#471E10"/>
                        </svg>
                    </button>

                    <button className={"nav-ctr-btn geolocate-btn btn-interactivity"} onClick={this.handleGeolocate}>

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M20.94 11C20.48 6.83 17.17 3.52 13 3.06V1H11V3.06C6.83 3.52 3.52 6.83 3.06 11H1V13H3.06C3.52 17.17 6.83 20.48 11 20.94V23H13V20.94C17.17 20.48 20.48 17.17 20.94 13H23V11H20.94ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5C8.13 5 5 8.13 5 12Z"
                                  fill="#AEAEAE"/>
                        </svg>

                    </button>

                </div>
            </>


        );
    }

}
