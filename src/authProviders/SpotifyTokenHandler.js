import { useEffect } from "react";
import axios from "axios";

const SpotifyTokenHandler = () => {
  useEffect(() => {
    const getSpotifyAccessToken = async () => {
      const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
      const credentials = btoa(`${client_id}:${client_secret}`);
      const scope = "user-read-playback-position user-modify-playback-state user-read-email";

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({ grant_type: "client_credentials", scope }),
          { headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const token = response.data?.access_token;
        const expiresIn = response.data?.expires_in;

        localStorage.setItem("AccessToken", token);
        localStorage.setItem("TokenExpiry", Date.now() + expiresIn * 1000);

        setTimeout(getSpotifyAccessToken, expiresIn * 1000 - 60000);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    const existingToken = localStorage.getItem("AccessToken");
    const tokenExpiry = localStorage.getItem("TokenExpiry");

    if (existingToken && tokenExpiry && Date.now() < tokenExpiry) {
      setTimeout(getSpotifyAccessToken, tokenExpiry - Date.now() - 60000);
    } else {
      getSpotifyAccessToken();
    }
  }, []);

  return null; // This component does not render anything.
};

export default SpotifyTokenHandler;
