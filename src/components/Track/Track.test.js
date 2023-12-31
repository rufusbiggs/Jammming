import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Track from './Track';

// teardown
afterEach(cleanup);

// setup
const track = {
    name: 'Test Song',
    artist: 'Test Artist',
    album: 'Test Album',
};
const onTrackAction = jest.fn();
const addRemove = '+';

it ('displays track title', () => {
    // exercise
    render(<Track track={track} />);
    const title = document.querySelector('h3');
    // verify
    expect(title).toHaveTextContent(track.name);
});

it ('displays artist and album', () => {
    // exercise
    render(<Track track={track} />);
    const artistAlbum = document.querySelector('p');
    // verify
    expect(artistAlbum).toHaveTextContent(track.artist + ' | ' + track.album);
});

it ('displays the addRemove button', () => {
    // exercise
    render(<Track track={track} addRemove={addRemove} />);
    const button = document.querySelector('button');
    // verify
    expect(button).toHaveTextContent(addRemove);

});

it ('checks if handleTrackAction is called when button is clicked', () => {
    // exercise
    render(<Track track={track} onTrackAction={onTrackAction} addRemove={addRemove} />);
    const button = document.querySelector('button');
    fireEvent.click(button);
    // verify
    expect(onTrackAction).toHaveBeenCalledWith(track);
});

