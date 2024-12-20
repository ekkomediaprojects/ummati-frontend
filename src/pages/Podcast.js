import React, { useState } from 'react';
import { Box, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import banner from '../assets/images/podcasts/banner.png';
import podcastLogo from '../assets/images/podcasts/Ummati Podcast Logo.svg';
import spotifyIcon from '../assets/images/podcasts/spotifyIcon.svg';
import applePodcastIcon from '../assets/images/podcasts/applePodcastIcon.svg';
import youtubeIcon from '../assets/images/podcasts/YouTube Icon.svg';
import coverImage from '../assets/images/podcasts/podcastCover.png';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';

const Podcast = () => {
  // State for iframe loading
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Function to handle iframe load
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };

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
            width: '100%',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #C4BAA2',
            textAlign: 'center',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            p: 2, 
            position: 'relative',
          }}
        >
          {!isIframeLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <Typography
            component="div"
            sx={{
              width: '100%',
              maxWidth: '1000px',
            }}
          >
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/3nS8d7ekVjFLM4jVyqbDGY?utm_source=generator&theme=0"
              width="100%" // Full width for responsiveness
              height="452" // Increased height for better display
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              onLoad={handleIframeLoad} // On load, hide the loader
            ></iframe>
          </Typography>
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
