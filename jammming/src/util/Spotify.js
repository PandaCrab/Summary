// endpoint = /v1/search?type=TRACK
const clientId = '7585ca30dfce4ff1a49e0cc6384be591';
const redirectUri = 'http://unaccountable-point.surge.sh/'
//const redirectURI = 'http://laughable-instrument.surge.sh';

let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
          return accessToken;
        } else {
          //check for access token match
          const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
          const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    
          if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
    
            //this clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
          } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
          }
        }
      },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
            {
            headers: {Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        }).then(response => 
            {
               return response.json()
            }
        ).then(jsonResponse => {
            userID = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name:name })
            }).then(response =>
                {
                   return response.json();
                }
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })
                });
            })
        })
    }

};



export default Spotify;