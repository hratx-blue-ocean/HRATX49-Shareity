import React, { Component } from 'react';
import Axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchData: [],
            search: ''
        };
        this.getItems = this.getItems.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    getItems (event) {
        event.preventDefault();
        var searchedWord = this.state.search.toLowerCase();
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
            this.setState ({
                searchData: searchArr,
                search: ''
            })
            this.props.setSearchItems(this.state.searchData)
            //console.log('search results: ', this.state.searchData)
        })
        .catch(err => {
            console.log(err)
        })
    }

    onSearchChange (event){
        event.preventDefault();
        this.setState ({
            search: event.target.value
        })
        // console.log(this.state.search)
    }

    render() {
    return (
        <div>
            <span className="searchBarWrap">
                <form className="form" onSubmit={(event) => this.getItems(event)}>
                    <input
                        autoCorrect="off"
                        autoComplete="off"
                        className="search"
                        onChange={(event) => this.onSearchChange(event)}
                        type="search"
                        id="search"
                        placeholder="Search"
                        name="search"
                        value={this.state.search}
                        aria-label="Search: suggestions appear below"
                    />
                    <button onClick={(event) => this.getItems(event)}>search</button>
                </form>
            </span>
        </div>
    )
    }
}

export default Search;