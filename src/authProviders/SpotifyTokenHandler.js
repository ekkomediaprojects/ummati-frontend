import { useEffect } from "react";
import axios from "axios";

const SpotifyTokenHandler = () => {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;  // Your Spotify Client ID
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;  // Your Spotify Client Secret
  const credentials = btoa(client_id + ':' + client_secret);  // Base64 encode clientId:clientSecret
  const redirectUri = 'http://localhost:3000/';  // Same as in the auth URL
  
  const exchangeCodeForToken = async (code) => {
    
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: code, 
          redirect_uri: redirectUri,
        }),
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const expiresIn = response?.data?.expires_in;

      // Store the access token and refresh token
      localStorage.setItem('AccessToken', accessToken);
      localStorage.setItem('RefreshToken', refreshToken);
      localStorage.setItem('TokenExpiry', Date.now() + expiresIn * 1000);

      // Set up token refresh before expiration
      setTimeout(() => refreshAccessToken(refreshToken), expiresIn * 1000 - 60000);
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const newAccessToken = response?.data?.access_token;
      const newExpiresIn = response?.data?.expires_in;

      // Update access token and expiration time
      localStorage.setItem('AccessToken', newAccessToken);
      localStorage.setItem('TokenExpiry', Date.now() + newExpiresIn * 1000);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');  // Get the authorization code from the URL

    if (!code) {
      let url = 'https://accounts.spotify.com/authorize';
      url += "?client_id=" + client_id;
      url += "&response_type=code";
      url += "&redirect_uri=" + encodeURI(redirectUri);
      url += "&show_dialog=false";
      url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
      window.location.href = url;
    } else {
      exchangeCodeForToken(code);
    }
  }, []);

  return null; 
};

export default SpotifyTokenHandler;
