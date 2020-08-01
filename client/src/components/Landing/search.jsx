import React, { useState } from 'react';
import Axios from 'axios';
import styles from './search.css';

const Search = ({ setSearchItems }) => {
   
    //const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');

    const getItems =  (event) => {
        event.preventDefault();
        var searchedWord = search.toLowerCase();
        //console.log(this.state.search)
        var searchArr = [];

        Axios.get(`/items/`)
        .then(res => {
            res.data.map(item => {
                if(item.name.toLowerCase().includes(searchedWord)
                 || item.Description.toLowerCase().includes(searchedWord)) {
                     
                    searchArr.push(item);
                }
            })
        }) 
        .then(res => {
            
            //setSearchData(searchArr);
            setSearch('');
            setSearchItems(searchArr)

        })
        .catch(err => {
            console.log(err)
        })
    };

    const onSearchChange =  (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    
    return (
        <div>
            <span className="searchBarWrap">
                <form className="form" onSubmit={(event) => getItems(event)}>
                    <input
                        autoCorrect="off"
                        autoComplete="off"
                        className={styles.searchBar}
                        onChange={(event) => onSearchChange(event)}
                        type="search"
                        id="search"
                        placeholder="Search"
                        name="search"
                        value={search}
                        aria-label="Search: suggestions appear below"
                    />
                    <button 
                      onClick={(event) => getItems(event)}
                      className={styles.searchButton}
                    >
                      search
                    </button>
                </form>
            </span>
        </div>
    );
};

export default Search;