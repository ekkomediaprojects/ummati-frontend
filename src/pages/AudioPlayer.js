import React, { useRef, useState, useEffect } from 'react';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Forward30Outlined, Replay10Outlined } from '@mui/icons-material';
import { Slider, IconButton, Box, Typography } from '@mui/material';
import podcastLogo from "../assets/images/podcasts/Ummati Podcast Logo.svg";

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [waveform, setWaveform] = useState([]);

  // Generate mock waveform data (in a real app, you'd analyze the audio)
  useEffect(() => {
    const generateWaveform = () => {
      const mockWaveform = Array.from({ length: 150 }, () => 
        Math.sign(Math.random() - 0.5) * (Math.random() * 40 + 10)
      );
      setWaveform(mockWaveform);
    };

    generateWaveform();
  }, [])
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
  
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('play', () => setIsPlaying(true));
  
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', () => setIsPlaying(false));
      audio.removeEventListener('play', () => setIsPlaying(true));
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
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box
    sx={{
        width: "100%",
        height: "100%",
        p: 2,
        bgcolor: "white",
        border: "1px solid #C4BAA2"
    }}
    >
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
        <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 2,
            width: '100%'
        }}>
            {/* Image on the left (top on mobile) */}
            <Box sx={{ 
                flexShrink: 0,
                width: { xs: 120, sm: 150, md: 180 },
                height: 'auto'
            }}>
                <Box
                component="img"
                src={podcastLogo}
                alt="Podcast Logo"
                sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    display: 'block'
                }}
                />
            </Box>

            {/* Right column (bottom on mobile) - contains waveform, seekbar, and controls */}
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                gap: 1,
                mr : 6
            }}>
               <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2, 
                    height: 80
                }}>
                    {/* Large Play/Pause Button */}
                    <IconButton 
                    onClick={togglePlayPause} 
                    sx={{ 
                        bgcolor: isPlaying ? '#78B27B' : '#78B27B',
                        color: 'common.white',
                        width: 56,
                        height: 56,
                        '&:hover': {
                        bgcolor: isPlaying ? 'success.main' : 'success.main',
                        }
                    }}
                    size="large"
                    >
                    {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                    </IconButton>
                    
                    {/* Waveform */}
                    <Box sx={{ 
                    flexGrow: 1,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                    {waveform.map((value, index) => {
                        const isActive = (currentTime / duration) * 100 >= (index / waveform.length) * 100;
                        const barHeight = Math.abs(value);
                        const halfHeight = barHeight / 2;

                        return (
                        <Box
                            key={index}
                            sx={{ 
                            width: '0.3%',
                            height: '100%',
                            position: 'relative'
                            }}
                        >
                            {/* Top Half (positive) */}
                            <Box
                            sx={{
                                width: '100%',
                                position: 'absolute',
                                bottom: '50%',
                                height: `${halfHeight}%`,
                                bgcolor: isActive ? '#78B27B' : 'grey.300',
                                borderTopLeftRadius: 1,
                                borderTopRightRadius: 1,
                            }}
                            />

                            {/* Bottom Half (negative) */}
                            <Box
                            sx={{
                                width: '100%',
                                position: 'absolute',
                                top: '50%',
                                height: `${halfHeight}%`,
                                bgcolor: isActive ? '#78B27B' : 'grey.300',
                                borderBottomLeftRadius: 1,
                                borderBottomRightRadius: 1,
                            }}
                            />
                        </Box>
                        );
                    })}
                    </Box>
               </Box>

                {/* Media Controls - Row layout */}
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between', 
                    width: '100%'
                }}>
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap : 1
                }}>
                   <Box sx={{ 
                            display: 'flex',
                            gap: 0 
                        }}>
                        <IconButton onClick={() => skip(-10)} size="small"  sx={{ color: 'black' }} >
                        <Replay10Outlined fontSize="medium" />
                        </IconButton>
                        
                        <IconButton onClick={() => skip(30)} size="small" color = "black" sx={{ color: 'black' }}>
                        <Forward30Outlined fontSize="medium" />
                        </IconButton>
                    </Box>
                    
                    <IconButton 
                    onClick={changePlaybackRate} 
                    sx={{ 
                        fontSize: '0.75rem',
                        color: 'black'
                    }}
                    size="medium"
                    >
                    {playbackRate}x
                    </IconButton>
                    <Typography variant="caption" sx={{ color: 'text.black' }}>
                      More info 
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.black' }}>
                       Share 
                    </Typography>
                </Box>

                {/* Time display on the right */}
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {formatTime(currentTime)} | {formatTime(duration)}
                </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
   
  );
};

export default AudioPlayer;