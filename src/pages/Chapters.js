import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import '../assets/fonts/Poppins-Regular.ttf';

const Chapters = () => (
    <div>
    <Header />
    {/* Banner Section */}
    <div style={styles.banner}>
        <h1 style={styles.bannerText}>Chapters</h1>
    </div>
        {/* Main Content Section */}
    <div style={styles.contentSection}>
    <p style={styles.text}>
    Ummati Community is a dynamic and expanding organization committed to creating a supportive network for women across the United States. With established chapters in several cities, we are actively expanding our reach and looking for dedicated leaders to help establish new chapters nationwide. Our mission is to offer women a safe and inclusive space where they can connect with one another, regardless of age or life stage.
    <br/><br/>
    We believe in the importance of fostering an environment where women can share their experiences, engage in meaningful conversations, and build lasting friendships. Each chapter of Ummati Community is designed to bring together women from diverse backgrounds, allowing them to find camaraderie and mutual support within a welcoming and encouraging community. Through regular gatherings and activities, members have the opportunity to grow personally while contributing to the well-being of others.
    <br/><br/>
    In addition to social connection, Ummati Community also emphasizes professional networking and personal development. By creating spaces where women can exchange ideas, learn from one another, and build valuable networks, we aim to empower members to thrive both personally and professionally. We invite women who are passionate about community building and leadership to join us in expanding this supportive network across the country.</p>
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

      contentSection: {
        background: '#F7F5EF',
        padding: '60px 160px',
      },

      text: {
        color: 'black', 
        fontSize: 22, 
        fontFamily: 'Poppins', 
        fontWeight: '400',
        wordWrap: 'break-word'
      },
    };
  
    export default Chapters;