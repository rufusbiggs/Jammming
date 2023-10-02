import React from 'react';

function SearchBar(props) {
    const handleSearchChange = (event) => {
        props.searchSpotify(event.target.value);
    }

    return (
        <input onChange={handleSearchChange}></input>
    )
}

export default SearchBar;