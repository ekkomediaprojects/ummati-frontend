import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/membershipBanner.png';
import '../assets/fonts/Poppins-Regular.ttf';
import '../assets/fonts/Quicksand-Regular.ttf';

const Membership = () => (
    <div>
            <Header />
        {/* Banner Section */}
        <div style={styles.banner}>
            <h1 style={styles.bannerText}>Membership</h1>
        </div>
        {/* Main Content Section */}
        <div style={styles.contentSection}>
            <p style={styles.text}>
            Unlock exclusive benefits and elevate your experience by joining our membership program! As a valued member, you'll gain access to special discounts, early product releases, members-only events, and more. Whether you're looking for extra perks or a deeper connection to our community, our membership is designed to offer unbeatable value. Join today and start enjoying the privileges you deserve!
        </p>
        </div>
            <Footer />
    </div>
    );

    const styles = {
        banner: {
          width: '100%',
          height: '252px', // Adjust height as needed
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
    
          contentSection: {
            background: '#F7F5EF',
            padding: '60px 160px',
          },
    
          text: {
            color: '#525252', 
            fontSize: 20, 
            fontFamily: 'Poppins', 
            fontWeight: '400',
          },
        };
    
    export default Membership;