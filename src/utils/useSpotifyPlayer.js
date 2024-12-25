import { useEffect, useState } from "react";
export const useSpotifyPlayer = (token) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    // Ensure window.Spotify is available
  window.onSpotifyWebPlaybackSDKReady = () => {};

    if (window?.Spotify && token) {
      console.log("Spotify SDK is available");

      const spotifyPlayer = new window.Spotify.Player({
        name: "Custom Spotify Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      console.log("spotifyPlayer" , spotifyPlayer)
      spotifyPlayer.addListener("initialization_error", ({ message }) => {
        console.error("Initialization Error:", message);
      });

      // Set up player listeners
      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        localStorage.setItem("device_id", device_id);
        setPlayer(spotifyPlayer); 
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotifyPlayer.addListener("initialization_error", ({ message }) => {
        console.error("Initialization Error:", message);
      });

      spotifyPlayer.addListener("authentication_error", ({ message }) => {
        console.error("Authentication Error:", message);
      });

      
      spotifyPlayer.connect();
      
      return () => {
        console.log("Cleaning up player");
        spotifyPlayer.disconnect();
      };
    } else {
      console.log("Spotify SDK or Token is missing");
    }
  }, [token]);

  console.log("playmer", player)
  return player;
};
