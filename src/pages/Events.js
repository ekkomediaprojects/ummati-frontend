import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import banner from '../assets/images/Events/banner.png';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';

const Events = () => (
    <div>
    <Header />
    {/* Banner Section */}
    <div style={styles.banner}>
        <h1 style={styles.bannerText}>Events</h1>
    </div>
    {/* Main Content Section */}
    <div style={styles.contentSection}></div>
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
    };
export default Events;