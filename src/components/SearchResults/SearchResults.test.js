import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

afterEach(cleanup);

it ('displays list of searched tracks', () => {
    // mock list of tracks
    const searchTracks = [
        { id: 'id 1', name: 'name 1', artist: 'artist 1', album: 'album 1' },
        { id: 'id 2', name: 'name 2', artist: 'artist 2', album: 'album 2' }
    ];

    // setup 
    const onAddTrack = jest.fn();
    const tracklistComponent = render(<SearchResults searchTracks={searchTracks} onAddTrack={onAddTrack} />);

    searchTracks.forEach(track => {
        const trackTitle = screen.getByText(track.name)
        expect(trackTitle).toBeInTheDocument();
    });
});
