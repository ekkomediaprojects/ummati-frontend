import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Pagination,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PodcastPlayer from "./PodcastPlayer"
import banner from "../assets/images/podcasts/banner.png";
import podcastLogo from "../assets/images/podcasts/Ummati Podcast Logo.svg";
import spotifyIcon from "../assets/images/podcasts/spotifyIcon.svg";
import applePodcastIcon from "../assets/images/podcasts/applePodcastIcon.svg";
import youtubeIcon from "../assets/images/podcasts/YouTube Icon.svg";
import coverImage from "../assets/images/podcasts/podcastCover.png";
import "../assets/fonts/Quicksand-Regular.ttf";
import "../assets/fonts/Poppins-Regular.ttf";
import axios from "axios";

const Podcast = () => {
  // const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [podcasts, setPodcasts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPodcasts, setTotalPodcasts] = useState(0); 
  const [accessToken, setAccessToken] = useState(null);
  const podcastsPerPage = 1; 

  // Function to handle iframe load
  // const handleIframeLoad = () => {
  //   setIsIframeLoaded(true);
  // };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getSpotifyPodcasts = async () => {
    const podcastID = process.env.REACT_APP_PODCAST_ID;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/shows?ids=${podcastID}&market=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const fetchedPodcasts = response?.data?.shows;
      console.log("fetached" , fetchedPodcasts)
      const totalCount = response?.data?.shows.length;
      setPodcasts(fetchedPodcasts);
      setTotalPodcasts(totalCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    setAccessToken(token); // Set the access token properly

    if (token) {
      getSpotifyPodcasts();
    }
  }, [accessToken]);

  // Paginate podcasts based on the current page
  const paginatedPodcasts = podcasts.slice((currentPage - 1) * podcastsPerPage,currentPage * podcastsPerPage);

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
      <Box sx={{ background: '#F7F5EF', px: 2, py: 5, textAlign: 'center' }}>
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
              sx={{ width: { xs: '200px', md: '300px' }, mx: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '16px',
                fontFamily: 'Poppins',
                color: '#333',
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              Welcome to The Interlaced Podcast—your destination for real
              connection, inspiration, and powerful stories. Each episode is a
              journey into the heart of community, where we celebrate the bonds
              that make us stronger, the friendships that enrich our lives, and
              the empowering journeys that bring us together. Dive in with us as
              we share uplifting conversations and real-life experiences that
              fuel your spirit and grow our circle of support. Hit play, join the
              movement, and discover the beauty of connection—one story at a
              time!
            </Typography>
          </Grid>
        </Grid>

        {/* Row 2: Media Player Box */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center", // Aligns the content to the start of the row
            flexWrap: "wrap",
            padding : 2,
          }}

        >
        {loading ? (
          <CircularProgress />
        ) : paginatedPodcasts.length === 0 ? (
          <Typography>No podcasts available at the moment</Typography>
        ) : (
          paginatedPodcasts.map((podcast) => (
            <Box
              key={podcast?.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                p : 1
              }}
            >
              <PodcastPlayer token={accessToken} show={podcast} />
            </Box>
          ))
        )}
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
            count={Math.ceil(totalPodcasts / podcastsPerPage)} // Calculate the number of pages based on total podcasts
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>

      {/* Row 3: Full-width Background Image with Overlaid Icons and Text */}
      <Box
        sx={{
          width: '100%',
          height:'280px', // Responsive height
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          margin: '0 auto', // 
        }}
      >
        <Box sx={{ position: 'absolute', color: 'white' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '18px', md: '28px' },
              fontFamily: 'Quicksand',
              fontWeight: '700',
              mb: 2,
            }}
          >
            Listen from the best podcast platform
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <IconButton>
              <Box
                component="img"
                src={spotifyIcon}
                alt="Spotify"
                sx={{ width: '24px', height: '24px' }}
              />
            </IconButton>
            <IconButton>
              <Box
                component="img"
                src={applePodcastIcon}
                alt="Apple Podcast"
                sx={{ width: '24px', height: '24px' }}
              />
            </IconButton>
            <IconButton>
              <Box
                component="img"
                src={youtubeIcon}
                alt="YouTube"
                sx={{ width: '24px', height: '24px' }}
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
