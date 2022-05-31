import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import CraftFilter from "../explore/filterparts/CraftFilter";
import YearFilter from "../explore/filterparts/YearFilter";
import ActiveFilter from "../explore/filterparts/ActiveFilter";


export default class ImageFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredCrafts : this.props.filteredCrafts,
            startYear : this.props.startYear,
            endYear : this.props.endYear,
            toggleStatus : this.props.toggleStatus};

        }


    render () {
        return (
            <>
                <div className={'image-filter-container'}>
                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>
                        <p>Craft Type</p>
                        <hr/>
                        <CraftFilter filteredCrafts={this.props.filteredCrafts} updateCrafts={this.props.updateCrafts}/>
                    </div>
                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>
                        <p>Time Range</p>
                        <hr/>
                        <YearFilter startYear={this.state.startYear} endYear={this.state.endYear}
                                    updateYears={this.props.updateYears}/>
                    </div>
                    <div className={'image-filter-section'} style={{flexBasis: '30%'}}>
                        <div className={'filter-active-section'}>
                            <p>Only Show Active Businesses</p>
                            <ActiveFilter toggleStatus={this.state.toggleStatus} updateToggle={this.props.updateToggle}/>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
