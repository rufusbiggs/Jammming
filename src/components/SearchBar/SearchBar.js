import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const handleSearchChange = (event) => {
        (event.target.value !== '') && props.searchSpotify(event.target.value);
    }

    return (
        <div className='search-container'>
            <input type="text" className="underline-search-input" placeholder="Search" onChange={handleSearchChange}></input>
            <span className="search-icon">&#128269;</span>
        </div>
    )
}

export default SearchBar;