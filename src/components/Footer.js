// src/components/Footer.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/footer logo.svg';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState(''); // State for email input
  const [error, setError] = useState(null); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const isActive = (path) => location.pathname === path;

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setSuccessMessage('');
      return;
    }

    setError(null);

    try {
      // Send email to backend (replace URL with your backend endpoint)
      const response = await fetch('https://your-backend-endpoint/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Thank you for signing up!');
        setEmail(''); // Clear the input
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setError('Error connecting to the server. Please try again later.');
    }
  };

  return (
    <footer>
      {/* Top Border Line */}
      <div style={styles.borderLine}></div>

      <section style={styles.top}>
        {/* Logo */}
        <Link to="/" style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </Link>

        {/* Mission Section */}
        <div style={styles.missionColumn}>
          <h3 style={styles.columnTitle}>Our Mission</h3>
          <p style={styles.columnText}>
            Ummati Community is a community to empower women to be themselves, support one another, make friends, and have fun. We are a place of acceptance, inclusivity, and growth.
          </p>
        </div>

        {/* Stay Updated Section */}
        <div style={styles.stayUpdatedColumn}>
          <h3 style={styles.columnTitle}>Stay Updated</h3>
          <p style={styles.columnText}>
            Sign up with your email address to receive news and updates.
          </p>
          <div style={styles.signUpContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <button style={styles.signUpButton} onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
          {error && <div style={styles.errorMessage}>{error}</div>} {/* Error message */}
          {successMessage && <div style={styles.successMessage}>{successMessage}</div>} {/* Success message */}
        </div>

        {/* Site Links Section */}
        <div style={styles.siteLinkColumn}>
          <h3 style={styles.columnTitle}>Site Links</h3>
          <div style={styles.linksGrid}>
            <Link to="/events" style={{ ...styles.link, ...(isActive('/events') ? styles.activeLink : {}) }}>Events</Link>
            <Link to="/chapters" style={{ ...styles.link, ...(isActive('/chapters') ? styles.activeLink : {}) }}>Chapters</Link>
            <Link to="/faq" style={{ ...styles.link, ...(isActive('/faq') ? styles.activeLink : {}) }}>FAQs</Link>
            <Link to="/podcast" style={{ ...styles.link, ...(isActive('/podcast') ? styles.activeLink : {}) }}>Podcast</Link>
            <a href="/volunteer" style={styles.link}>Volunteer</a>
            <Link to="/about" style={{ ...styles.link, ...(isActive('/about') ? styles.activeLink : {}) }}>About</Link>
            <Link to="/membership" style={{ ...styles.link, ...(isActive('/membership') ? styles.activeLink : {}) }}>Membership</Link>
            <a href="/collaborate" style={styles.link}>Collaborate</a>
            <Link to="/contact" style={{ ...styles.link, ...(isActive('/contact') ? styles.activeLink : {}) }}>Contact</Link>
          </div>
        </div>

        {/* Legal Section */}
        <div style={styles.legalColumn}>
          <h3 style={styles.columnTitle}>Legal</h3>
          <div style={styles.legalLinks}>
            <Link to="/privacy" style={{ ...styles.link, ...(isActive('/privacy') ? styles.activeLink : {}) }}>Privacy</Link>
            <Link to="/terms" style={{ ...styles.link, ...(isActive('/terms') ? styles.activeLink : {}) }}>Terms</Link>
          </div>
        </div>
      </section>

      {/* Bottom Border Line */}
      <div style={styles.borderLine}></div>

      <section style={styles.bottom}>
        <div style={styles.bottomText}>© 2024 Ummati Community | All Rights Reserved</div>
      </section>
    </footer>
  );
};

const styles = {
  borderLine: {
    width: '100%',
    height: '3px',
    backgroundColor: '#C4BAA2', // Replaces border color with solid background
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#F7F5EF',
    padding: '20px 40px',
    flexWrap: 'wrap',
  },
  logoContainer: {
    flex: '2',
    maxWidth: '250px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
  },
  logo: {
    width: '177px',
    height: '164px',
  },
  missionColumn: {
    flex: '2',
    maxWidth: '270px',
    marginLeft: '20px',
    marginBottom: '20px',
  },
  legalColumn: {
    flex: '1',
    maxWidth: '200px',
    marginLeft: '50px',
    marginBottom: '20px',
  },
  columnTitle: {
    color: '#5A4283',
    fontSize: '16px',
    fontFamily: 'Quicksand',
    fontWeight: '700',
    marginBottom: '10px',
    textAlign: 'left',
  },
  columnText: {
    color: 'black',
    fontSize: '12px',
    fontFamily: 'Poppins',
    fontWeight: '400',
    lineHeight: '1.5',
    marginBottom: '20px', 
  },
  stayUpdatedColumn: {
    flex: '2',
    maxWidth: '500px',
    marginLeft: '20px',
    marginBottom: '20px',
    padding: '20 0px',
    marginRight: '100px',
  },
  signUpContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Adds spacing between the input and button
    //backgroundColor: 'white',
  },
  siteLinkColumn: { 
    flex: '1',
    maxWidth: '400px',
    marginLeft: '20px',
    marginBottom: '20px',
  },
  emailInput: {
    flex: '1',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    fontFamily: 'Poppins',
  },
  signUpButton: {
    padding: '8px 20px',
    background: '#78B27B',
    borderRadius: '4px',
    color: 'white',
    fontSize: '14px',
    fontFamily: 'Quicksand',
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'center',
    border: 'none',
    whiteSpace: 'nowrap', // Prevent text from wrapping
  },
  linksGrid: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  },
  legalLinks: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    gap: '15px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  activeLink: {
    fontWeight: '700',
  },
  bottom: {
    width: '100%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
  },
  bottomText: {
    color: '#111111',
    fontSize: '12px',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },

  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    fontSize: '12px',
    marginTop: '10px',
  },
};

export default Footer;
