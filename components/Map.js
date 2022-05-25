import React, {useRef} from 'react';
import mapboxGl from "mapbox-gl";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.mapContainer = React.createRef();

        this.mappedMarkers = [];

    }

    componentDidMount() {
        console.log('map.js ', this.props.filterData)
        mapboxGl.accessToken = ACCESS_TOKEN;
        map.current = new mapboxGl.Map({
           container: this.mapContainer.current,
           style: 'mapbox://styles/casillasenrique/ckwarozh81rip14qkloft3opq', // style URL
           center: [35.5, 33.893894], // starting position [lng, lat]
           zoom: 12, // starting zoom
       });




    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("updated")
        if (!this.props.workshops) {
       return;}

        if (this.mappedMarkers) {
            this.mappedMarkers.forEach((marker) => marker.remove());
        }

        for (const workshop of this.props.workshops) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.backgroundColor = '#abe';
            el.style.borderRadius = '50%';

            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                return;
            }

            const {lng, lat} = workshop.location.geo;
            const craftType = workshop.craft_discipline_category;
            const indices = craftType.map((craft)=>{return this.props.filterData.filteredCraftsParent.indexOf(craft)});

            if (lat && lng && indices[0]>-1) {
                console.log(lat, lng);
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                console.log("reached condition");
                this.mappedMarkers.push(marker)
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
        zIndex: -1,
    }}
    />

        );
    }

}