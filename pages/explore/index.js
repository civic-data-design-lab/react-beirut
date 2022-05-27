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
        this.setState({filteredCraftsParent:filterData.filteredCrafts, startYearParent:filterData.startYear,
            endYearParent:filterData.endYear, toggleParent:filterData.toggleStatus},
            () => console.log(this.state))
    }

    searchMap = (searchQuery) => {
        this.setState({search:searchQuery}, () => console.log(this.state.search))
    }

    constructor(props) {
        super(props);
        this.updateMap = this.updateMap.bind(this);
        this.searchMap = this.searchMap.bind(this);
        this.state = {
        filteredCraftsParent : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
        startYearParent : 1950,
        endYearParent : 2030,
        toggleParent : false,
        search: '',
    }
    }


    render () {
        return (
                <>
                    <Head>
                        <title>Discover | Intangible Heritage Atlas</title>
                    </Head>
                    <div className="container">
                        <Map workshops={this.props.workshops} archives={this.props.archives} filterSearchData={this.state}/>
                        <Filter callBack={this.updateMap}/>
                        <SearchBar callBack={this.searchMap}/>
                    </div>

                    <MapCard></MapCard>



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
