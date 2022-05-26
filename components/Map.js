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

    clickMarker = () => {
        console.log('clicked marker');
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

       if (!this.props.workshops) {
            return;}

       for (const workshop of this.props.workshops) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.backgroundColor = '#abe';
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
            el.onclick = this.clickMarker;

            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                return;
            }

            const {lng, lat} = workshop.location.geo;
            const craftType = workshop.craft_discipline_category;
            const indices = craftType.map((craft)=>{return this.props.filterData.filteredCraftsParent.indexOf(craft)});
            const start = this.props.filterData.startYearParent;
            const end = this.props.filterData.endYearParent;
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

            console.log(workshop.year_established);
            console.log(withinInterval);

            if (lat && lng && (indices[0]>-1 || (indices.length>1 && indices[1]>-1)) && withinInterval) {
                if (this.props.filterData.toggleParent && workshop.shop_status!=="open") {
                    continue;
                }
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker);
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