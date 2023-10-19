import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Playlist from './Playlist';

afterEach(cleanup);

// setup
const playlistTracks = [
    { id: 'id 1', name: 'name 1', artist: 'artist 1', album: 'album 1' },
    { id: 'id 2', name: 'name 2', artist: 'artist 2', album: 'album 2' }
];
const onTitleChange = jest.fn();
const onSubmit = jest.fn();
const addRemove = '-';

it ('Accepts playlist title input and handles changes', () => {
    render(<Playlist playlistTracks={playlistTracks} onTitleChange={onTitleChange} onSubmit={onSubmit} addRemove={addRemove} />);
    const testInput = { target: { value: 'testInput' }};
    const inputField = screen.getByRole('textbox');
    fireEvent.change(inputField, testInput);
    expect(onTitleChange).toBeCalledWith('testInput');
});

it ('Displays playlist tracks', () => {
    render(<Playlist playlistTracks={playlistTracks} onTitleChange={onTitleChange} onSubmit={onSubmit} addRemove={addRemove} />);
    playlistTracks.forEach(track => {
        const trackTitle = screen.getByText(track.name);
        const trackArtistAlbum = screen.getByText(track.artist + ' | ' + track.album);
        expect(trackTitle).toBeInTheDocument();
        expect(trackArtistAlbum).toBeInTheDocument();
    })
});

it ('Has remove button for each track', () => {
    render(<Playlist playlistTracks={playlistTracks} onTitleChange={onTitleChange} onSubmit={onSubmit} addRemove={addRemove} />);
    const removeButton = screen.getAllByText(addRemove);
    expect(removeButton.length).toBe(playlistTracks.length)
});

it ('Submits playlist to spotify, clears title input and tracks', () => {
    render(<Playlist playlistTracks={playlistTracks} onTitleChange={onTitleChange} onSubmit={onSubmit} addRemove={addRemove} />);
    const submitButton = screen.getByText('Save to Spotify');
    fireEvent.click(submitButton);
    // submits playlist
    expect(onSubmit).toHaveBeenCalled();
})