import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import { Typography, Box } from '@mui/material';
import '../assets/fonts/Poppins-Regular.ttf';

const Chapters = () => (
  <div>
    
    
    {/* Banner Section */}
    <Box
      sx={{
        width: "100%",
        height:"219px",
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
          color: "#3D3D3C",
          fontFamily: "Caprasimo",
          fontSize: { xs: "32px", md: "40px" },
          position: "absolute",
          bottom: "10%",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Chapters
      </Typography>
    </Box>

    {/* Main Content Section */}
    <div
      className="bg-[#F7F5EF] px-4 py-16 md:px-40"
      // style={{ minHeight: "100vh" }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "black",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "18px", md: "22px" }, // Responsive font sizes
          lineHeight: { xs: "24px", sm: "28px", md: "33px"}, // Adjusted line height
        }}
      >
        Ummati Community is a dynamic and expanding organization committed to
        creating a supportive network for women across the United States. With
        established chapters in several cities, we are actively expanding our
        reach and looking for dedicated leaders to help establish new chapters
        nationwide. Our mission is to offer women a safe and inclusive space
        where they can connect with one another, regardless of age or life
        stage.
        <br />
        <br />
        We believe in the importance of fostering an environment where women can
        share their experiences, engage in meaningful conversations, and build
        lasting friendships. Each chapter of Ummati Community is designed to
        bring together women from diverse backgrounds, allowing them to find
        camaraderie and mutual support within a welcoming and encouraging
        community. Through regular gatherings and activities, members have the
        opportunity to grow personally while contributing to the well-being of
        others.
        <br />
        <br />
        In addition to social connection, Ummati Community also emphasizes
        professional networking and personal development. By creating spaces
        where women can exchange ideas, learn from one another, and build
        valuable networks, we aim to empower members to thrive both personally
        and professionally. We invite women who are passionate about community
        building and leadership to join us in expanding this supportive network
        across the country.
      </Typography>
    </div>

    
  </div>
);

export default Chapters;
