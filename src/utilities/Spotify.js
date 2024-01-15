
var client_id = '28a152cd9bcc46a6bad8062249032719';
var redirect_uri = 'https://boisterous-medovik-f79b6d.netlify.app';
var scope = "playlist-modify-public";
let accessToken;


class Spotify {
    
    static getAccessToken() {
        // Check if we already have an access token
        if (accessToken){
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
            return accessToken;
        } else {
            let accessUrl = 'https://accounts.spotify.com/authorize';
            accessUrl += '?response_type=token';
            accessUrl += '&client_id=' + client_id;
            accessUrl += '&scope=' + scope;
            accessUrl += '&redirect_uri=' + redirect_uri;
            window.location = accessUrl;
        }
    };

    static async search(searchInput) {
        const token = Spotify.getAccessToken();
        const searchUrl = `https://api.spotify.com/v1/search?q=${searchInput}&type=track`;
        const searchResponse = await fetch(searchUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const jsonResponse = await searchResponse.json();
        if (jsonResponse.tracks.items){
            return jsonResponse.tracks.items.map(track => {
                return ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name
                });
            });
        };
    };

    static async savePlaylist(name, trackUris) {
        if (name && trackUris.length){
            const token = await Spotify.getAccessToken();
            const playlistsUrl = `https://api.spotify.com/v1/me`;
            const playlistResponse = await fetch(playlistsUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Create new playlist
            const playlistJsonResponse = await playlistResponse.json();
            const user_id = playlistJsonResponse.id;
            const createPlaylistUrl = `https://api.spotify.com/v1/users/${user_id}/playlists`;
            const createPlaylistResponse = await fetch(createPlaylistUrl, {
                method: `POST`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    description: `Playlist created in Jammming`,
                    public: true
                })
            });
            // Add tracks to new playlist
            const createPlaylistJsonResponse = await createPlaylistResponse.json();
            const playlist_id = createPlaylistJsonResponse.id;
            const updatePlaylistUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
            await fetch(updatePlaylistUrl, {
                method: `PUT`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: trackUris
                })
            });
        };
    };
}

export default Spotify;
