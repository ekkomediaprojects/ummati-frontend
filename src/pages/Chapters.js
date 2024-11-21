import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import { Typography, Box } from '@mui/material';
import '../assets/fonts/Poppins-Regular.ttf';

const Chapters = () => (
  <div>
    <Header />
    
    {/* Banner Section */}
    <Box
      sx={{
        width: "100%",
        height: "220px",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color:"#3D3D3C",
          fontFamily: "Caprasimo",
          fontSize: { xs: "36px", sm: "48px", md: "56px" },
          position: "absolute",
          top: "80%",
          transform: "translateY(-50%)",
        }}
      >
        Chapters
      </Typography>
    </Box>

    {/* Main Content Section */}
    <div className="bg-[#F7F5EF] px-4 py-16 md:px-40">
      <Typography 
        variant="body1" 
        className="text-black break-words" 
        style={{
          fontFamily: 'Poppins, sans-serif', 
          fontWeight: 400, 
          fontSize: '22px', 
          lineHeight: '33px'
        }}
      >
        Ummati Community is a dynamic and expanding organization committed to creating a supportive network for women across the United States. With established chapters in several cities, we are actively expanding our reach and looking for dedicated leaders to help establish new chapters nationwide. Our mission is to offer women a safe and inclusive space where they can connect with one another, regardless of age or life stage.
        <br /><br />
        We believe in the importance of fostering an environment where women can share their experiences, engage in meaningful conversations, and build lasting friendships. Each chapter of Ummati Community is designed to bring together women from diverse backgrounds, allowing them to find camaraderie and mutual support within a welcoming and encouraging community. Through regular gatherings and activities, members have the opportunity to grow personally while contributing to the well-being of others.
        <br /><br />
        In addition to social connection, Ummati Community also emphasizes professional networking and personal development. By creating spaces where women can exchange ideas, learn from one another, and build valuable networks, we aim to empower members to thrive both personally and professionally. We invite women who are passionate about community building and leadership to join us in expanding this supportive network across the country.
      </Typography>
    </div>

    <Footer />
  </div>
);
export default Chapters;
