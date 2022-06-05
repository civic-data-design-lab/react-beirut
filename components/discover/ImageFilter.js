import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import CraftFilter from "../explore/filterparts/CraftFilter";
import YearFilter from "../explore/filterparts/YearFilter";
import ActiveFilter from "../explore/filterparts/ActiveFilter";
import { useMediaQuery } from 'react-responsive'

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


export default class ImageFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredCrafts : this.props.filteredCrafts,
            startYear : this.props.startYear,
            endYear : this.props.endYear,
            toggleStatus : this.props.toggleStatus};

        }

    getImageFilterContent = () => {
        return (
            <div className={'image-filter-container'}>

                    <Mobile>
                        <div>
                            <button onClick={this.props.close}>close button</button>
                        </div>
                    </Mobile>


                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>


                        <CraftFilter filteredCrafts={this.props.filteredCrafts} updateCrafts={this.props.updateCrafts}/>
                    </div>
                    <div className={'image-filter-section'} style={{flexBasis: '35%'}}>
                        <p>Time Range</p>
                        <hr/>
                        <YearFilter startYear={this.props.startYear} endYear={this.props.endYear}
                                    updateYears={this.props.updateYears}/>
                    </div>
                    <div className={'image-filter-section'} style={{flexBasis: '30%'}}>
                        <div className={'filter-active-section'}>
                            <p>Only Show Active Businesses</p>
                            <ActiveFilter toggleStatus={this.state.toggleStatus} updateToggle={this.props.updateToggle}/>
                        </div>

                        <div>
                            <button onClick={this.props.reset}>Reset Filter</button>
                        </div>

                    </div>
                </div>
        )
    }


    render () {
        return (
            <>
                <Desktop>
                    {this.getImageFilterContent()}
                </Desktop>

                <Mobile>
                    <div className="card">
                          <div className="card__cover">
                            <div className="card__wrapper">
                                {this.getImageFilterContent()}


                            </div>
                          </div>
                        </div>
                </Mobile>

            </>
        )
    }
}
