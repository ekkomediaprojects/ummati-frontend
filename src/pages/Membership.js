// src/pages/Membership.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/membership/membershipBanner.png';
import activateLogo from '../assets/images/membership/partnerships/activiateLogo.svg';
import deRaCoffeeLogo from '../assets/images/membership/partnerships/deRaCoffeeLogo.svg';
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
                    <ul style={styles.benefitsText}>
                        <li>• You pay for the events you want to attend.</li>
                        <br />
                        <li>• The ticket price includes all supplies and planning for each event.</li>
                    </ul>
                </div>

                {/* Premium Membership Box */}
                <div style={styles.membershipBoxPremium}>
                    <div style={styles.priceTitle}>
                        <span style={styles.priceText}>$20</span>
                        <span style={styles.monthText}>/Month</span>
                    </div>
                    <ul style={styles.benefitsText}>
                        <li>• You have access to all the events with no event fees.</li>
                        <br />
                        <li>• Get exclusive discounts on your favorite restaurants, brands, cafes, and more! </li>
                        <br />
                        <li>• You have early access to events.</li>
                        <br />
                        <li>• You have early access to the travel groups.</li>
                        <br />
                        <li>• You will have access to members-only events.</li>
                    </ul>
                    <button style={styles.joinButton}>Join Now</button>
                </div>
            </div>
        </div>

        {/* Partnership Section */}
        <div style={styles.partnershipSection}>
            <h2 style={styles.partnershipTitle}>Our Partnerships</h2>
            <div style={styles.partnershipLogos}>
                <div style={styles.logoContainer}>
                    <img src={activateLogo} alt="Activate Logo" style={styles.logoImage} />
                    <div style={styles.logoCaption}>Dallas location: 10% off</div>
                </div>
                <div style={styles.logoContainer}>
                    <img src={deRaCoffeeLogo} alt="deRa Coffee Logo" style={styles.logoImage} />
                    <div style={styles.logoCaption}>Plano location: 10% off</div>
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
        position: 'relative',
    },
    bannerText: {
        color: 'black',
        fontFamily: 'Caprasimo',
        fontSize: '56px',
        position: 'absolute',
        top: '80%', // Adjusted to position text within the banner
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
        justifyContent: 'center',
        marginTop: '40px',
    },
    membershipBoxFree: {
        width: '360px',
        height: '392px',
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    membershipBoxPremium: {
        width: '360px',
        height: '607px',
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #78B27B',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    priceTitle: {
        textAlign: 'left',
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
        //listStyleType: 'disc', // Adds bullet points
        paddingLeft: '15px', // Indents the list for better spacing
        color: '#686868',
        fontSize: '18px',
        fontFamily: 'Poppins',
        fontWeight: '400',
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
    partnershipSection: {
        background: '#white',
        padding: '60px 60px',
        textAlign: 'center',
    },
    partnershipTitle: {
        color: '#5A4283', 
        fontSize: '32px', 
        fontFamily: 'Quicksand', 
        fontWeight: '500',
        marginBottom: '40px',
        textAlign: 'center', // Centers title only
    },
    partnershipLogos: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'flex-end', // Aligns items by the captions
        gap: '40px',
        marginTop: '20px',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoImage: {
        width: '100px', // Adjust as needed for logo sizes
        height: 'auto',
    },
    logoCaption: {
        color: 'black',
        fontSize: '12px',
        fontFamily: 'Quicksand',
        fontWeight: '500',
        marginTop: '8px',
        textAlign: 'center',
        minHeight: '20px', // Ensures captions align the logos at the same base
    },
};


export default Membership;
