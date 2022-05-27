import React, {useRef} from 'react';
import mapboxGl from "mapbox-gl";
import MapCard from "./MapCard";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.mapContainer = React.createRef();
        this.mappedMarkers = [];
        this.colorMap = {
            "architectural": '#66816c',
            "cuisine": '#b68c66',
            "decorative": '#ab6d6d' ,
            "fashion": "#608f96",
            "functional": "#a98199",
            "furniture": "#72475f",
            "textiles": "#eebc71"
        }
    }

    clickMarker = () => {
        console.log('clicked marker');
        let shopCard = document.createElement('MapCard')
        shopCard.className = "card"
        let map = document.getElementById('map')
        map.appendChild(shopCard)
    }

    componentDidMount() {
        //console.log('map.js ', this.props.filterSearchData)
        //console.log('archive', this.props.archives)
        mapboxGl.accessToken = ACCESS_TOKEN;
        map.current = new mapboxGl.Map({
           container: this.mapContainer.current,
           style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
           center: [35.5, 33.893894], // starting position [lng, lat]
           zoom: 12, // starting zoom
       });

       if (!this.props.workshops) {
            return;}

       for (const workshop of this.props.workshops) {
            const el = document.createElement('div');
            const craft = workshop.craft_discipline_category[0]
            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.backgroundColor = this.colorMap[craft];
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;

            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                return;
            }

            const {lng, lat} = workshop.location.geo;
            if (lat && lng) {
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker)
            }
        }

       for (const archive of this.props.archives) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.backgroundColor = '#eeb4aa';
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;

            if (archive.ID === "A397612231") {
                console.warn(`${archive.ID} is ignored`);
                return;
            }
            if (!archive.primary_location['geo']) {
                console.warn(`${archive.ID} has no geo location`);
                return;
            }


            const {lng, lat} = archive.primary_location['geo'];
            if (lat && lng) {
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker)
            }
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
         // load workshop markers
        if (!this.props.workshops) {
            return;}

        if (this.mappedMarkers) {
            this.mappedMarkers.forEach((marker) => marker.remove());
        }

        for (const workshop of this.props.workshops) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.backgroundColor = this.colorMap[workshop.craft_discipline_category[0]];
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;

            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                continue;
            }

            const craftType = workshop.craft_discipline_category;
            const {lng, lat} = workshop.location.geo;
            const indices = craftType.map((craft)=>{return this.props.filterData['filteredCraftsParent'].indexOf(craft)});
            const start = this.props.filterData['startYearParent'];
            const end = this.props.filterData['endYearParent'];
            let withinInterval = null;

            if (workshop.year_established == null) {
                if (start <= 2010 && end >= 2010 ) {
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

            if (lat && lng && (indices[0]>-1 || (indices.length>1 && indices[1]>-1)) && withinInterval) {
                if (this.props.filterData['toggleParent'] && workshop.shop_status!=="open") {
                    continue;
                }

                let lookup = this.props.searchData
                let shopName = workshop.shop_name['content']
                let shopOrig = workshop.shop_name['content_orig']



                if (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase()))) {
                    let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                    this.mappedMarkers.push(marker);
                    //console.log(shopName, shopOrig)
                }

            }
        }

        for (const archive of this.props.archives) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.backgroundColor = '#eeb4aa';
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;


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
            const indices = craftType.map((craft)=>{return this.props.filterData['filteredCraftsParent'].indexOf(craft)});
            const start = this.props.filterData['startYearParent'];
            const end = this.props.filterData['endYearParent'];
            let withinInterval = null;

            if (start <= archive.primary_year && archive.primary_year <= end) {
                    withinInterval = true;
            } else {
                    withinInterval = false;
                    }


            if (lat && lng && (indices[0]>-1 || (indices.length>1 && indices[1]>-1)) && withinInterval) {
                if (this.props.filterData['toggleParent']) {
                    continue;
                }

                let lookup = this.props.searchData
                let shopName = archive.shop_name['content']
                let shopOrig = archive.shop_name['content_orig']



                if (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase()))) {
                    let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                    this.mappedMarkers.push(marker);
                    //console.log(shopName, shopOrig)
                }

            }
        }


    }


    render() {

        return (
            <div
    ref={this.mapContainer}
    id="map"
    style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    }}
    />

        );
    }

}