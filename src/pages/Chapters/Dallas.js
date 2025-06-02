import React from "react";
import { Grid2, Typography, Box } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import banner from "../../assets/images/chapters/Dallas/banner.png";
import rabiaFatima from "../../assets/images/chapters/Dallas/Rabia Fatima - Co-Founder and President.png";
import khadeejaZulqarnain from "../../assets/images/chapters/Dallas/Khadeeja Zulqarnain - Vice President.png";
import zarinKhan from "../../assets/images/chapters/Dallas/Zarin Khan - Events Coordinator.png";
import sidrahAhmed from "../../assets/images/chapters/Dallas/Sidrah Ahmed - Events Coordinator.png";
import mareeaAbdusSaboor from "../../assets/images/chapters/Dallas/Mareea Abdus Saboor - Events Coordinator.png";
import mahnoorShahid from "../../assets/images/chapters/Dallas/Mahnoor Shahid - Event Coordinator.png";
import instagramIcon from "../../assets/images/chapters/instagramIcon.svg";
import whatsAppIcon from "../../assets/images/chapters/whatsAppIcon.svg";
import linkTreeIcon from "../../assets/images/chapters/LinktreeIcon.svg";
import youTubeIcon from "../../assets/images/chapters/youTubeIcon.svg";
import "../../assets/fonts/Quicksand-Regular.ttf";
import "../../assets/fonts/Poppins-Regular.ttf";

const Dallas = () => (
  <div>
    

    {/* Banner Section */}
    <Box
      sx={{
        width: "100%",
        height: { xs: "200px", sm: "250px", md: "300px" },
        backgroundImage: `url(${banner})`,
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
        Dallas Chapter
      </Typography>
    </Box>

    {/* Main Content Section */}
    <Box
      sx={{
        backgroundColor: "#F7F5EF",
        padding: "40px 20px",
        textAlign: "left",
      }}
    >
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: { xs: "12px", sm: "16px", md: "22px" },
          fontHeight: { xs: "18px", sm: "24px", md: "33px" },
          fontFamily: "poppins",
          color: "black",
          maxWidth: { xs: "316px", md: "816px", lg: "1164px" },
          marginX: "auto",
        }}
      >
        The Dallas chapter of Ummati Community is dedicated to building a
        vibrant network for women in the Dallas area, offering a space where
        members can find support, encouragement, and lasting friendships. With a
        focus on community engagement and personal growth, our Dallas chapter
        provides a range of events, from social gatherings to networking
        opportunities, helping women in all stages of life feel connected and
        empowered.
      </Typography>
    </Box>

    {/* Meet The Team Section */}
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "#5A4283",
          fontSize: { xs: "24px", sm: "32px", md: "40px" }, // Responsive font size
          fontFamily: "Quicksand",
          fontWeight: 700,
          marginBottom: { xs: "20px", md: "40px" }, // Responsive margin
        }}
      >
        Meet The Team
      </Typography>

      <Grid2 container spacing={4} justifyContent="center" alignItems="center">
        {[
          {
            image: rabiaFatima,
            name: "Rabia Fatima",
            title: "Co-Founder and President"
          },
          {
            image: khadeejaZulqarnain,
            name: "Khadeeja Zulqarnain",
            title: "Vice President"
          },
          {
            image: zarinKhan,
            name: "Zarin Khan",
            title: "Events Coordinator"
          },
          {
            image: sidrahAhmed,
            name: "Sidrah Ahmed",
            title: "Events Coordinator"
          },
          {
            image: mareeaAbdusSaboor,
            name: "Mareea Abdus Saboor",
            title: "Events Coordinator"
          },
          {
            image: mahnoorShahid,
            name: "Mahnoor Shahid",
            title: "Event Coordinator"
          }
        ].map((member, index) => (
          <Grid2
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  maxWidth: "150px",
                  height: "auto",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                  aspectRatio: "1/1",
                  objectPosition: "center"
                }}
              />
              <Typography
                sx={{
                  color: "#222222",
                  fontSize: { xs: "16px", md: "20px" },
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  marginBottom: "5px",
                }}
              >
                {member.name}
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: { xs: "14px", md: "16px" },
                  fontFamily: "Poppins",
                  fontWeight: 400,
                }}
              >
                {member.title}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>

    {/* Social Media Section */}
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#5A4283",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "#E6E6FA",
          fontSize: { xs: "20px", md: "28px" }, // Responsive font size
          fontFamily: "Quicksand",
          fontWeight: 700,
          marginBottom: "20px",
          textAlign: "center", // Ensure centered alignment
        }}
      >
        Listen from the best podcast platform
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: { xs: "20px", md: "40px" }, // Responsive gap
          justifyContent: "center",
          alignItems: "center", // Ensure vertical alignment
          flexWrap: "wrap",
        }}
      >
        {[
          {
            href: "https://www.instagram.com/uc.dallas/",
            icon: instagramIcon,
            text: "Instagram",
          },
          {
            href: "https://chat.whatsapp.com/BhiWJrnt8O30mJOZwc0oat",
            icon: whatsAppIcon,
            text: "WhatsApp",
          },
          {
            href: "https://linktr.ee/uc.dallas",
            icon: linkTreeIcon,
            text: "LinkTree",
          },
          {
            href: "https://www.youtube.com/channel/UCy4Btf7DoWFOlk1vSDzTAvQ",
            icon: youTubeIcon,
            text: "YouTube",
          },
        ].map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "white",
              fontSize: "inherit",
            }}
          >
            <img
              src={link.icon}
              alt={`${link.text} Icon`}
              style={{
                width: "24px",
                height: "24px", // Small size for icons
                maxWidth: { xs: "20px", md: "30px" }, // Responsive icon size
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "18px" }, // Responsive font size
                fontWeight: 500,
              }}
            >
              {link.text}
            </Typography>
          </a>
        ))}
      </Box>
    </Box>

    
  </div>
);

export default Dallas;
