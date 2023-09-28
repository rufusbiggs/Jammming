import React from 'react';
import styles from './Track.css';

function Track(props) {

    const handleTrackAction = () => {
        props.onTrackAction(props.track);
    }

    return (
        <>
            <div>
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <button onClick={handleTrackAction}>{props.addRemove}</button>
        </>
    );
}

export default Track;