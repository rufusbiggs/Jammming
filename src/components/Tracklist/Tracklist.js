import React from 'react';
import Track from '../Track/Track.js';
import './Tracklist.css';

function Tracklist(props) {
    
    return (
        <div className="tracklist-div">
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
        </div>
    )
}

export default Tracklist;