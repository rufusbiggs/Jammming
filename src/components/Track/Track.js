import React from 'react';
import './Track.css';

function Track(props) {

    const handleTrackAction = () => {
        props.onTrackAction(props.track);
    }

    return (
        <>
            <div className="track-div">
                <div className="track-left">
                    <h3 className="title">{props.track.name}</h3>
                    <p className="artist-album">{props.track.artist} | {props.track.album}</p>
                </div>
                <div className="track-right">
                    <button onClick={handleTrackAction} className="button">{props.addRemove}</button>
                </div>
            </div>
            
        </>
    );
}

export default Track;