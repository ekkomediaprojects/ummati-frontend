import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import '../assets/fonts/Poppins-Regular.ttf';

const About = () => (
    <div>
    <Header />
    {/* Banner Section */}
    <div style={styles.banner}>
        <h1 style={styles.bannerText}>About</h1>
    </div>
        {/* Main Content Section */}
    <div style={styles.contentSection}>
   test
    </div>

    <Footer />
    </div>

);

const styles = {
    banner: {
      width: '100%',
      height: '220px', // Adjust height as needed
      backgroundImage: `url(${bannerImage})`,
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
    },
};
  
export default About;