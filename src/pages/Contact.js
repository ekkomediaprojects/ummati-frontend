// src/pages/Contact.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import '../assets/fonts/Poppins-Regular.ttf';
import '../assets/fonts/Quicksand-Regular.ttf';

const Contact = () => (
    <div>
        <Header />

        {/* Banner Section */}
        <div style={styles.banner}>
            <h1 style={styles.bannerText}>Contact</h1>
        </div>
        {/* Main Content Section */}
        <div style={styles.contentSection}>
            <h2 style={styles.title}>Get in Touch with Us!</h2>
            <p style={styles.text}>Have any questions or need assistance? We’re here to help. Fill out the form below, and we’ll get back to you as soon as possible.</p>

            {/* Contact Form */}
            <div style={styles.formContainer}>
                {/* First Name */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>First Name</label>
                    <div style={styles.inputBox}>
                        <span style={styles.placeholderText}>Enter First Name</span>
                    </div>
                </div>

                {/* Last Name */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Last Name</label>
                    <div style={styles.inputBox}>
                        <span style={styles.placeholderText}>Enter Last Name</span>
                    </div>
                </div>

                {/* Email */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <div style={styles.inputBox}>
                        <span style={styles.placeholderText}>Enter Email</span>
                    </div>
                </div>

                {/* Topic */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Topic</label>
                    <div style={styles.inputBox}>
                        <span style={styles.placeholderText}>Select Topic</span>
                    </div>
                </div>

                {/* Message */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Message</label>
                    <div style={styles.textareaBox}>
                        <span style={styles.placeholderText}>Enter Message</span>
                    </div>
                </div>

                {/* Submit Button */}
                <div style={styles.submitButton}>
                    <span style={styles.submitText}>Submit</span>
                </div>
            </div>
        </div>

        <Footer />
    </div>
);

const styles = {
    banner: {
        width: '100%',
        height: '220px',
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerText: {
        color: 'black',
        fontFamily: 'Caprasimo',
        fontSize: '56px',
    },
    contentSection: {
        background: '#F7F5EF',
        padding: '60px 160px',
        textAlign: 'center',
    },
    title: {
        color: '#5A4283',
        fontSize: '32px',
        fontFamily: 'Quicksand',
        fontWeight: '500',
        marginBottom: '20px',
    },
    text: {
        color: 'black',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '500',
        marginBottom: '40px',
    },
    formContainer: {
        width: '100%',
        maxWidth: '600px',
        padding: '24px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        margin: '0 auto',
        alignItems: 'flex-start', // Ensures left alignment for all elements
        textAlign: 'left', // Left-align text within form
    },
    inputGroup: {
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        alignSelf: 'stretch',
        color: '#1E1E1E',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    inputBox: {
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
        paddingBottom: '12px',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        display: 'flex',
        textAlign: 'left', // Left-align content within input box
    },
    placeholderText: {
        flex: '1 1 0',
        color: '#B3B3B3',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        textAlign: 'left',
    },
    textareaBox: {
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
        paddingBottom: '60px', // Increased padding for a textarea-like field
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        display: 'flex',
        textAlign: 'left', // Left-align content within textarea box
    },
    submitButton: {
        alignSelf: 'stretch',
        padding: '12px',
        background: '#78B27B',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    submitText: {
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
};

export default Contact;
