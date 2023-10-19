import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

// teardown
afterEach(cleanup);

it ('displays a search input', () => { 
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
});

it ('displays a search icon', () => {
    render(<SearchBar />);
    const searchIcon = screen.getByText('🔍');
    expect(searchIcon).toBeInTheDocument();
});

it ('checks if handleSearchChange is called when input text changes', () => {
    // setup
    const searchSpotify = jest.fn();
    const searchInput = { target: { value: 'Test Search' }};
    // exercise
    render(<SearchBar searchSpotify={searchSpotify} />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, searchInput);
    // verify
    expect(searchSpotify).toHaveBeenCalledWith('Test Search');
})