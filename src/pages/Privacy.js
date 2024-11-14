// src/pages/Privacy.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import '../assets/fonts/Poppins-Regular.ttf';

const Privacy = () => (
    <div>
        <Header />
        {/* Banner Section */}
        <div style={styles.banner}>
            <h1 style={styles.bannerText}>Privacy</h1>
        </div>

        {/* Main Content Section */}
        <div style={styles.contentSection}>
            <p style={styles.text}>
                Effective Date: November 1, 2024
            </p>
            <p style={styles.text}>
                At Ummati Community, we value and respect the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website (ummaticommunity.com), mobile applications, and other online services.
            </p>
            
            <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
            <p style={styles.text}>
                We may collect the following types of information:
            </p>
            <p style={styles.text}>
                <strong>Personal Information:</strong> This includes details such as your name, email address, phone number, and other contact information.
                <br />
                <strong>Account Information:</strong> Information such as your username, password, profile picture, and preferences.
                <br />
                <strong>Usage Data:</strong> We collect information about how you interact with our website and services, including IP addresses, browser type, device information, and pages visited.
                <br />
                <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance user experience, track website performance, and personalize content.
            </p>

            <h2 style={styles.sectionTitle}>2. How We Use Your Information</h2>
            <p style={styles.text}>
                The information we collect is used for:
            </p>
            <ul style={styles.list}>
                <li>Providing and improving our services.</li>
                <li>Personalizing your experience.</li>
                <li>Communicating with you about updates, offers, or support.</li>
                <li>Ensuring compliance with legal obligations.</li>
                <li>Conducting data analysis to improve user experience.</li>
            </ul>

            <h2 style={styles.sectionTitle}>3. Sharing of Your Information</h2>
            <p style={styles.text}>
                We may share your personal data with:
            </p>
            <ul style={styles.list}>
                <li><strong>Service Providers:</strong> Third-party companies that help us operate the platform, such as hosting and analytics services.</li>
                <li><strong>Legal Compliance:</strong> If required by law or in response to valid legal processes.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale.</li>
            </ul>

            <h2 style={styles.sectionTitle}>4. Data Security</h2>
            <p style={styles.text}>
                We implement appropriate technical and organizational security measures to protect your information from unauthorized access, loss, or alteration.
            </p>

            <h2 style={styles.sectionTitle}>5. Your Rights</h2>
            <p style={styles.text}>
                You have the right to:
            </p>
            <ul style={styles.list}>
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt-out of receiving marketing communications.</li>
                <li>Request restrictions on data processing.</li>
            </ul>

            <h2 style={styles.sectionTitle}>6. Children's Privacy</h2>
            <p style={styles.text}>
                Our services are not intended for individuals under the age of 13, and we do not knowingly collect personal data from children.
            </p>

            <h2 style={styles.sectionTitle}>7. Changes to the Privacy Policy</h2>
            <p style={styles.text}>
                We reserve the right to modify this Privacy Policy at any time. We will notify you of changes by updating the “Effective Date” at the top of this policy.
            </p>

            <h2 style={styles.sectionTitle}>8. Contact Us</h2>
            <p style={styles.text}>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
                <br />
                Email: team@ummaticommunity.com
            </p>
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
        position: 'relative',
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
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '400',
        wordWrap: 'break-word',
        marginBottom: '16px',
    },
    sectionTitle: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '700',
        wordWrap: 'break-word',
        marginBottom: '8px',
        marginTop: '16px',
    },
    list: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '400',
        wordWrap: 'break-word',
        marginLeft: '20px',
        marginBottom: '16px',
        listStyleType: 'disc',
    },
};

export default Privacy;
