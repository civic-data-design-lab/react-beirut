import React from "react";
import mapboxGl from "mapbox-gl";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


export default class MiniMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: this.props.workshop,
            marker: null,
        }
        this.mapContainer = React.createRef();
        this.mappedMarkers = [];
        this.colorMap = {
            "architectural": '#91B0D1',
            "cuisine": '#DFBA96',
            "decorative": '#88A384',
            "fashion": "#DEC2B4",
            "functional": "#72A1AB",
            "furniture": "#9F8278",
            "textiles": "#EACC74"

        }
    }

    componentDidMount() {

        console.log("print workshop ", this.props.workshop)
        let geos = null
        if (this.props.type === "workshop") {
            geos = [this.props.workshop.location.geo['lng'], this.props.workshop.location.geo['lat']]
        } else if (this.props.type === "archive") {
            const {lng, lat} = this.props.workshop.primary_location['geo'];
            geos = [lng, lat]
        }
        console.log("geos ", geos);

        mapboxGl.accessToken = ACCESS_TOKEN;
        map.current = new mapboxGl.Map({
           container: this.mapContainer.current,
           style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
           center: geos, // starting position [lng, lat]
           zoom: 12.2, // starting zoom
           //maxBounds: [[35.383297650238326, 33.83527318407196], [35.629842811007315, 33.928357422091395]]
       });

        const el = document.createElement('div');
            const craft = this.props.workshop.craft_discipline_category[0];

            if (this.props.workshop.craft_discipline_category.length > 1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[0]]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[1]]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                const craft = this.props.workshop.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft];

            }
        el.className = 'marker';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.backgroundColor = this.colorMap[craft];
        el.style.borderRadius = '50%';
        el.id = this.state.workshop.ID;
        let marker = new mapboxGl.Marker(el).setLngLat(geos).addTo(map.current);
        this.setState({marker:marker})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            if (this.state.marker) {
            this.state.marker.remove()

            let geos = null;
            if (this.props.type === "workshop") {
                geos = [this.props.workshop.location.geo['lng'], this.props.workshop.location.geo['lat']]
            } else {
                const {lng, lat} = this.props.workshop.primary_location['geo'];
                geos = [lng, lat]
            }
            console.log("geos ", geos);

            const el = document.createElement('div');
            const craft = this.props.workshop.craft_discipline_category[0];

            if (this.props.workshop.craft_discipline_category.length > 1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[0]]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[1]]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                const craft = this.props.workshop.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft];

            }
            el.className = 'marker';
            el.style.width = '10px';
            el.style.height = '10px';
            el.style.backgroundColor = this.colorMap[craft];
            el.style.borderRadius = '50%';
            el.id = this.state.workshop.ID;

            let marker = new mapboxGl.Marker(el).setLngLat(geos).addTo(map.current);
            this.setState({marker:marker})
            map.current.flyTo({center:geos});
        }
        }
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