import React, { useState } from 'react';
import './App.css';
import Spotify from '../../utilities/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Footer from '../Footer/Footer'; 


function App() {
  const [searchTracks, setSearchTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

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
    
  async function onSubmit() {
        // save playlist to spotify
        const trackUris = playlistTracks.map(track => `spotify:track:${track.id}`);
        await Spotify.savePlaylist(playlistTitle, trackUris);
        setPlaylistTracks([]);
        setPlaylistTitle("");
  }
  

  return (
    <div className='App'>
      <div className="title-container">
        <h1 className='page-title'>JAMMMING</h1>
      </div>

      <div className='columns'>
        <div className="left">
          <div className='search-bar-container'>
            <SearchBar 
              className='SearchBar'
              searchSpotify={searchSpotify}
            />
          </div>
          <SearchResults 
            className='SearchResults' 
            searchTracks={searchTracks}
            onAddTrack={onAddTrack}
          />
        </div>
    
        <div className="right">
          <div className='Playlist'>
            <Playlist 
              playlistTitle={playlistTitle}
              onTitleChange={updatePlaylistTitle}
              playlistTracks={playlistTracks}
              onRemoveTrack={onRemoveTrack}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
      
      <div className="footer-container">
        <Footer />
      </div>
      
    </div>
  );
}

export default App;
