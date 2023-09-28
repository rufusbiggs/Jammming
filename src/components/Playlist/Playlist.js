import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(props) {
    const handleTitleChange = (event) => {
        props.onTitleChange(event.target.value);
    }
    

    return (
        <>
            <input onChange={handleTitleChange} type='text' ></input>
            <Tracklist 
                tracks={props.playlistTracks}
                onTrackAction={props.onRemoveTrack}
                addRemove='-'
            />
            <submit></submit>
        </>
    )
}

export default Playlist;