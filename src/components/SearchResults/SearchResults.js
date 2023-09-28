import React from 'react';
import Tracklist from '../Tracklist/Tracklist';


function SearchResults(props) {
    return (
        <>
            <h3>Results</h3>
            <Tracklist 
                tracks={props.searchTracks}
                onTrackAction={props.onAddTrack}
                addRemove='+'
            />
        </>
    )
}

export default SearchResults;