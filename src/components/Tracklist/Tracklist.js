import React from 'react';
import Track from '../Track/Track.js';
import styles from './Tracklist.css';

function Tracklist(props) {
    
    return (
        <>
            {props.tracks.map((track) => {
                return (
                    <Track 
                        track={track}
                        key={track.id}
                        onTrackAction={props.onTrackAction}
                        addRemove={props.addRemove}
                    />
                )}
            )}
        </>
    )
}

export default Tracklist;