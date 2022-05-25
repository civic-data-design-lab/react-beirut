import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getAllWorkshops } from '../lib/apiUtils';
import Filter from "../components/Filter";
import React from "react";

const Map = dynamic(() => import('../components/Map'), {
  loading: () => 'Loading...',
  ssr: false,
});


export default class Explore extends React.Component {


    updateMap = (filterData) => {
        this.setState({filteredCraftsParent:filterData.filteredCrafts, startYearParent:filterData.startYear,
            endYearParent:filterData.endYear, toggleParent:filterData.toggleStatus},
            () => console.log(this.state))
    }

    constructor(props) {
        super(props);
        this.updateMap = this.updateMap.bind(this);
        this.state = {
        filteredCraftsParent : ["architectural", "cuisine", "decorative", "fashion", "functional", "furniture", "textiles"],
        startYearParent : 1960,
        endYearParent : 2030,
        toggleParent : false,
    }

    }



    render () {
        return (
            <>
                <Head>
                    <title> Explore | Intangible Heritage Atlas </title>
                </Head>
                <div><Filter callBack={this.updateMap}></Filter></div>
                <div style={{ position: 'absolute', top: 0, left: 0 }}>explore</div>
                <Map workshops={this.props.workshops} filterData={this.state} />
            </>
        )
    }
}



/* Retrieves workshops data from mongodb database */
export async function getServerSideProps() {
  const workshops = await getAllWorkshops();
  return { props: { workshops } };
}


