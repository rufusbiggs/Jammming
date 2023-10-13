import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

function Playlist(props) {
    const handleTitleChange = (event) => {
        props.onTitleChange(event.target.value);
    }
    

    return (
        <div className="playlist-div">
            <input onChange={handleTitleChange} type='text' className="underline-title-input"></input>
            <Tracklist 
                tracks={props.playlistTracks}
                onTrackAction={props.onRemoveTrack}
                addRemove='-'
            />
            <submit></submit>
        </div>
    )
}

export default Playlist;