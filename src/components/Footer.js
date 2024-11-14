// src/components/Footer.js
import React from 'react';
import logo from '../assets/images/footer logo.svg';
import { Link } from 'react-router-dom';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';

const Footer = () => (
  <footer>

    {/* Top Border Line */}
    <div style={styles.borderLine}></div>

    <section style={styles.top}>
      {/* Logo */}
      <Link to="/" style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </Link>
      
      {/* Mission Section */}
      <div style={styles.column}>
        <h3 style={styles.columnTitle}>Our Mission</h3>
        <p style={styles.columnText}>
          Ummati Community is a community to empower women to be themselves, support one another, make friends, and have fun. We are a place of acceptance, inclusivity, and growth.
        </p>
      </div>

      {/* Stay Updated Section */}
      <div style={styles.column}>
        <h3 style={styles.columnTitle}>Stay Updated</h3>
        <p style={styles.columnText}>
          Sign up with your email address to receive news and updates.
        </p>
        <div style={styles.signUpContainer}>
          <input type="email" placeholder="Enter your email" style={styles.emailInput} />
          <button style={styles.signUpButton}>Sign Up</button>
        </div>
      </div>

      {/* Site Links Section */}
      <div style={styles.column}>
        <h3 style={styles.columnTitle}>Site Links</h3>
        <div style={styles.linksGrid}>
          <a href="Events" style={styles.link}>Events</a>
          <Link to= 'Chapters' style={styles.link}>Chapters</Link>
          <Link to= 'FAQ' style={styles.link}>FAQs</Link>
          <Link to= 'Podcast' style={styles.link}>Podcast</Link>
          <a href="/link5" style={styles.link}>Volunteer</a>
          <Link to= 'About' style={styles.link}>About</Link>
          <Link to= 'Membership' style={styles.navItem}>Membership</Link>
          <a href="/link8" style={styles.link}>Collaborate</a>
          <a href="/link9" style={styles.link}>Contact</a>
        </div>
      </div>

      {/* Legal Section */}
      <div style={styles.column}>
        <h3 style={styles.columnTitle}>Legal</h3>
        <Link to= 'Privacy' style={styles.link}>Privacy</Link>
        <Link to= 'Terms' style={styles.link}>Terms</Link>
      </div>
    </section>

    {/* Bottom Border Line */}
    <div style={styles.borderLine}></div>


    <section style={styles.bottom}>
      <div style={styles.bottomText}>© 2024 Ummati Community | All Rights Reserved</div>
    </section>
  </footer>
);

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
    flex: '1',
    maxWidth: '100px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  column: {
    flex: '1',
    maxWidth: '200px',
    marginLeft: '20px',
    marginBottom: '20px',
    // backgroundColor: "blue"
  },
  columnTitle: {
    width: '100%',
    color: '#5A4283',
    fontSize: '16px',
    fontFamily: 'Quicksand',
    fontWeight: '700',
    wordWrap: 'break-word',
    marginBottom: '10px',
    textAlign: 'center', // Optional, aligns title text in the center of each column
  },
  columnText: {
    width: '100%',
    color: 'black',
    fontSize: '12px',
    fontFamily: 'Poppins',
    fontWeight: '400',
    wordWrap: 'break-word',
  },
  signUpContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  emailInput: {
    flex: '1',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
    fontSize: '14px',
    fontFamily: 'Poppins',
  },
  signUpButton: {
    width: '100%',
    height: '100%',
    background: '#78B27B',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  signUpButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: '12px',
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  linksGrid: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '5px',
  },
  link: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    textDecoration: 'none',
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
    fontWeight: '400',
    textAlign: 'center',
  },
};

export default Footer;
