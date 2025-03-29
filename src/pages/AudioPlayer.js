import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Forward30Outlined,
  Replay10Outlined,
} from "@mui/icons-material";
import { Slider, IconButton, Box, Typography } from "@mui/material";
import podcastLogo from "../assets/images/podcasts/Ummati Podcast Logo.svg";

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [waveform, setWaveform] = useState([]);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

   useEffect(() => {
    const generateWaveform = () => {
        let length = 150
        if(matchesSM){
            length = 80
        } else if(matchesMD) {
            length = 130
        } else if (matchesXS){
            length  = 50
        }
      const mockWaveform = Array.from(
        { length },
        () => Math.sign(Math.random() - 0.5) * (Math.random() * 40 + 10)
      );
      setWaveform(mockWaveform);
    };

    generateWaveform();
  }, [matchesMD,matchesSM]);
  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("play", () => setIsPlaying(true));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", () => setIsPlaying(false));
      audio.removeEventListener("play", () => setIsPlaying(true));
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds) => {
    audioRef.current.currentTime += seconds;
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    audioRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        bgcolor: "white",
        border: "1px solid #C4BAA2",
      }}
    >
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          width: "100%",
        }}
      >
        {/* Image - responsive sizing */}
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: 100, sm: 120, md: 150, lg: 180 },
            height: "auto",
            mb: { xs: 1, sm: 0 },
          }}
        >
          <Box
            component="img"
            src={podcastLogo}
            alt="Podcast Logo"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              display: "block",
            }}
          />
        </Box>

        {/* Right column - responsive layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "100%",
            gap: { xs: 0.5, md: 1 },
            mr: { xs: 0, md: 6 },
          }}
        >
          {/* Play button + waveform - responsive container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              height: { xs: 60, sm: 70, lg: 80 },
            }}
          >
            {/* Responsive play button */}
            <IconButton
              onClick={togglePlayPause}
              sx={{
                bgcolor: "#78B27B",
                color: "common.white",
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                "&:hover": {
                  bgcolor: "success.main",
                },
              }}
              size="large"
            >
              {isPlaying ? (
                <Pause fontSize={matchesSM ? "medium" : "large"} />
              ) : (
                <PlayArrow fontSize={matchesSM ? "medium" : "large"} />
              )}
            </IconButton>

            {/* Responsive waveform */}
            <Box
              sx={{
                flexGrow: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                overflow: "hidden",
              }}
            >
              {waveform.map((value, index) => {
                const isActive =
                  (currentTime / duration) * 100 >=
                  (index / waveform.length) * 100;
                const barHeight = Math.abs(value);
                const halfHeight = barHeight / 2;


                return (
                  <Box
                    key={index}
                    sx={{
                      width: { md: "80%", lg: "100%" },
                      minWidth: "1px", // Ensure bars are always visible
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {/* Top Half (positive) */}
                    <Box
                      sx={{
                        width: "100%",
                        position: "absolute",
                        bottom: "50%",
                        height: `${halfHeight}%`,
                        bgcolor: isActive ? "#78B27B" : "grey.300",
                        borderTopLeftRadius: 1,
                        borderTopRightRadius: 1,
                      }}
                    />

                    {/* Bottom Half (negative) */}
                    <Box
                      sx={{
                        width: "100%",
                        position: "absolute",
                        top: "50%",
                        height: `${halfHeight}%`,
                        bgcolor: isActive ? "#78B27B" : "grey.300",
                        borderBottomLeftRadius: 1,
                        borderBottomRightRadius: 1,
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Media Controls - responsive layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
                order: { xs: 2, sm: 1 },
              }}
            >
              <Box sx={{ display: "flex", gap: 0 }}>
                <IconButton
                  onClick={() => skip(-10)}
                  size="small"
                  sx={{ color: "black" }}
                >
                  <Replay10Outlined fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => skip(30)}
                  size="small"
                  sx={{ color: "black" }}
                >
                  <Forward30Outlined fontSize="small" />
                </IconButton>
              </Box>

              <IconButton
                onClick={changePlaybackRate}
                sx={{
                  fontSize: "0.75rem",
                  color: "black",
                }}
                size="small"
              >
                {playbackRate}x
              </IconButton>

              <Typography
                variant="caption"
                sx={{ color: "black", display: { xs: "none", sm: "block" } }}
              >
                More info
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "black", display: { xs: "none", sm: "block" } }}
              >
                Share
              </Typography>
            </Box>

            {/* Time display - responsive positioning */}
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                order: { xs: 1, sm: 2 },
                mb: { xs: 0.5, sm: 0 },
              }}
            >
              {formatTime(currentTime)} | {formatTime(duration)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AudioPlayer;