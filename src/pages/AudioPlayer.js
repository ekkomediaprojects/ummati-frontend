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
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { Slider, IconButton, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import podcastLogo from "../assets/images/podcasts/Ummati Community-Podcast icon- FF-01.jpg";
import DOMPurify from "dompurify";

const AudioPlayer = ({ audioSrc, title, description, pubDate }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [waveform, setWaveform] = useState([]);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  // Add effect to auto-play when audioSrc changes
  useEffect(() => {
    if (audioRef.current && userInteracted) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioSrc]);

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
    
    if(!userInteracted){
        setUserInteracted(true)
    }
    if (audioRef.current) {
        if (isPlaying) {
        audioRef.current.pause();
        } else {
        audioRef.current.play()
            .catch(error => {
            console.error("Playback failed:", error);
            // Optionally show UI feedback
            });
        }
        setIsPlaying(!isPlaying);
    }
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

  const handleShareClick = () => {
    setOpenShareDialog(true);
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
    setCopied(false);
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    const shareUrl = title 
      ? `${currentUrl}?episode=${encodeURIComponent(title)}`
      : currentUrl;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
    });
  };

  const handleShareViaApp = (app) => {
    const currentUrl = window.location.href;
    const shareUrl = title 
      ? `${currentUrl}?episode=${encodeURIComponent(title)}`
      : currentUrl;
    const text = title ? `Check out this podcast episode: ${title}` : 'Check out this podcast episode!';
    
    let socialShareUrl;
    switch (app) {
      case 'whatsapp':
        socialShareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'facebook':
        socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        socialShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        socialShareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(socialShareUrl, '_blank', 'width=600,height=400');
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
                cursor: "pointer",
                position: "relative",
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                const newTime = percentage * duration;
                audioRef.current.currentTime = newTime;
              }}
            >
              {waveform.map((value, index) => {
                const barHeight = Math.abs(value);
                const halfHeight = barHeight / 2;
                const progressPercentage = (currentTime / duration) * 100;
                const barStartPercentage = (index / waveform.length) * 100;
                const barEndPercentage = ((index + 1) / waveform.length) * 100;
                
                // Calculate how much of this bar should be colored
                let barProgress = 0;
                if (progressPercentage >= barStartPercentage) {
                  barProgress = Math.min(
                    (progressPercentage - barStartPercentage) / (barEndPercentage - barStartPercentage),
                    1
                  );
                }

                // Add a gradient effect for smoother transitions
                const gradientOpacity = barProgress > 0 ? 0.3 + (barProgress * 0.7) : 0;
                const gradientColor = `rgba(120, 178, 123, ${gradientOpacity})`;

                return (
                  <Box
                    key={index}
                    sx={{
                      width: { md: "80%", lg: "100%" },
                      minWidth: "1px",
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
                        bgcolor: barProgress > 0 ? gradientColor : "grey.300",
                        borderTopLeftRadius: 1,
                        borderTopRightRadius: 1,
                        transition: "background-color 0.05s ease-in-out",
                      }}
                    />

                    {/* Bottom Half (negative) */}
                    <Box
                      sx={{
                        width: "100%",
                        position: "absolute",
                        top: "50%",
                        height: `${halfHeight}%`,
                        bgcolor: barProgress > 0 ? gradientColor : "grey.300",
                        borderBottomLeftRadius: 1,
                        borderBottomRightRadius: 1,
                        transition: "background-color 0.05s ease-in-out",
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
                sx={{ 
                  color: "black", 
                  display: "block",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  }
                }}
                onClick={() => setOpenInfoDialog(true)}
              >
                More info
              </Typography>

              <Dialog 
                open={openInfoDialog} 
                onClose={() => setOpenInfoDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    bgcolor: "#F7F5EF"
                  }
                }}
              >
                <DialogTitle sx={{ 
                  color: "#78B27B",
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  textAlign: "center"
                }}>
                  {title || "Episode Information"}
                </DialogTitle>
                <DialogContent>
                  {pubDate && (
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{
                        fontFamily: "Quicksand",
                        fontWeight: 600
                      }}
                    >
                      Published: {new Date(pubDate).toLocaleDateString()}
                    </Typography>
                  )}
                  {description && (
                    <Typography 
                      variant="body2" 
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(description)
                      }}
                      sx={{
                        fontFamily: "Poppins",
                        lineHeight: 1.6,
                        color: "#333"
                      }}
                    />
                  )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button 
                    onClick={() => setOpenInfoDialog(false)} 
                    sx={{
                      color: "#78B27B",
                      fontFamily: "Quicksand",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "rgba(120, 178, 123, 0.1)",
                      }
                    }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

              <Typography
                variant="caption"
                sx={{ 
                  color: "black", 
                  display: "block",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  }
                }}
                onClick={handleShareClick}
              >
                Share
              </Typography>

              {/* Share Dialog */}
              <Dialog
                open={openShareDialog}
                onClose={handleCloseShareDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    bgcolor: "#F7F5EF"
                  }
                }}
              >
                <DialogTitle sx={{ 
                  color: "#78B27B",
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  textAlign: "center"
                }}>
                  Share this Episode
                </DialogTitle>
                <DialogContent>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mb={2}
                  >
                    <Button 
                      onClick={handleCopyLink}
                      sx={{
                        bgcolor: "#78B27B",
                        color: "white",
                        "&:hover": {
                          bgcolor: "success.main",
                        },
                        fontFamily: "Quicksand",
                        fontWeight: 600,
                        textTransform: "none",
                        mb: 2
                      }}
                    >
                      {copied ? "Link Copied!" : "Copy Link"}
                    </Button>
                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                      <IconButton 
                        onClick={() => handleShareViaApp("whatsapp")}
                        sx={{ 
                          color: "#78B27B",
                          "&:hover": {
                            bgcolor: "rgba(120, 178, 123, 0.1)",
                          }
                        }}
                      >
                        <WhatsAppIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleShareViaApp("facebook")}
                        sx={{ 
                          color: "#78B27B",
                          "&:hover": {
                            bgcolor: "rgba(120, 178, 123, 0.1)",
                          }
                        }}
                      >
                        <FacebookIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleShareViaApp("twitter")}
                        sx={{ 
                          color: "#78B27B",
                          "&:hover": {
                            bgcolor: "rgba(120, 178, 123, 0.1)",
                          }
                        }}
                      >
                        <TwitterIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleShareViaApp("email")}
                        sx={{ 
                          color: "#78B27B",
                          "&:hover": {
                            bgcolor: "rgba(120, 178, 123, 0.1)",
                          }
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button 
                    onClick={handleCloseShareDialog} 
                    sx={{
                      color: "#78B27B",
                      fontFamily: "Quicksand",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "rgba(120, 178, 123, 0.1)",
                      }
                    }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
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