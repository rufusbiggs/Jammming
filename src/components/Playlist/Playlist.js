import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

function Playlist(props) {
    const handleTitleChange = (event) => {
        props.onTitleChange(event.target.value);
    }

    return (
        <div className="playlist-div">
            <input onChange={handleTitleChange} type='text' name="playlist-title" placeholder="Playlist title" className="underline-title-input" value={props.playlistTitle}></input>
            <Tracklist 
                tracks={props.playlistTracks}
                onTrackAction={props.onRemoveTrack}
                addRemove='-'
            />
            <button onClick={props.onSubmit} type="submit" value="submit" className="submit-button">Save to Spotify</button>
        </div>
    )
}

export default Playlist;