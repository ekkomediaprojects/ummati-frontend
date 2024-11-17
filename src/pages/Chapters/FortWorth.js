// src/pages/Chapters/FortWorth.js
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import banner from '../../assets/images/chapters/Fort Worth/banner.png';
import teamPhotoPlaceholder from '../../assets/images/chapters/teamPhotoPlaceholder.png';
import instagramIcon from '../../assets/images/chapters/instagramIcon.svg';
import whatsAppIcon from '../../assets/images/chapters/whatsAppIcon.svg';
import linkTreeIcon from '../../assets/images/chapters/LinktreeIcon.svg';
import youTubeIcon from '../../assets/images/chapters/youTubeIcon.svg';
import '../../assets/fonts/Quicksand-Regular.ttf';
import '../../assets/fonts/Poppins-Regular.ttf';

const FortWorth = () => (
    <div>
        <Header />
        {/* Banner Section */}
        <div style={styles.banner}>
            <h1 style={styles.bannerText}>Fort Worth Chapter</h1>
        </div>
        {/* Main Content Section */}
        <div style={styles.contentSection}>
            <div style={styles.text}>
                In Fort Worth, the Ummati Community chapter brings women together to foster connections, inspire growth, and provide a supportive community. Our Fort Worth chapter is centered on inclusivity and empathy, with events and programs that allow women to meet, engage, and build friendships. Through shared experiences and engaging activities, members find a safe space where they can thrive together.
            </div>
        </div>
        {/* Meet The Team Section */}
        <div style={styles.teamSection}>
            <div style={styles.teamTitle}>Meet The Team</div>
            <div style={styles.teamGrid}>
                {/* Team Member Placeholders */}
                {[...Array(5)].map((_, index) => (
                    <div key={index} style={styles.teamMember}>
                        <img src={teamPhotoPlaceholder} alt="Team Placeholder" style={styles.teamPhoto} />
                        <div style={styles.teamName}>Name</div>
                        <div style={styles.teamTitleText}>Title</div>
                    </div>
                ))}
            </div>
        </div>
        {/* Social Media Section */}
        <div style={styles.socialMediaSection}>
            <div style={styles.socialMediaTitle}>Listen from the best podcast platform</div>
            <div style={styles.socialMediaLinks}>
                {/* Instagram */}
                <a href="https://www.instagram.com/uc.fortworth/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                    <img src={instagramIcon} alt="Instagram Icon" style={styles.icon} />
                    <div style={styles.socialLinkText}>Instagram</div>
                </a>
                {/* WhatsApp */}
                <a href="https://chat.whatsapp.com/LuEiqO6zYi1AW2veBmquec" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                    <img src={whatsAppIcon} alt="WhatsApp Icon" style={styles.icon} />
                    <div style={styles.socialLinkText}>WhatsApp</div>
                </a>
                {/* LinkTree */}
                <a href="https://linktr.ee/uc.fortworth" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                    <img src={linkTreeIcon} alt="LinkTree Icon" style={styles.icon} />
                    <div style={styles.socialLinkText}>LinkTree</div>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/channel/UCy4Btf7DoWFOlk1vSDzTAvQ" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                    <img src={youTubeIcon} alt="YouTube Icon" style={styles.icon} />
                    <div style={styles.socialLinkText}>YouTube</div>
                </a>
            </div>
        </div>
        <Footer />
    </div>
);

const styles = {
    banner: {
        width: '100%',
        height: '300px',
        backgroundImage: `url(${banner})`,
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
        fontWeight: '400',
    },
    contentSection: {
        background: '#F7F5EF',
        padding: '40px 20px',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        width: '100%',
        maxWidth: '1100px',
        color: 'black',
        fontSize: '22px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        wordWrap: 'break-word',
    },
    teamSection: {
        width: '100%',
        background: 'white',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    teamTitle: {
        width: '100%',
        textAlign: 'center',
        color: '#5A4283',
        fontSize: '40px',
        fontFamily: 'Quicksand',
        fontWeight: '700',
        wordWrap: 'break-word',
        marginBottom: '40px',
    },
    teamGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        justifyItems: 'center',
        width: '100%',
        maxWidth: '1300px',
    },
    teamMember: {
        textAlign: 'center',
    },
    teamPhoto: {
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    teamName: {
        width: '100%',
        textAlign: 'center',
        color: '#222222',
        fontSize: '20px',
        fontFamily: 'Quicksand',
        fontWeight: '700',
        wordWrap: 'break-word',
        marginBottom: '5px',
    },
    teamTitleText: {
        width: '100%',
        textAlign: 'center',
        color: 'black',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        wordWrap: 'break-word',
    },
    socialMediaSection: {
        width: '100%',
        background: '#5A4283',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    socialMediaTitle: {
        textAlign: 'center',
        color: '#E6E6FA',
        fontSize: '28px',
        fontFamily: 'Quicksand',
        fontWeight: '700',
        marginBottom: '20px',
    },
    socialMediaLinks: {
        display: 'flex',
        gap: '100px',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    socialLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
    },
    icon: {
        width: '30px',
        height: '30px',
    },
    socialLinkText: {
        color: 'white',
        fontSize: '24px',
        fontFamily: 'Poppins',
        fontWeight: '400',
    },
};

export default FortWorth;
