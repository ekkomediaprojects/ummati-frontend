// src/components/Footer.js
import React from 'react';
import logo from '../assets/images/footer logo.svg';

const Footer = () => (
  <footer>
    <section style={styles.top}>
    <img src={logo} alt="Logo" style={styles.logo} />
    </section>

    <section style={styles.bottom}>
      <div style={styles.text}>© 2024 Ummati Community | All Rights Reserved</div>
    </section>
    
  </footer>
);

const styles = {
  bottom: {
    width: '100%',
    height: '100%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0', // Optional padding for spacing
  },
  top: {
    backgroundColor: '#F7F5EF',
  },
  text: {
    color: '#111111',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 400,
    wordWrap: 'break-word',
    textAlign: 'center',
  },
};

export default Footer;
