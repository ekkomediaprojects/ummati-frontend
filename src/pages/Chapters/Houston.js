import React from "react";
import { Grid2, Typography, Box } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import banner from "../../assets/images/chapters/Dallas/banner.png";
import teamPhotoPlaceholder from "../../assets/images/chapters/teamPhotoPlaceholder.png";
import instagramIcon from "../../assets/images/chapters/instagramIcon.svg";
import whatsAppIcon from "../../assets/images/chapters/whatsAppIcon.svg";
import linkTreeIcon from "../../assets/images/chapters/LinktreeIcon.svg";
import youTubeIcon from "../../assets/images/chapters/youTubeIcon.svg";
import "../../assets/fonts/Quicksand-Regular.ttf";
import "../../assets/fonts/Poppins-Regular.ttf";

const Houston = () => (
  <div>
    <Header />

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
        Houston Chapter
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
        Ummati Community’s Houston chapter is a welcoming and inclusive space
        for women across the city to come together, share experiences, and build
        strong bonds. Our Houston chapter hosts various events designed to
        inspire and uplift, providing members with opportunities for meaningful
        conversations, collaborative projects, and professional networking.
        Women of all backgrounds and ages are encouraged to join and become part
        of this thriving community.
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
        {[...Array(5)].map((_, index) => (
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
                src={teamPhotoPlaceholder}
                alt="Team Placeholder"
                style={{
                  width: "100%",
                  maxWidth: "150px", // Set max width for small screens
                  height: "auto",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "#222222",
                  fontSize: { xs: "16px", md: "20px" }, // Responsive font size
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  marginBottom: "5px",
                }}
              >
                Name
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: { xs: "14px", md: "16px" }, // Responsive font size
                  fontFamily: "Poppins",
                  fontWeight: 400,
                }}
              >
                Title
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
          gap: "40px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            href: "https://www.instagram.com/uc.houston/",
            icon: instagramIcon,
            text: "Instagram",
          },
          {
            href: "https://chat.whatsapp.com/JC4vUbvFpO76gn5MpkcubD",
            icon: whatsAppIcon,
            text: "WhatsApp",
          },
          {
            href: "https://linktr.ee/uc.houston",
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

    <Footer />
  </div>
);

export default Houston;
