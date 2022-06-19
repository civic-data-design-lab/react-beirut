import React, {useState} from "react";
import i18n from "i18next";
import {initReactI18next, useTranslation} from "react-i18next";
import {TRANSLATIONS} from "../../lib/utils";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);



const SearchBar = ({callBack}) => {

    const { t } = useTranslation();

    const [searchEntry, setSearchEntry] = useState('')



    const inputUpdate = () => {
        let value = document.getElementById('mapSearch').value
        callBack(value)
        //this.setState({searchEntry: value}, () => this.props.callBack(this.state.searchEntry))
    }

    const clearSearch = () => {
        //this.setState({searchEntry: ''}, () => this.props.callBack(this.state.searchEntry))
        callBack('')
        let searchBar = document.getElementById('mapSearch')
        searchBar.value = ''
}

    return (
            <div className={'searchbar'}>
                <span>
                <input id="mapSearch" type="search" placeholder={t("Enter Shop Name")} onChange={inputUpdate}/>
                </span>
            </div>
        )
}

export default SearchBar