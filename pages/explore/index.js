import Head from 'next/head';
import dynamic from 'next/dynamic';
import {getAllArchives, getAllWorkshops} from '../../lib/apiUtils';
import Filter from "../../components/explore/Filter";
import React from "react";
import SearchBar from "../../components/explore/SearchBar";
import MapCard from "../../components/explore/MapCard";
import Layout from '../../components/layout/Layout';



const Map = dynamic(() => import('../../components/explore/Map'), {
  loading: () => 'Loading...',
  ssr: false,
});

export default class Explore extends React.Component {



    updateMap = (filterData) => {
        this.setState({
                filterData : {
                    'filteredCraftsParent' : filterData.filteredCrafts,
                    'startYearParent' : filterData.startYear,
                    'endYearParent' : filterData.endYear,
                    'toggleParent' : filterData.toggleStatus,
                    'search': ''
                }

            },
            () => console.log(this.state))
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

    constructor(props) {
        super(props);
        this.updateMap = this.updateMap.bind(this);
        this.searchMap = this.searchMap.bind(this);
        this.state = {

        filterData : {
            'filteredCraftsParent' : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
            'startYearParent' : 1950,
            'endYearParent' : 2030,
            'toggleParent' : false,

        },
        search: '',
        on: false,


    }
    }


    render () {
        return (
                <>
                    <Head>
                        <title>Explore | Intangible Heritage Atlas</title>
                    </Head>
                    <div>
                        <Map workshops={this.props.workshops} archives={this.props.archives} filterData={this.state.filterData} searchData={this.state.search}/>
                        { this.state.on ? <Filter settings={this.state.filterData} callBack={this.updateMap} closeFilter={this.closeFilter}/>  : null }
                        <SearchBar callBack={this.searchMap}/>

                        <div className={'filterSection'}>
                            <button className={'filterButton'} onClick={this.toggleFilterPanel}>filter</button>
                            <button className={'filterButton'}>layers</button>
                        </div>

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
