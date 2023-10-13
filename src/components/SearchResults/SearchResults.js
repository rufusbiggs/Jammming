import React from 'react';
import Tracklist from '../Tracklist/Tracklist';


function SearchResults(props) {
    return (
        <>
            <Tracklist 
                tracks={props.searchTracks}
                onTrackAction={props.onAddTrack}
                addRemove='+'
            />
        </>
    )
}

export default SearchResults;