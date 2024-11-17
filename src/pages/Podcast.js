// src/pages/Podcast.js
import React from 'react';
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

const Podcast = () => (
    <div>
    <Header />
    {/* Banner Section */}
    <div style={styles.banner}>
        <h1 style={styles.bannerText}>Interlaced Podcast</h1>
    </div>
        {/* Main Content Section */}
    <div style={styles.contentSection}>
    
        {/* Row 1: Image and Paragraph */}
        <div style={styles.row}>
            <img src={podcastLogo} alt="Podcast Logo" style={styles.rowImage} />
            <p style={styles.rowText}>
            Welcome to The Interlaced Podcast—your destination for real connection, inspiration, and powerful stories. Each episode is a journey into the heart of community, where we celebrate the bonds that make us stronger, the friendships that enrich our lives, and the empowering journeys that bring us together. Dive in with us as we share uplifting conversations and real-life experiences that fuel your spirit and grow our circle of support. Hit play, join the movement, and discover the beauty of connection—one story at a time!
            </p>
        </div>

        {/* Row 2: Media Player Box */}
        <div style={styles.mediaPlayerBox}>
            {/* Media Player Component Placeholder */}
            <div style={styles.mediaPlayer}>
            <p>Media Player Placeholder</p>
            </div>
        </div>
    </div>        

        {/* Row 3: Full-width Background Image with Overlaid Icons and Text */}
        <div style={styles.coverImageContainer}>
                <div style={styles.overlayContent}>
                <h2 style={styles.overlayTitle}>Listen from the best podcast platform</h2>
                <div style={styles.iconRow}>
                    <div style={styles.iconContainer}>
                    <img src={spotifyIcon} alt="Spotify" style={styles.icon} />
                    <span style={styles.iconText}>Spotify</span>
                    </div>
                    <div style={styles.iconContainer}>
                    <img src={applePodcastIcon} alt="Apple Podcast" style={styles.icon} />
                    <span style={styles.iconText}>Apple Podcast</span>
                    </div>
                    <div style={styles.iconContainer}>
                    <img src={youtubeIcon} alt="YouTube" style={styles.icon} />
                    <span style={styles.iconText}>YouTube</span>
                    </div>
                </div>
                </div>
        </div>
    <Footer />
    </div>
  );

  const styles = {
    banner: {
      width: '100%',
      height: '300px', // Adjust height as needed
      backgroundImage: `url(${banner})`,
      backgroundSize: 'cover',       // Ensures image covers the entire banner
      backgroundPosition: 'center',  // Centers the background image
      position: 'relative', // Allows absolute positioning for inner elements
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerText: {
      color: 'black',
      fontFamily: 'Caprasimo',
      fontSize: '56px',
      position: 'absolute',     // Position text absolutely within the banner
      top: '80%',               // Position the text two-thirds down within the banner
      transform: 'translateY(-50%)',
      fontWeight: '400',
    },

      contentSection: {
        background: '#F7F5EF',
        padding: '40px 20px',
        textAlign: 'center',
      },
      row: {
        display: 'flex',
        flexDirection: 'row', // Places items side by side
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px',
      },
      rowImage: {
        width: '300px', // Adjust width as desired
        flexShrink: 0, // Prevents the image from shrinking
      },
      rowText: {
        fontSize: '16px',
        fontFamily: 'Poppins',
        color: '#333',
        maxWidth: '500px',
        margin: '0 auto',
      },
      mediaPlayerBox: {
        width: '100%',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30px',
      },
      mediaPlayer: {
        width: '100%',
        height: '100%', // Placeholder for actual media player content
      },
      coverImageContainer: {
        width: '100%', 
        height: '200px', // Set height for the cover section
        backgroundImage: `url(${coverImage})`, // Use coverImage as background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', // Position relative for absolute overlay content
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlayContent: {
        position: 'absolute',
        textAlign: 'center',
        color: 'white',
      },
      overlayTitle: {
        textAlign: 'center', 
        color: '#E6E6FA', 
        fontSize: 28, 
        fontFamily: 'Quicksand', 
        fontWeight: '700',
      },
      iconRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
      },
      iconContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      },
      icon: {
        width: '24px',
        height: '24px',
      },
      iconText: {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 24, 
        fontFamily: 'poppins', 
        fontWeight: '400',
      },
  };
  
  export default Podcast;