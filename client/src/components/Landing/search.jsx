import React, { useState } from 'react';
import Axios from 'axios';
import styles from './search.css';

const Search = ({ setSearchItems }) => {
    const [search, setSearch] = useState('');
    const getItems = (event) => {
        event.preventDefault();
        var searchedWord = search.toLowerCase();
        var searchArr = [];
        Axios.get(`/items/`)
            .then(res => {
                res.data.map(item => {
                    //checks for null values that might cause bugs
                    if (item.claimedBy === null && item.pickedUp !== true 
                        && item.name !== null && item.Description !== undefined
                        && item.category !== null)
                        if(item.name.toLowerCase().includes(searchedWord)
                        || item.Description.toLowerCase().includes(searchedWord) 
                        || item.category.toLowerCase().includes(searchedWord)) {
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

    const onSearchChange = (event) => {
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
                        placeholder="Search for donations.."
                        name="search"
                        value={search}
                        aria-label="Search: suggestions appear below"
                    />
                    <button
                        onClick={(event) => getItems(event)}
                        className={styles.searchButton}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                </form>
            </span>
        </div>
    );
};

export default Search;