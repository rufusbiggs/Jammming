import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Tracklist from './Tracklist';

afterEach(cleanup);

// setup mock list of tracks
const tracks = [
    { id: 'id 1', name: 'name 1', artist: 'artist 1', album: 'album 1' },
    { id: 'id 2', name: 'name 2', artist: 'artist 2', album: 'album 2' }
];
const onTrackAction = jest.fn(); // mock onTrackAction
const addRemove = '+'; // mock addRemove button

it ('Displays list of tracks', () => {
    // Exercise
    render(<Tracklist tracks={tracks} onTrackAction={onTrackAction} addRemove={addRemove} />);

    // check each track displays info
    tracks.forEach(track => {
        const trackName = screen.getByText(track.name);
        const trackArtistAlbum = screen.getByText(track.artist + ' | ' + track.album);
        // check track details are present
        expect(trackName).toBeInTheDocument();
        expect(trackArtistAlbum).toBeInTheDocument();
    })
    
});

it ('Includes add button for each track', () => {
    render(<Tracklist tracks={tracks} onTrackAction={onTrackAction} addRemove={addRemove} />);
    const addButton = screen.getAllByText(addRemove);
    expect(addButton.length).toBe(tracks.length);
});
