import React from 'react';
import mapboxGl from "mapbox-gl";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        console.log('map.js ', this.props.filterData)
        mapboxGl.accessToken = ACCESS_TOKEN;
       let map = new mapboxGl.Map({
           container: 'map',
           style: 'mapbox://styles/casillasenrique/ckwarozh81rip14qkloft3opq', // style URL
           center: [35.5, 33.893894], // starting position [lng, lat]
           zoom: 12, // starting zoom
       });


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("updated")
        if (!this.props.workshops) {
       return;}

    // Display workshops as markers on the map

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
                new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(this.map);
                console.log("reached condition");
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