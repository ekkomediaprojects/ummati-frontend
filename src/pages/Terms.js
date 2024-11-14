// src/pages/Privacy.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import '../assets/fonts/Poppins-Regular.ttf';

const Terms = () => (
    <div>
        <Header />
        {/* Banner Section */}
        <div style={styles.banner}>
            <h1 style={styles.bannerText}>Terms</h1>
        </div>
        {/* Main Content Section */}
        <div style={styles.contentSection}>
            <p style={styles.text}>Effective Date: November 1, 2024</p>
            <p style={styles.text}>Welcome to Ummati Community! These Terms and Conditions govern your use of ummaticommunity.com, its mobile applications, and associated services.</p>
            
            <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p style={styles.text}>By accessing and using the Ummati Community website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.</p>
            
            <h2 style={styles.sectionTitle}>2. Account Registration</h2>
            <p style={styles.text}>To use certain features of our platform, you must create an account. You agree to provide accurate information during registration and maintain the security of your account credentials.</p>
            
            <h2 style={styles.sectionTitle}>3. User Conduct</h2>
            <p style={styles.text}>
                You agree to:
                <ul>
                    <li>Use Ummati Community for lawful purposes only.</li>
                    <li>Not post or share any harmful, offensive, or illegal content.</li>
                    <li>Respect the privacy and rights of other users.</li>
                    <li>Not attempt to gain unauthorized access to our systems.</li>
                </ul>
            </p>

            <h2 style={styles.sectionTitle}>4. Content Ownership and License</h2>
            <p style={styles.text}>
                <strong>User-Generated Content:</strong> You retain ownership of the content you post on Ummati Community. However, by submitting content, you grant us a non-exclusive, royalty-free license to use, modify, and distribute it on our platform.
                <br /><br />
                <strong>Our Content:</strong> Ummati Community and its licensors retain ownership of all materials on the site, including text, graphics, and code. You may not reproduce, distribute, or create derivative works without prior written consent.
            </p>
            
            <h2 style={styles.sectionTitle}>5. Termination</h2>
            <p style={styles.text}>We reserve the right to suspend or terminate your account at our discretion if you violate these Terms and Conditions, applicable laws, or engage in misconduct.</p>
            
            <h2 style={styles.sectionTitle}>6. Third-Party Links</h2>
            <p style={styles.text}>Our website may contain links to third-party websites that are not operated or controlled by us. We are not responsible for the content, privacy policies, or practices of such websites.</p>
            
            <h2 style={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p style={styles.text}>To the fullest extent permitted by law, Ummati Community is not liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the service.</p>
            
            <h2 style={styles.sectionTitle}>8. Indemnification</h2>
            <p style={styles.text}>You agree to indemnify and hold Ummati Community harmless from any claims, losses, liabilities, or expenses arising out of your violation of these Terms and Conditions or misuse of the platform.</p>
            
            <h2 style={styles.sectionTitle}>9. Changes to Terms</h2>
            <p style={styles.text}>We reserve the right to modify these Terms and Conditions at any time. Your continued use of our services following any changes signifies your acceptance of the new terms.</p>
            
            <h2 style={styles.sectionTitle}>10. Governing Law</h2>
            <p style={styles.text}>These Terms and Conditions are governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising out of or related to these terms will be resolved in the courts of [Insert Jurisdiction].</p>
            
            <h2 style={styles.sectionTitle}>11. Contact Us</h2>
            <p style={styles.text}>
                If you have any questions about these Terms and Conditions, please contact us at:
                <br /><br />
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
    },
};

export default Terms;
