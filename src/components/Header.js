// src/components/Header.js
import React from 'react';
import logo from '../assets/icons/logo.png';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';
import { Link } from 'react-router-dom';

const Header = () => (
  <header style={styles.header}>
    <Link to="/" style={styles.titleContainer}>
      <span style={styles.titleText}>UMMATI C</span>
      <img src={logo} alt="Logo" style={styles.logo} />
      <span style={styles.titleText}>MMUNITY</span>
    </Link>

    <div style={styles.rightSection}>
      <nav style={styles.navLinks}>
        <Link style={styles.navItem}>Events</Link>
        <Link to= 'Podcast' style={styles.navItem}>Podcast</Link>
        <Link to= 'Membership' style={styles.navItem}>Membership</Link>
        <Link to= 'Chapters' style={styles.navItem}>Chapters</Link>
        <Link to= 'About' style={styles.navItem}>About</Link>
        <Link style={styles.navItem}>Contact</Link>
      </nav>

      <div style={styles.loginButton}>
        <span style={styles.loginButtonText}>Login</span>
      </div>
    </div>
  </header>
);

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'white',
    padding: '35px 40px',
    width: '100%',
    flexWrap: 'wrap',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    flexShrink: 0,
  },
  titleText: {
    color: '#5A4283',
    fontSize: '1.75rem', // Adjusts dynamically for responsive sizing
    fontFamily: 'Quicksand',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    margin: 0,
  },
  logo: {
    width: 'clamp(30px, 5vw, 50px)', // Adjusts from 30px on mobile to 50px on desktop
    height: 'clamp(30px, 5vw, 50px)',
    marginTop: '-1px',
    marginLeft: '-13px', // Adjust to fine-tune spacing between text and logo
    marginRight: '-13px',    
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navItem: {
    color: '#5A4283',
    fontSize: '1.0rem',
    fontFamily: 'Quicksand',
    cursor: 'pointer',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    gap: '20px',
  },
  loginButton: {
    padding: '8px 16px',
    backgroundColor: '#78B27B',
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#D9F4DA',
    fontSize: '1rem',
    fontFamily: 'Quicksand',
    fontWeight: 700,
    letterSpacing: 0.32,
    whiteSpace: 'nowrap',
  },
};

export default Header;
