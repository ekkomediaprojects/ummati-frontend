// src/components/HeroSection.js
import React from 'react';
import leftImage from '../assets/images/homepage/hero/left image heroSection.png';
import rightImage from '../assets/images/homepage/hero/right image heroSection.png';
import podcastImage from '../assets/images/homepage/hero/podcast.png';
import '../assets/fonts/Caprasimo-Regular.ttf';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';

const styles = {
  hero: {
    backgroundColor: '#F7F5EF',
    width: '100vw', // Makes the entire hero section full-width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    margin: '0', // Removes any default margin to ensure full-width layout
  },
  headerRow: {
    width: '100vw', // Full-width for edge-to-edge display
    textAlign: 'center',
  },
  middleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width: '100vw', // Full-width for edge-to-edge display
    marginTop: '-15px',
  },
  leftImage: {
    width: '600px',
  },
  rightImage: {
    width: '600px',
  },
  contentContainer: {
    textAlign: 'center',
    maxWidth: '800px',
  },
  header: {
    fontFamily: 'Caprasimo, sans-serif',
    fontSize: '56px',
    margin: 0,
  },
  subheader: {
    width: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: '32px',
    fontFamily: 'Quicksand',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  paragraph: {
    fontSize: '18px',
    marginTop: '10px',
    fontFamily: 'Poppins',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '20px', // Font size for the button text
    fontFamily: 'Quicksand', // Applying Quicksand font
    fontWeight: '700',
    color: '#F7F5EF', // Text color
    background: '#78B27B', // Background color for the button
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  infoSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    width: '100vw', // Full-width for edge-to-edge display
    maxWidth: '1000px',
    marginTop: '40px',
    textAlign: 'center',
  },
  infoItem: {
    flexBasis: '33.33%', // Makes each item take up one-third of the row
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoHeader: {
    width: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: '32px',
    fontFamily: 'Quicksand',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
};

const HeroSection = () => (
<section style={styles.hero}>
    {/* First Row: H1 Header */}
    <div style={styles.headerRow}>
      <h1 style={styles.header}>Welcome to Ummati Community</h1>
    </div>

    {/* Second Row: Left Image, Center Content, Right Image */}
    <div style={styles.middleRow}>
      <img src={leftImage} alt="Left side illustration" style={styles.leftImage} />
      
      <div style={styles.contentContainer}>
        <h3 style={styles.subheader}>We Are One People, One Nation.</h3>
        <p style={styles.paragraph}>
          We are a community where you can meet like-minded women and enjoy the company of so many others just like you! 
          We're bringing together all who love attending a variety of social events and creating a community of friendship and sisterhood.
        </p>
        <button style={styles.button}>Join Our Community</button>
      </div>

      <img src={rightImage} alt="Right side illustration" style={styles.rightImage} />
    </div>

    {/* Third Row: Three Informational Sections */}
    <div style={styles.infoSection}>
      <div style={styles.infoItem}>
        <h3 style={styles.infoHeader}>Explore Our Calendar</h3>
        <img src={podcastImage} alt="Calendar illustration" />
      </div>
      <div style={styles.infoItem}>
        <h3 style={styles.infoHeader}>Become A Member</h3>
        <img src={podcastImage} alt="Member illustration" />
      </div>
      <div style={styles.infoItem}>
        <h3 style={styles.infoHeader}>Listen To Our Podcast</h3>
        <img src={podcastImage} alt="Podcast illustration" />
      </div>
    </div>
  </section>
);

export default HeroSection;
