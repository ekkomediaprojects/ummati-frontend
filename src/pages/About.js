// src/pages/About.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import aboutImage from '../assets/images/AboutImage.png';
import '../assets/fonts/Poppins-Regular.ttf';
import '../assets/fonts/Quicksand-Regular.ttf';

const About = () => (
    <div>
        <Header />

        {/* Banner Section */}
        <div style={styles.banner}>
            <h1 style={styles.bannerText}>About</h1>
        </div>

        {/* Main Content Section */}
        <div style={styles.contentSection}>
            <div style={styles.mainContent}>
                {/* Image Section */}
                <div style={styles.imageContainer}>
                    <img src={aboutImage} alt="About Us" style={styles.aboutImage} />
                </div>

                {/* Text Section */}
                <div style={styles.textBox}>
                    {/* History Section */}
                    <div style={styles.sectionTitle}>History</div>
                    <p style={styles.sectionText}>
                        Ummati Community was founded in May 2022 with the promise to empower and connect women. A means to allow women to create meaningful friendships, support one another, be themselves, and enjoy the experience of sisterhood as adults. Ummati Community is a place where women can meet and enjoy the company of other women from all walks of life. We host a variety of events open to all, such as professional networking meetups, social outings, volunteering opportunities, educational lectures, athletic events, playdates for kids, and gatherings for moms. Ummati Community is run solely by volunteers. We operate based on the suggestions and feedback of our community and are always open to new ideas for events. We are also accepting volunteers to help with planning and operations.
                    </p>

                    {/* Our People Section */}
                    <div style={styles.sectionTitle}>Our People</div>
                    <p style={styles.sectionText}>
                        Our people are the backbone of Ummati Community. Our members and volunteers work together to make every event a success and ensure that the community remains a welcoming and supportive environment for all.
                    </p>
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
        display: 'flex',
        justifyContent: 'center',
    },
    mainContent: {
        display: 'flex',
        gap: '40px',
        maxWidth: '1200px',
        width: '100%',
    },
    imageContainer: {
        flexShrink: 0,
        borderRadius: '8px',
        overflow: 'hidden',
        width: '483px',
        height: '718px',
        background: `url(${aboutImage}) no-repeat center center / cover`,
    },
    aboutImage: {
        width: '100%',
        height: '100%',
        borderRadius: '8px',
    },
    textBox: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    sectionTitle: {
        color: '#5A4283',
        fontSize: '28px',
        fontFamily: 'Quicksand',
        fontWeight: '700',
    },
    sectionText: {
        color: 'black',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        lineHeight: '1.6',
    },
};

export default About;
