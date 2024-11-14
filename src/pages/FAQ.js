// src/pages/FAQ.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';

const FAQ = () => (
    <div style={styles.pageContainer}>
        <Header />
        
        {/* Banner Section */}
        <div style={styles.banner}>
            <h1 style={styles.bannerText}>FAQ</h1>
        </div>

        {/* FAQ Content */}
        <div style={styles.faqContainer}>
            <div style={styles.questionSection}>
                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>What is Ummati Community?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                    <p style={styles.answerText}>
                        Ummati Community is a ladies-only social group for women of all ages. It plans engaging events for anyone wanting to meet new people and socialize about their common interests.
                    </p>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>How do I join Ummati Community?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>Is there an age range?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>What city is Ummati Community based in?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>How can I open a chapter in my city?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>How do I contact the event planners?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>How can I share event ideas?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>Is there a membership fee?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>

                <div style={styles.questionBox}>
                    <div style={styles.questionHeader}>
                        <h2 style={styles.questionTitle}>What is the refund policy?</h2>
                        <div style={styles.toggleIcon}></div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
);

const styles = {
    pageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#F7F5EF',
    },
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
        textAlign: 'center',
    },
    faqContainer: {
        padding: '60px 160px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    questionSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    questionBox: {
        padding: '35px 52px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    questionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    questionTitle: {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Quicksand',
        fontWeight: '700',
        wordWrap: 'break-word',
    },
    toggleIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid #78B27B',
    },
    answerText: {
        fontSize: '20px',
        color: '#646363',
        fontFamily: 'Poppins',
        fontWeight: '400',
    },
};

export default FAQ;
