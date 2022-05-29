import Head from 'next/head';
import dynamic from 'next/dynamic';
import {getAllArchives, getAllWorkshops} from '../../lib/apiUtils';
import MapFilter from "../../components/explore/MapFilter";
import React from "react";
import SearchBar from "../../components/explore/SearchBar";
import MapCard from "../../components/explore/MapCard";


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
            filteredCraftsParent : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
            startYearParent : 1900,
            endYearParent : 2030,
            toggleParent : false,
            search: '',
            on: false,
            showMapCard: false,
            id: null,
            type: null,
            workshop:null
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
        this.setState({on: !this.state.on})
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
            if (this.state.showMapCard) {
                if (this.state.id === id) {
                    this.setState({showMapCard:false, id:null, type: null})
                } else {
                    this.setState({showMapCard:true, id:id, type:type}, () => {

                        if (this.state.type === 'workshop') {
                            fetch(`/api/workshops/${this.state.id}`)
                            .then((res) => res.json())
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(() => console.log(this.state.workshop))
                        } else {
                            fetch(`/api/archive/${this.state.id}`)
                            .then((res) => res.json())
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(() => console.log(this.state.workshop))
                        }


                });
                }
            } else {
                this.setState({showMapCard:true, id:id, type:type}, () => {

                        if (this.state.type === 'workshop') {
                            fetch(`/api/workshops/${this.state.id}`)
                            .then((res) => res.json())
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(() => console.log(this.state.workshop))
                        } else {
                            fetch(`/api/archive/${this.state.id}`)
                            .then((res) => res.json())
                            .then((res) => this.setState({workshop:res['response']}))
                            .then(() => console.log(this.state.workshop))
                        }

                });

            }
        }

    closeMapCard = () => {
            this.setState({showMapCard:false, id:null})
    }







    render () {

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
                        <title>Explore | Intangible Heritage Atlas</title>
                    </Head>
                    <div>
                        <Map workshops={this.props.workshops} archives={this.props.archives} filterSearchData={filterSearchData} openMapCard={this.openMapCard} />
                        { this.state.on ? <MapFilter
                            filteredCrafts={this.state.filteredCraftsParent} startYear={this.state.startYearParent} endYear={this.state.endYearParent} toggleStatus={this.state.toggleParent} search={this.state.search}
                            updateCrafts={this.updateCrafts} updateYears={this.updateYears} updateToggle={this.updateToggle} closeFilter={this.closeFilter} triggerReset={this.triggerReset} />  : null }
                        <SearchBar callBack={this.searchMap}/>

                        <div className={'filterSection'}>
                            <button className={'filterButton'} onClick={this.toggleFilterPanel}>filter</button>
                            <button className={'filterButton'}>layers</button>
                        </div>

                        { this.state.showMapCard ? <MapCard id={this.state.id} type={this.state.type} workshop={this.state.workshop} closeMapCard={this.closeMapCard}/> : null}



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
