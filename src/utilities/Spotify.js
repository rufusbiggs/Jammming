
var client_id = '28a152cd9bcc46a6bad8062249032719';
var redirect_uri = 'http://localhost:3000';
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
}

export default Spotify;




// http://localhost:3000/#access_token=BQDzffa-29LcdGVEExjfqZl59IKaiAxPPbrcha6zIYN-jJDje_6Ek1Lwe7rZRZQxfwQu_83w4BX7dD-IU9oGwQK2wp55iFx2kItVRQuDunsFK3h_qQg6XfgII8dik-hyEd0ttvgh5mMbyckpQo_njB0ONu18iTcHEjkpMyQAJuIuA64&token_type=Bearer&expires_in=3600