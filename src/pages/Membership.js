// src/pages/Membership.js
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

            {/* Membership Options */}
            <div style={styles.membershipOptions}>
                {/* Free Membership Box */}
                <div style={styles.membershipBoxFree}>
                    <div style={styles.priceTitle}>Free</div>
                    <div style={styles.benefitsText}>
                        <p>You pay for the events you want to attend.</p>
                        <p>The ticket price includes all supplies and planning for each event.</p>
                    </div>
                </div>

                {/* Premium Membership Box */}
                <div style={styles.membershipBoxPremium}>
                    <div style={styles.priceTitle}>
                        <span style={styles.priceText}>$20</span>
                        <span style={styles.monthText}>/Month</span>
                    </div>
                    <div style={styles.benefitsText}>
                        <p>You have access to all the events with no event fees.</p>
                        <p>Get exclusive discounts on your favorite restaurants, brands, cafes, and more!</p>
                        <p>You have early access to events.</p>
                        <p>You have early access to the travel groups.</p>
                        <p>You will have access to members-only events.</p>
                    </div>
                    <button style={styles.joinButton}>Join Now</button>
                </div>
            </div>
        </div>

        <Footer />
    </div>
);

const styles = {
    banner: {
        width: '100%',
        height: '252px',
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
        position: 'absolute',
        top: '80%',
        transform: 'translateY(-50%)',
    },
    contentSection: {
        background: '#F7F5EF',
        padding: '60px 160px',
    },
    text: {
        color: '#525252',
        fontSize: '20px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        marginBottom: '40px',
    },
    membershipOptions: {
        display: 'flex',
        gap: '40px',
        marginTop: '40px',
    },
    membershipBoxFree: {
        flex: 1,
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    membershipBoxPremium: {
        flex: 1,
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #78B27B',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    priceTitle: {
        textAlign: 'center',
        color: '#040416',
        fontSize: '48px',
        fontFamily: 'Quicksand',
        fontWeight: '700',
    },
    priceText: {
        fontSize: '48px',
        color: '#040416',
    },
    monthText: {
        fontSize: '20px',
        color: '#040416',
    },
    benefitsText: {
        color: '#686868',
        fontSize: '18px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        lineHeight: '1.6',
    },
    joinButton: {
        alignSelf: 'stretch',
        padding: '12px',
        backgroundColor: '#78B27B',
        borderRadius: '8px',
        color: 'white',
        fontSize: '18px',
        fontFamily: 'Poppins',
        fontWeight: '600',
        textAlign: 'center',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    },
};

export default Membership;
