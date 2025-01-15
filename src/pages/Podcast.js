import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  IconButton,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/images/podcasts/banner.png";
import podcastLogo from "../assets/images/podcasts/Ummati Podcast Logo.svg";
import spotifyIcon from "../assets/images/podcasts/spotifyIcon.svg";
import applePodcastIcon from "../assets/images/podcasts/applePodcastIcon.svg";
import youtubeIcon from "../assets/images/podcasts/YouTube Icon.svg";
import coverImage from "../assets/images/podcasts/podcastCover.png";
import "../assets/fonts/Quicksand-Regular.ttf";
import "../assets/fonts/Poppins-Regular.ttf";

const Podcast = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 5;

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          "https://anchor.fm/s/fd3668b8/podcast/rss"
        );
        const textData = await response.text();

        // Parse XML using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, "application/xml");
        const items = xmlDoc.querySelectorAll("item");

        const parsedEpisodes = Array.from(items).map((item) => ({
          title: item.querySelector("title")?.textContent,
          description: item.querySelector("description")?.textContent,
          pubDate: item.querySelector("pubDate")?.textContent,
          audio: item.querySelector("enclosure")?.getAttribute("url"),
        }));

        setEpisodes(parsedEpisodes);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchEpisodes();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedEpisodes = episodes.slice(
    (currentPage - 1) * podcastsPerPage,
    currentPage * podcastsPerPage
  );

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
          Podcasts
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ background: "#F7F5EF", px: 2, py: 5, textAlign: "center" }}>
        {/* Row 1: Image and Paragraph */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={podcastLogo}
              alt="Podcast Logo"
              sx={{ width: { xs: "200px", md: "300px" }, mx: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                fontFamily: "Poppins",
                color: "#333",
                maxWidth: "500px",
                mx: "auto",
              }}
            >
              Welcome to The Interlaced Podcast—your destination for real
              connection, inspiration, and powerful stories. Each episode is a
              journey into the heart of community, where we celebrate the bonds
              that make us stronger, the friendships that enrich our lives, and
              the empowering journeys that bring us together.
            </Typography>
          </Grid>
        </Grid>

        {/* Row 2: Podcast Episodes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: 2,
            textAlign: "center",
          }}
        >
          {paginatedEpisodes.map((episode, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: 3,
                background: "#fff",
                textAlign: "left",
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                {episode.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                {new Date(episode.pubDate).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                {episode.description}
              </Typography>
              {episode.audio ? (
                <audio
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    backgroundColor: "#f7f5ef",
                  }}
                >
                  <source src={episode.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Audio not available
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={Math.ceil(episodes.length / podcastsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>

      {/* Row 3: Full-width Background Image with Overlaid Icons and Text */}
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
              fontFamily: "Quicksand",
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
              href="https://www.apple.com/apple-podcasts/"
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
