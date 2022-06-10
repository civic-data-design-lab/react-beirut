import React, {useRef} from 'react';
import mapboxGl from "mapbox-gl";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;




export default class App extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            activeLayer: null,
            showMapCard: false,
            width: window.innerWidth,
            height: window.innerHeight,

        }

        this.mapContainer = React.createRef();
        this.mappedMarkers = [];
        this.colorMap = {
            "architectural": '#91B0D1',
            "cuisine": '#DFBA96',
            "decorative": '#88A384' ,
            "fashion": "#DEC2B4",
            "functional": "#72A1AB",
            "furniture": "#9F8278",
            "textiles": "#EACC74"
        }
        this.clickMarker = this.clickMarker.bind(this)
    }



    handleResize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        }, ()=> console.log("new dimesnsions ", this.state))

    }

    handleClickZoomIn = () => {
        map.current.zoomIn({duration: 1000});
    }

    handleClickZoomOut = () => {
        map.current.zoomOut({duration: 1000});
    }




    clickMarker (e) {
        let el = e.target;
        this.props.openMapCard(el.id, el.type);
    }

    hoverMarker(e) {
        let el = e.target;
        el.classList.add('hoverMarker');
        el.classList.add(`hoverMarker--${el.craft}`);
        //console.log(`hoverMarker--${el.craft}`)
    }

    leaveMarker(e) {
        let el = e.target;
        el.classList.remove('hoverMarker');
        el.classList.remove(`hoverMarker--${el.craft}`);
        //console.log('exit')
    }


    componentDidMount() {

        window.addEventListener('resize', this.handleResize);

        //console.log('map.js ', this.props.filterSearchData)
        mapboxGl.accessToken = ACCESS_TOKEN;
        map.current = new mapboxGl.Map({
           container: this.mapContainer.current,
           style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
           center: [35.5, 33.893894], // starting position [lng, lat]
           zoom: 12.5, // starting zoom
           //maxBounds: [[35.383297650238326, 33.83527318407196], [35.629842811007315, 33.928357422091395]]
       });



        // add all potential layers as a source

        map.current.on('load', () => {

        const source1920 = map.current.getSource('1920');
        if (!source1920) {
            map.current.addSource('1920', {
            'type': 'raster',
            'url': 'mapbox://mitcivicdata.ddxxt2r8'
             });
        }

        map.current.addLayer({
        'id': '1920',
        'source': '1920',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        }
        });
        });


       if (!this.props.workshops) {
            return;}

       for (const workshop of this.props.workshops) {
            const el = document.createElement('div');

            if (workshop.craft_discipline_category.length >1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[0]]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[1]]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                const craft = workshop.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft];

            }


            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.borderRadius = '50%';
            el.id = workshop.ID;
            el.craft = workshop.craft_discipline_category[0];
            el.onclick = this.clickMarker;
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;

            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                return;
            }

            const {lng, lat} = workshop.location.geo;
            if (lat && lng && workshop.images.length>0) {
                el.lng = lng;
                el.lat = lat;
                el.type = 'workshop';
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
                firstCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[0]]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[1]]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                const craft = archive.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft];

            }



            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.backgroundColor = this.colorMap[craft];
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = archive.ID;
            el.craft = archive.craft_discipline_category[0];
            el.onClick=()=>this.clickMarker(el);
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;

            if (archive.ID === "A397612231") {
                console.warn(`${archive.ID} is ignored`);
                return;
            }
            if (!archive.primary_location['geo']) {
                console.warn(`${archive.ID} has no geo location`);
                return;
            }

            const {lng, lat} = archive.primary_location['geo'];
            if (lat && lng && archive.images.length>0) {
                el.lng = lng;
                el.lat = lat;
                el.type = 'archive'
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker)
            }
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.coords && prevProps.coords !== this.props.coords) {
            if (this.props.coords[0] !== 35.5 && this.props.coords[1] !== 33.893894) {
                map.current.flyTo({
                    center: this.props.coords,
                    zoom: 16,
                    offset: (687<this.state.width && this.state.width<992)?[0, this.state.height*0.30]:[0,0],
                    bearing: 0,
                    speed: 0.5, // make the flying slow
                    curve: 1, // change the speed at which it zooms out
                    essential: true
                })
            } else if (this.props.coords[0] === 35.5 && this.props.coords[1] === 33.893894) {
                map.current.flyTo({
                    center: this.props.coords,
                    zoom: 12.5,
                    bearing: 0,
                    speed: 0.5, // make the flying slow
                    curve: 1, // change the speed at which it zooms out
                    essential: true
                })
            }
        }




         // change visibility of layer
        if (this.props.mapLayer) {
            if (this.state.activeLayer) {
                map.current.setLayoutProperty(this.state.activeLayer, 'visibility', 'none');
                map.current.setLayoutProperty(this.props.mapLayer, 'visibility', 'visible');
                this.setState({activeLayer:this.props.mapLayer})
            } else {
                map.current.setLayoutProperty(this.props.mapLayer, 'visibility', 'visible');
                this.setState({activeLayer:this.props.mapLayer})}
        } else if (this.state.activeLayer) {
                map.current.setLayoutProperty(this.state.activeLayer, 'visibility', 'none');
                this.setState({activeLayer:this.state.activeLayer})
        }


         // load workshop markers
        //console.log(this.props);
        if (!this.props.workshops) {
            return;}

        if (this.mappedMarkers) {
            this.mappedMarkers.forEach((marker) => marker.remove());
        }

        for (const workshop of this.props.workshops) {
            const el = document.createElement('div');

            if (workshop.craft_discipline_category.length >1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[0]]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[1]]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                const craft = workshop.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft];

            }

            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = workshop.ID;
            el.craft = workshop.craft_discipline_category[0];
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;


            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                continue;
            }

            const craftType = workshop.craft_discipline_category;
            const {lng, lat} = workshop.location.geo;
            const indices = craftType.map((craft)=>{return this.props.filterSearchData['filteredCraftsParent'].indexOf(craft)});
            const start = this.props.filterSearchData['startYearParent'];
            const end = this.props.filterSearchData['endYearParent'];
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
                if (this.props.filterSearchData['toggleStatusParent'] && workshop.shop_status!=="open") {
                    continue;
                }

                let lookup = this.props.filterSearchData['search']
                let shopName = workshop.shop_name['content']
                let shopOrig = workshop.shop_name['content_orig']



                if (workshop.images.length>0 && (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())))) {
                    el.lng = lng;
                    el.lat = lat;
                    el.type = 'workshop';
                    let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                    this.mappedMarkers.push(marker);
                    //console.log(shopName, shopOrig)
                }

            }
        }

        for (const archive of this.props.archives) {
            const craft = archive.craft_discipline_category[0];
            const el = document.createElement('div');

            if (archive.craft_discipline_category.length >1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[0]]}`;
                firstCraft.style.width = `7.5px`;
                firstCraft.style.height = `15px`;
                secondCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[1]]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                const craft = archive.craft_discipline_category[0];
                el.style.backgroundColor = this.colorMap[craft];

            }

            el.className = 'marker';
            el.style.width = '15px';
            el.style.height = '15px';
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = archive.ID;
            el.craft = archive.craft_discipline_category[0];
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;



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
            const indices = craftType.map((craft)=>{return this.props.filterSearchData['filteredCraftsParent'].indexOf(craft)});
            const start = this.props.filterSearchData['startYearParent'];
            const end = this.props.filterSearchData['endYearParent'];
            let withinInterval = null;

            if ((start <= archive.primary_year || start <= archive.primary_decade[0])  && (archive.primary_year <= end || archive.primary_decade[0] <= end)) {
                    withinInterval = true;
            } else {
                    withinInterval = false;
                    }


            if (lat && lng && (indices[0]>-1 || (indices.length>1 && indices[1]>-1)) && withinInterval) {
                if (this.props.filterSearchData['toggleStatusParent']) {
                    continue;
                }

                let lookup = this.props.filterSearchData['search']
                let shopName = archive.shop_name['content']
                let shopOrig = archive.shop_name['content_orig']



                if (archive.images.length>0 && (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())))) {
                    el.lng = lng;
                    el.lat = lat;
                    el.type = 'archive';
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
            <div ref={this.mapContainer} id="map" className={'exploreMap'}/>
                {this.state.width>688 ?
                    <div className={"nav-ctr-container"}>
                        <button className={"nav-ctr-btn zoom-in-btn"} onClick={this.handleClickZoomIn}>
                            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.86719 3.76562V5.46094H0.0703125V3.76562H7.86719ZM4.88281 0.578125V8.85938H3.0625V0.578125H4.88281Z" fill="#471E10"/>
                            </svg>

                        </button>
                        <button className={"nav-ctr-btn zoom-out-btn"} onClick={this.handleClickZoomOut}>
                            <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.03906 0.390625V1.89062H0.90625V0.390625H5.03906Z" fill="#471E10"/>
                            </svg>
                        </button>
                    </div> : null}
            </>



        );
    }

}
