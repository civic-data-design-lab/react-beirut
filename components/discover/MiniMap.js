import React from "react";
import mapboxGl from "mapbox-gl";
import mapboxGL from "mapbox-gl/dist/mapbox-gl-unminified";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


export default class MiniMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: this.props.workshop,
            marker: null,
        }
        // this.mapContainer = React.createRef();
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

     checkIfMapboxStyleIsLoaded() {
        return !!map.isStyleLoaded();
    }

    componentDidMount() {

        console.log("mounting minimap");
        console.log('lang from minima is ', this.props.lang)
        let geos = null
        if (this.props.type === "workshop") {
            geos = [this.props.workshop.location.geo['lng'], this.props.workshop.location.geo['lat']]
        } else if (this.props.type === "archive") {
            const {lng, lat} = this.props.workshop.primary_location['geo'];
            geos = [lng, lat]
        }
        console.log("geos ", geos);

        mapboxGl.accessToken = ACCESS_TOKEN;

        if (mapboxGL.getRTLTextPluginStatus() !== 'loaded' && mapboxGL.getRTLTextPluginStatus() !== 'deferred') {
            console.log('here')
            if (mapboxGl.getRTLTextPluginStatus() === 'unavailable'){
                console.log('here again')
                mapboxGl.setRTLTextPlugin(
                'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
                null,
                true // Lazy load the plugin
            );
            }
        }


        let map = new mapboxGl.Map({
            container: 'map', //this.mapContainer.current,
            style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
            center: geos, // starting position [lng, lat]
            zoom: 12.2, // starting zoom
            //maxBounds: [[35.383297650238326, 33.83527318407196], [35.629842811007315, 33.928357422091395]]
        });

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
                firstCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);

            } else {
                const craft = this.props.workshop.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft.toLowerCase()];

            }
        el.className = 'marker';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.backgroundColor = this.colorMap[craft];
        el.style.borderRadius = '50%';
        el.className = 'hoverMarker--white';
        el.id = this.state.workshop.ID;
        let marker = new mapboxGl.Marker(el).setLngLat(geos).addTo(map);
        this.setState({marker:marker})







    }

    componentDidUpdate(prevProps, prevState, snapshot) {





        if (prevProps.workshop !== this.props.workshop) {
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

            mapboxGl.accessToken = ACCESS_TOKEN;

            if (mapboxGL.getRTLTextPluginStatus() !== 'loaded' && mapboxGL.getRTLTextPluginStatus() !== 'deferred') {
            console.log('here')
            if (mapboxGl.getRTLTextPluginStatus() === 'unavailable'){
                console.log('here again')
                mapboxGl.setRTLTextPlugin(
                'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
                null,
                true // Lazy load the plugin
            );
            }
        }


            let map = new mapboxGl.Map({
                container: 'map', //this.mapContainer.current,
                style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
                center: geos, // starting position [lng, lat]
                zoom: 12.2, // starting zoom
                //maxBounds: [[35.383297650238326, 33.83527318407196], [35.629842811007315, 33.928357422091395]]
            });

            map.on('load', ()=>{
                map.getStyle().layers.forEach((layer) => {
                if (layer.layout && layer.layout['text-field']) {
                    map.setLayoutProperty(layer.id, 'text-field', [
                        'get',
                        `name_${this.props.i18n.language}`
                    ]);
                }
            });
            })

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
                firstCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[this.props.workshop.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                const craft = this.props.workshop.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft.toLowerCase()];

            }
            el.className = 'marker';
            el.style.width = '10px';
            el.style.height = '10px';
            el.style.backgroundColor = this.colorMap[craft];
            el.style.borderRadius = '50%';
            el.id = this.state.workshop.ID;
            el.className = 'hoverMarker--white';

            let marker = new mapboxGl.Marker(el).setLngLat(geos).addTo(map);
            this.setState({marker:marker})
            map.flyTo({center:geos});
        }
        }

   //     let check = this.checkIfMapboxStyleIsLoaded();
   //      if (!check) {
             // It's not safe to manipulate layers yet, so wait 200ms and then check again
    //setTimeout(() => {
  //    const layouts = ['country-label', 'state-label', 'settlement-subdivision-label', 'airport-label',
  //              'poi-label', 'water-point-label', 'water-line-label', 'natural-point-label', 'natural-line-label', 'waterway-label' , 'road-label' ]
   //         layouts.map((layout)=> {
  //              map.current.setLayoutProperty(layout, 'text-field', [
 //           'get',
  //          `name_${this.props.i18n.language}`
  //          ]);
  //           })
  //  }, 400);
  //  return;
 // } else {
 //            const layouts = ['country-label', 'state-label', 'settlement-subdivision-label', 'airport-label',
 //               'poi-label', 'water-point-label', 'water-line-label', 'natural-point-label', 'natural-line-label', 'waterway-label' , 'road-label' ]
 //           layouts.map((layout)=> {
 //               map.current.setLayoutProperty(layout, 'text-field', [
 //           'get',
 //           `name_${this.props.i18n.language}`
 //           ]);


  //           })
  //       }

}






    render() {

        return (


                <div
    // ref={this.mapContainer}
    id="map"
    className={'miniMap'}
    />
        );
    }
}