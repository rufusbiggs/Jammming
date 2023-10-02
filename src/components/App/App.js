import React, { useState } from 'react';
import './App.css';
import Spotify from '../../utilities/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { trackData } from '../TestTrackData'; // mock data for implementation
import {searchData} from '../SearchedTracksData'; // mock data for implementation


function App() {
  const [searchTracks, setSearchTracks] = useState(searchData);
  const [playlistTitle, setPlaylistTitle] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState(trackData);

  async function searchSpotify(searchInput) {
    const searchResults = await Spotify.search(searchInput);
    setSearchTracks(searchResults);
  }

  const updatePlaylistTitle = (playlistTitleInput) => {
    setPlaylistTitle(playlistTitleInput);
  }

  const onAddTrack = (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
        return;
      }

      else setPlaylistTracks(prevPlaylistTracks => [...prevPlaylistTracks, track]);
  }

  const onRemoveTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(prevTrack => prevTrack.id !== track.id));
  }
    
  

  return (
    <div className='App'>
      <SearchBar 
        className='SearchBar'
        searchSpotify={searchSpotify}
      />
      <SearchResults 
        className='SearchResults' 
        searchTracks={searchTracks}
        onAddTrack={onAddTrack}
      />

      <div className='Playlist'>
        <Playlist 
          playlistTitle={playlistTitle}
          onTitleChange={updatePlaylistTitle}
          playlistTracks={playlistTracks}
          onRemoveTrack={onRemoveTrack}
        />
      </div>
    </div>
  );
}

export default App;
