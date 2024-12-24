import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import logo from "../assets/icons/logo.png";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Slider,
  IconButton,
  Box,
} from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@mui/icons-material";

const spotifyApi = new SpotifyWebApi();

const PodcastPlayer = ({ token, show }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0); // Duration in seconds

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token);
      fetchEpisodes();
    }
  }, [token]);

  const fetchEpisodes = async () => {
    const response = await spotifyApi.getShowEpisodes(show?.id, { market: "US" });
    setEpisodes(response.items);
  };

  const playEpisode = async (episode) => {
    try {
      setCurrentEpisode(episode);
      setDuration(Math.floor(episode.duration_ms / 1000)); // Convert ms to seconds
      setProgress(0); // Reset progress
      setIsPlaying(true);

      await spotifyApi.play({
        uris: [episode.uri],
      });
    } catch (error) {
      console.error("Error playing episode:", error);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await spotifyApi.pause();
        setIsPlaying(false);
      } else {
        await spotifyApi.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const handleSeek = async (newProgress) => {
    try {
      const seekPosition = newProgress * 1000; // Convert seconds to milliseconds
      setProgress(newProgress);
      await spotifyApi.seek(seekPosition);
    } catch (error) {
      console.error("Error seeking:", error);
    }
  };

  const handleSkipForward = async () => {
    try {
      const newProgress = Math.min(progress + 15, duration); // Skip forward 15 seconds
      setProgress(newProgress);
      await handleSeek(newProgress);
    } catch (error) {
      console.error("Error skipping forward:", error);
    }
  };

  const handleSkipBackward = async () => {
    try {
      const newProgress = Math.max(progress - 15, 0); // Skip backward 15 seconds
      setProgress(newProgress);
      await handleSeek(newProgress);
    } catch (error) {
      console.error("Error skipping backward:", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Card style={{ width: 1000, maxWidth: 1000, padding: 16 }}>
      <CardContent>
        {/* Podcast Player Header */}
        <Box display="flex" alignItems="center">
          <img
          //show?.images?.[0]?.url ||
            src={logo}
            alt="Podcast Cover"
            style={{ width: 300, height: 300 }}
          />
          <Box flex={1} marginLeft={1}>
            <Typography variant="h5">{show?.name || "Podcast"}</Typography>
            <Box display="flex" alignItems="center" marginTop={2}>
              <IconButton onClick={handlePlayPause} size="large">
                {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
              </IconButton>
              <IconButton onClick={handleSkipBackward} size="large">
                <SkipPrevious fontSize="large" />
              </IconButton>
              <IconButton onClick={handleSkipForward} size="large">
                <SkipNext fontSize="large" />
              </IconButton>
              <Box flex={1} marginX={2}>
                <Slider
                  value={(progress / duration) * 100}
                  onChange={(_, newValue) => handleSeek((newValue / 100) * duration)}
                />
              </Box>
              <Typography variant="body2">
                {formatTime(progress)} / {formatTime(duration)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Episode List */}
        <List style={{ marginTop: 16 }}>
          {episodes.map((episode) => (
            <ListItem
              key={episode.id}
              button
              onClick={() => playEpisode(episode)}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                marginBottom: 8,
                padding: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ListItemText
                primary={episode.name}
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondaryTypographyProps={{ color: "text.secondary" }}
                secondary={episode.description}
              />
              <Typography variant="body2" style={{ minWidth: 50, textAlign: "right" }}>
                {formatTime(Math.floor(episode.duration_ms / 1000))} {/* Actual episode duration */}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PodcastPlayer;
