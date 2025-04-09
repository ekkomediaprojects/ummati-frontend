import React, { useState, useEffect,useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DOMPurify from "dompurify"; // For sanitizing HTML
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/images/podcasts/banner.png";
import podcastLogo from "../assets/images/podcasts/Ummati Community-Podcast icon- FF-01.jpg";
import spotifyIcon from "../assets/images/podcasts/spotifyIcon.svg";
import applePodcastIcon from "../assets/images/podcasts/applePodcastIcon.svg";
import youtubeIcon from "../assets/images/podcasts/YouTube Icon.svg";
import coverImage from "../assets/images/podcasts/podcastCover.png";
import AudioPlayer from "./AudioPlayer";
const Podcast = () => {
  const [durations, setDurations] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
    useEffect(() => {
      // Create a map to track audio elements
      const audioElements = {};
    
      episodes.forEach(episode => {
        if (!durations[episode.id] && episode.audio) {
          const audio = new Audio(episode.audio);
          audioElements[episode.id] = audio;
          const handler = () => {
            setDurations(prev => ({
              ...prev,
              [episode.id]: audio.duration
            }));

          };
    
          audio.addEventListener('loadedmetadata', handler);
          audio.load();
    
          // Store handler reference for cleanup
          audio._handler = handler;
        }
      });
    
      // Cleanup function
      return () => {
        Object.values(audioElements).forEach(audio => {
          if (audio && audio._handler) {
            audio.removeEventListener('loadedmetadata', audio._handler);
            audio.src = '';
          }
        });
      };
    }, [episodes]);
  
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://anchor.fm/s/fd3668b8/podcast/rss"
        );
        const textData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, "application/xml");
        const items = xmlDoc.querySelectorAll("item");

        const parsedEpisodes = Array.from(items).map((item,index) => ({
          id: index,
          title: item.querySelector("title")?.textContent,
          description: item.querySelector("description")?.textContent,
          pubDate: item.querySelector("pubDate")?.textContent,
          audio: item.querySelector("enclosure")?.getAttribute("url"),
        }));

        setEpisodes(parsedEpisodes);
        setSelectedEpisode(parsedEpisodes[0]); 
      } catch (err) {
        setError("Failed to load episodes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Header />

      {/* Banner Section */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "250px", md: "300px" },
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#3D3D3C",
            fontFamily: "Caprasimo",
            fontSize: { xs: "32px", md: "40px" },
            position: "absolute",
            bottom: "10%",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Interlaced Podcast
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ background: "#F7F5EF", px: 2, py: 5 }}>
        <Box
          sx={{
            background: "#F7F5EF",
            maxWidth: "1300px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mx: "auto",
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* Intro Section */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            mb={6}
          >
            <Box sx={{ mr: 2, textAlign: "center" }}>
              <Box
                component="img"
                src={podcastLogo}
                alt="Podcast Logo"
                sx={{
                  width: { xs: "300px", lg: "340px" },
                  height: { xs: "300px", lg: "349px" },
                  mx: "auto",
                  display: { md: "block", xs: "none" },
                }}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                maxWidth: "834px",
                ml: { md: 6 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  letterSpacing: "0px",
                  fontSize: { xs: "0.9rem", sm: "1.2rem", md: "22px" },
                  fontWeight: 400,
                  textAlign: "left",
                }}
              >
                Welcome to The Interlaced Podcast—your destination for real
                connection, inspiration, and powerful stories. Each episode is a
                journey into the heart of community, where we celebrate the
                bonds that make us stronger, the friendships that enrich our
                lives, and the empowering journeys that bring us together. Dive
                in with us as we share uplifting conversations and real-life
                experiences that fuel your spirit and grow our circle of
                support. Hit play, join the movement, and discover the beauty of
                connection—one story at a time!
              </Typography>
            </Box>
          </Box>
         

          {/* Selected Episode Player */}
          {/* <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: 3,
              background: "#fff",
              textAlign: "left",
              boxShadow: 2,
              mb: 4,
            }}
          >
            {selectedEpisode ? (
              <>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {selectedEpisode.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "8px" }}
                >
                  {new Date(selectedEpisode.pubDate).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "14px", color: "#333", marginBottom: "8px" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedEpisode.description),
                  }}
                />
                <audio
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                >
                  <source src={selectedEpisode.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </>
            ) : (
              <Typography variant="body2" sx={{ color: "#999" }}>
                No episode selected.
              </Typography>
            )}
          </Box> */}

          {/* Episode List */}
          <Box sx={{ display: "flex", flexDirection: "column", width : "100%" }}>
            <AudioPlayer 
              audioSrc={selectedEpisode?.audio}
              title={selectedEpisode?.title}
              description={selectedEpisode?.description}
              pubDate={selectedEpisode?.pubDate}
            />
            {episodes.map((episode, index) => (
              <Box
                key={index}
                sx={{
                  background: selectedEpisode?.id === episode.id ? "#F0F7F0" : "#fff",
                  textAlign: "left",
                  cursor: "pointer",
                  border: "1px solid #C4BAA2",
                  borderTop: "none",
                  borderLeft: selectedEpisode?.id === episode.id ? "4px solid #78B27B" : "1px solid #C4BAA2",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  p: 2,
                  "&:hover": { backgroundColor: "#F0F7F0" },
                }}
                onClick={() => setSelectedEpisode(episode)}
              >
                <Typography
                  variant="h6"
                  sx={{ 
                    fontWeight: "700",
                    marginBottom: 1,
                    fontFamily : "Quicksand", 
                    fontSize: "20px",
                    color: "#78B27B"

                   }}
                >
                  {episode.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", py: 3 }}
                >
                      {durations[episode.id] ? formatTime(durations[episode.id]) : '...'}
                </Typography>
              </Box>
            ))}
          </Box> 
        </Box>
      </Box>

       {/* External Links Section */}
      <Box
        sx={{
          width: "100%",
          height: "280px",
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <Box sx={{ position: "absolute", color: "white" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "18px", md: "28px" },
              fontWeight: "700",
              mb: 2,
            }}
          >
            Listen from the best podcast platform
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            <IconButton
              component="a"
              href="https://open.spotify.com/show/2vds2W0alT5qeT8WR6lfRa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                component="img"
                src={spotifyIcon}
                alt="Spotify"
                sx={{ width: "24px", height: "24px" }}
              />
            </IconButton>
            <IconButton
              component="a"
              href="https://podcasts.apple.com/us/podcast/interlaced/id1790729541"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                component="img"
                src={applePodcastIcon}
                alt="Apple Podcast"
                sx={{ width: "24px", height: "24px" }}
              />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.youtube.com/@ummaticommunity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                component="img"
                src={youtubeIcon}
                alt="YouTube"
                sx={{ width: "24px", height: "24px" }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Podcast;
