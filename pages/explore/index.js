import Head from 'next/head';
import dynamic from 'next/dynamic';
import {getAllArchives, getAllWorkshops} from '../../lib/apiUtils';
import MapFilter from "../../components/explore/MapFilter";
import React from "react";
import SearchBar from "../../components/explore/SearchBar";
import MapCard from "../../components/explore/MapCard";
import LayersControl from "../../components/explore/LayersControl";
import { useMediaQuery } from 'react-responsive'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";


const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 687, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 688 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}



const Map = dynamic(() => import('../../components/explore/Map'), {
  loading: () => 'Loading...',
  ssr: false,
});

export default class Explore extends React.Component {

        constructor(props) {
        super(props);
        this.searchMap = this.searchMap.bind(this);
        this.updateCrafts = this.updateCrafts.bind(this);
        this.updateYears = this.updateYears.bind(this);
        this.updateToggle = this.updateToggle.bind(this);

        this.state = {
            mapLayer : null,
            allLayers : {
                'ca. 1000AD': 'Écochard, M. (1943). Medieval gates and fortifications of Beirut. Item S806531, Michel Écochard Archive. Massachusetts Institute of Technology, Aga Khan Documentation Center. Cambridge (MA), USA.',
                '1876' : 'Löytved, J., Stuckly, A. (1876). Map of Beirut dedicated to His Imperial Majesty Sultan Abdul Hamid II (Trans.). Item GE D 16879, (60 x 35cm), C Register. National Library of France. Paris, France.',
                '1920': "Armée Française du Levant. Bureau Topographique. (1920). Beirut (Trans.). Item GE C-5752, (82 x 57cm). National Library of France, Departments of Maps and Plans. Paris, France.",

            },
            coords: [35.5, 33.893894],

            toggleReset: false,
            filteredCraftsParent : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
            startYearParent : 1910,
            endYearParent : 2030,
            toggleParent : false,
            search: '',
            on: false,
            showMapCard: false,
            id: null,
            type: null,
            workshop:null,
            showLayersControl: false
        }
    }

    updateMapLayer = (mapLayer) => {
            if (mapLayer === this.state.mapLayer) {
                this.setState({mapLayer:null})
            } else {
                this.setState({mapLayer:mapLayer})
            }
    }


    updateCrafts = (craftData) => {
        this.setState({
            filteredCraftsParent : craftData
            }, () => console.log("index.js", this.state.filteredCraftsParent))}

    updateYears = (yearData) => {
        this.setState({
            startYearParent: yearData[0],
            endYearParent: yearData[1]
        }, () => console.log("index.js", this.state))}

    updateToggle = (toggleData) => {
        this.setState({
            toggleParent: toggleData
        }, () => console.log("index.js", this.state))
    }



    searchMap = (searchQuery) => {
        this.setState({search:searchQuery}, () => console.log(this.state.search))
    }

    toggleFilterPanel = () => {
        this.setState({on: !this.state.on}, ()=> (this.state.on ? this.setState({showLayersControl:false}) : null))

    }



    closeFilter = () => {
        this.setState({on: false})
    }

    triggerReset = () => {
        this.setState({
            filteredCraftsParent : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
            startYearParent : 1920,
            endYearParent : 2030,
            toggleParent : false,
        })

    }

    openMapCard = (id, type) => {

            //this.setState({showMapCard:false, id:null, type: null, coords: [35.5, 33.893894]})
            if (this.state.showMapCard) {
                if (this.state.id === id) {
                    this.setState({showMapCard:false, id:null, type: null, coords: [35.5, 33.893894]})


                } else {

                    this.setState({showMapCard:true, id:id, type:type}, () => {

                        if (this.state.type === 'workshop') {
                            fetch(`/api/workshops/${this.state.id}`)
                            .then((res) => res.json())
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(()=> this.setState({coords:[this.state.workshop.location.geo['lng'], this.state.workshop.location.geo['lat']]}))
                            .then(() => console.log(this.state))
                        } else {
                            fetch(`/api/archive/${this.state.id}`)
                            .then((res) => res.json())
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(()=> this.setState({coords:[this.state.workshop.primary_location.geo['lng'], this.state.workshop.primary_location.geo['lat']]}))
                            .then(() => console.log(this.state))
                        }


                });
                }
            } else {
                //this.setState({showMapCard:false, id:null, type: null})
                this.setState({showMapCard:true, id:id, type:type}, () => {

                        if (this.state.type === 'workshop') {
                            fetch(`/api/workshops/${this.state.id}`)
                            .then((res) => res.json())
                                //.then((res)=>console.log("response ", res['response'].location.geo))
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(()=> this.setState({coords:[this.state.workshop.location.geo['lng'], this.state.workshop.location.geo['lat']]}))
                            .then(() => console.log(this.state))
                        } else {
                            fetch(`/api/archive/${this.state.id}`)
                            .then((res) => res.json())
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(()=> this.setState({coords:[this.state.workshop.primary_location.geo['lng'], this.state.workshop.primary_location.geo['lat']]}))
                            .then(() => console.log(this.state))
                        }

                });

            }
        }

    closeMapCard = () => {
            this.setState({showMapCard:false, id:null})
    }

    toggleLayersControl = () => {
            this.setState({showLayersControl: !this.state.showLayersControl}, ()=> (this.state.showLayersControl ? this.setState({on:false}) : null))

    }

    openLayersControl = () => {
            this.setState({on:false, id:null, showLayersControl:true })
    }

    closeLayersControl = () => {
            this.setState({showLayersControl:false})
    }

    onReset = () => {
        //const defaultCrafts = ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"]
        //for (const craft of defaultCrafts) {
        //    let button = document.getElementById(`${craft}-btn`)
        //    button.className=`hstg-btn-pill-small-selected hstg-btn-pill-small-selected--${craft}`
        //}

        console.log("triggered reset fxn")

        this.setState({
            filteredCraftsParent : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
            startYearParent : 1910,
            endYearParent : 2030,
            toggleParent : false,
            toggleReset: !this.state.toggleReset
        });

        //this.resetToggle();
        //this.props.triggerReset();
    }







    render () {

            console.log("state from inde ", this.state)

            const filterSearchData = {
                'filteredCraftsParent' : this.state.filteredCraftsParent,
                'startYearParent' : this.state.startYearParent,
                'endYearParent' : this.state.endYearParent,
                'toggleStatusParent' : this.state.toggleParent,
                'search': this.state.search
            }

        return (
                <>
                    <Head>
                        <title>Map | Intangible Heritage Atlas</title>
                    </Head>
                    <div>
                        <Map mapLayer={this.state.mapLayer} workshops={this.props.workshops} archives={this.props.archives} filterSearchData={filterSearchData} openMapCard={this.openMapCard} coords={this.state.coords} />
                        { this.state.on ? <MapFilter
                            filteredCrafts={this.state.filteredCraftsParent} startYear={this.state.startYearParent} endYear={this.state.endYearParent} toggleStatus={this.state.toggleParent} search={this.state.search}
                            updateCrafts={this.updateCrafts} updateYears={this.updateYears} updateToggle={this.updateToggle} closeFilter={this.closeFilter} triggerReset={this.triggerReset} reset={this.onReset} resetToggle={this.state.toggleReset} />  : null }
                        <SearchBar callBack={this.searchMap}/>

                        <div className={'filterSection'}>
                            <button className={'filterButton filterSettingsButton'} onClick={this.toggleFilterPanel}>
                                <span style={{color:"blue"}}>
                                    <FontAwesomeIcon icon="fa-solid fa-bars-filter" />
                                </span>
                            </button>
                            <button className={'filterButton layerControlButton'} onClick={this.toggleLayersControl}>

                                    <FontAwesomeIcon icon={faLayerGroup} className="layerIcon"/>

                            </button>
                        </div>

                        { (this.state.showMapCard && this.state.workshop && this.state.workshop.images) ? <MapCard id={this.state.id} type={this.state.type} workshop={this.state.workshop} closeMapCard={this.closeMapCard} openMapCard={this.openMapCard}/> : null}

                        { this.state.showLayersControl ? <LayersControl currentLayer={this.state.mapLayer} allLayers={this.state.allLayers} updateMapLayer={this.updateMapLayer} closeLayersControl={this.closeLayersControl}/> : null}


                    </div>

    </>

        )
    }

}

/* Retrieves workshops data from mongodb database */

export async function getServerSideProps() {
  const workshops = await getAllWorkshops();
  const archives = await getAllArchives();
  return { props: { workshops, archives } };
}