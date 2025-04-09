import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import logo from "../assets/images/podcasts/Ummati Community-Podcast icon- FF-01.svg";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Slider,
  Button,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Forward10,
  Replay10,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Share as ShareIcon,
  // SpotifyIcon
} from "@mui/icons-material";
import { useSpotifyPlayer } from "../utils/useSpotifyPlayer";

const spotifyApi = new SpotifyWebApi();

const PodcastPlayer = ({ token, show }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0); // Duration in seconds
  const [errorMessage, setErrorMessage] = useState(""); // Duration in seconds
  const [openDialog, setOpenDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const player = useSpotifyPlayer(token);
  console.log("currentEpisode", currentEpisode);
  console.log(player);

  const handleShareClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCopied(false);
  };

  const handleCopyLink = () => {
    const link = window.location.href; // Get the current page link
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true); // Show confirmation message
    });
  };

  const handleShareViaApp = (app) => {
    const link = window.location.href;
    console.log(`Sharing via ${app}: ${link}`);
  };

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token);
      fetchEpisodes();
    }
  }, [token]);

  const fetchEpisodes = async () => {
    const response = await spotifyApi.getShowEpisodes(show?.id, {
      market: "US",
    });
    setEpisodes(response.items);
  };

  const playEpisode = async (episode) => {
    try {
      if (episode == null) setErrorMessage("Please Select Episode to play");
      else setErrorMessage("");
      setCurrentEpisode(episode);
      setDuration(Math.floor(episode.duration_ms / 1000)); // Convert ms to seconds
      setProgress(0); // Reset progress
      setIsPlaying(true);

      // player.togglePlay().then(() => {
      //   console.log('Paused!');
      // });
      await spotifyApi.play({
        uris: [episode.uri],
      });
    } catch (error) {
      console.error("Error playing episode:", error);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (currentEpisode == null)
        setErrorMessage("Please Select Episode to play");
      else setErrorMessage("");
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
      setProgress(parseInt(newProgress));
      await spotifyApi.seek(seekPosition);
    } catch (error) {
      console.error("Error seeking:", error);
    }
  };

  const handleSkipForward = async () => {
    try {

      const newProgress = Math.min( parseInt(progress) + 10, duration); 
      console.log("new progress" , newProgress)
      setProgress(newProgress);
      await handleSeek(newProgress);
    } catch (error) {
      console.error("Error skipping forward:", error);
    }
  };

  const handleSkipBackward = async () => {
    try {
      const newProgress = Math.max(progress - 10, 0); // Skip backward 15 seconds
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
    <Box style={{ width: "100%", maxWidth: "1251px", background: "white" }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        height="100%"
        border="1px solid #C4BAA2"
      >
        {/* Image */}
        <Box
          display="flex"
          justifyContent="center"
          width={{ xs: "100%", sm: "auto" }}
        >
          <img
            src={logo}
            alt="Podcast Cover"
            style={{
              width: "165px",
              maxWidth: "165px",
              height: "auto",
            }}
          />
        </Box>

        {/* Content */}
        <Box
          flex="1"
          justifyContent="center"
          textAlign={{ xs: "center", sm: "left" }}
          width={{ xs: "100%", sm: "auto" }}
        >
          <Typography variant="h5" gutterBottom>
            {show?.name || "Podcast"}
          </Typography>

          {/* Controls */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
          >
            {/* Play/Pause and Skip Buttons */}
            <Box display="flex" justifyContent="center">
              <IconButton
                onClick={handlePlayPause}
                size="large"
                sx={{
                  backgroundColor: " #78B27B",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkgreen",
                  },
                  height: { sm: "30px", md: "55px" },
                  width: { sm: "30px", md: "55px" },
                }}
              >
                {isPlaying ? (
                  <Pause fontSize="medium" />
                ) : (
                  <PlayArrow fontSize="medium" />
                )}
              </IconButton>
            </Box>

            {/* Slider */}
            <Box width="90%" mx={4}>
              <Slider
                value={(progress / duration) * 100}
                onChange={(_, newValue) =>
                  handleSeek((newValue / 100) * duration)
                }
                sx={{
                  "& .MuiSlider-rail": {
                    backgroundColor: "#B0B0B0", // Grey color for the rail (unfilled part of the slider)
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#757575", // Dark grey for the progress (filled part of the slider)
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#616161", // Grey color for the thumb (slider handle)
                  },
                }}
                aria-label="progress-slider"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center" // Align items in a single row
            textAlign={{ xs: "center", sm: "left" }}
            width={{ xs: "100%", sm: "auto" }}
          >
            {/* Backward Skip Icon */}
            <Box display="flex" justifyContent="center">
              <IconButton onClick={handleSkipBackward} size="small">
                <Replay10 fontSize="small" color="black" />
              </IconButton>

              {/* Forward Skip Icon */}
              <IconButton
                onClick={handleSkipForward}
                size="small"
                color="black"
              >
                <Forward10 fontSize="small" color="black"/>
              </IconButton>
              <Button
                color="black"
                startIcon={<ShareIcon />}
                onClick={handleShareClick}
              ></Button>
            </Box>

            {/* Share Options */}
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Share this Link</DialogTitle>
              <DialogContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb={2}
                >
                  {/* Copy Link Button */}
                  <Button onClick={handleCopyLink}>
                    {copied ? "Link Copied!" : "Copy Link"}
                  </Button>
                  {/* Share via Social Media */}
                  <Box display="flex" justifyContent="center" gap={2} mt={2}>
                    <IconButton onClick={() => handleShareViaApp("whatsapp")}>
                      <WhatsAppIcon />
                    </IconButton>
                    <IconButton onClick={() => handleShareViaApp("facebook")}>
                      <FacebookIcon />
                    </IconButton>
                    <IconButton onClick={() => handleShareViaApp("twitter")}>
                      <TwitterIcon />
                    </IconButton>
                    <IconButton onClick={() => handleShareViaApp("email")}>
                      <EmailIcon />
                    </IconButton>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Box>
              {/* Time */}

              <Typography
                color="#757575"
                fontSize="10px"
                fontWeight="400"
                lineHeight="24.41px"
                mx={4}
              >
                {formatTime(progress)} | {formatTime(duration)}
              </Typography>
            </Box>
          </Box>
          {errorMessage && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginTop: "16px" }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Episode List */}
      {episodes.map((episode) => (
        <ListItem
          key={episode.id}
          button
          onClick={() => playEpisode(episode)}
          style={{
            borderTop: "0px",
            borderRight: "1px solid #C4BAA2",
            borderBottom: "1px solid #C4BAA2",
            borderLeft: "1px solid #C4BAA2",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ListItemText
            primary={episode.name}
            primaryTypographyProps={{
              fontWeight: "normal",
              color: "#78B27B",
            }}
          />
          <Typography
            color="#757575"
            fontSize="20px"
            fontWeight="400"
            lineHeight="24.41px"
            style={{ minWidth: 50, textAlign: "right" }}
          >
            {formatTime(Math.floor(episode.duration_ms / 1000))}{" "}
            {/* Actual episode duration */}
          </Typography>
        </ListItem>
      ))}
    </Box>
  );
};

export default PodcastPlayer;
