import React from "react";
import mapboxGl from "mapbox-gl";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


export default class MiniMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: this.props.workshop
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

    componentDidMount() {
        const geos = [this.state.workshop.location.geo['lng'],this.state.workshop.location.geo['lat']]
        // console.debug(this.state.workshop.location);
        // console.debug("geos ", geos);
        mapboxGl.accessToken = ACCESS_TOKEN;
        map.current = new mapboxGl.Map({
           container: this.mapContainer.current,
           style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
           center: geos, // starting position [lng, lat]
           zoom: 12, // starting zoom
           maxBounds: [[35.383297650238326, 33.83527318407196], [35.629842811007315, 33.928357422091395]]
       });

        const el = document.createElement('div');
        const craft = this.state.workshop.craft_discipline_category[0];
        el.className = 'marker';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.backgroundColor = this.colorMap[craft];
        el.style.borderRadius = '50%';
        el.id = this.state.workshop.ID;
        new mapboxGl.Marker(el).setLngLat(geos).addTo(map.current);


    }

    render() {

        return (


                <div
    ref={this.mapContainer}
    id="map"
    style={{
        position: 'relative',
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',

    }}
    />




        );
    }
}