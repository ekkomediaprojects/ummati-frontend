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

const FortWorth = () => (
  <div>
    <Header />

    {/* Banner Section */}
    <Box
      sx={{
        width: "100%",
        height: "300px",
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
          color: "black",
          fontFamily: "Caprasimo",
          fontSize: { xs: "40px", md: "56px" },
          position: "absolute",
          top: "80%",
          transform: "translateY(-50%)",
          fontWeight: 400,
        }}
      >
        Fort Worth Chapter
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
          color: "black",
          fontSize: "22px",
          fontFamily: "Poppins",
          fontWeight: 400,
          wordWrap: "break-word",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        In Fort Worth, the Ummati Community chapter brings women together to
        foster connections, inspire growth, and provide a supportive community.
        Our Fort Worth chapter is centered on inclusivity and empathy, with
        events and programs that allow women to meet, engage, and build
        friendships. Through shared experiences and engaging activities, members
        find a safe space where they can thrive together.
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
          fontSize: "40px",
          fontFamily: "Quicksand",
          fontWeight: 700,
          marginBottom: "40px",
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
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <Typography
                sx={{
                  color: "#222222",
                  fontSize: "20px",
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
                  fontSize: "16px",
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
          fontSize: "28px",
          fontFamily: "Quicksand",
          fontWeight: 700,
          marginBottom: "20px",
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
            href: "https://www.instagram.com/uc.fortworth/",
            icon: instagramIcon,
            text: "Instagram",
          },
          {
            href: "https://chat.whatsapp.com/LuEiqO6zYi1AW2veBmquec",
            icon: whatsAppIcon,
            text: "WhatsApp",
          },
          {
            href: "https://linktr.ee/uc.fortworth",
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
            className="flex items-center gap-2 text-white text-xl"
          >
            <img
              src={link.icon}
              alt={`${link.text} Icon`}
              className="w-7 h-7"
            />
            {link.text}
          </a>
        ))}
      </Box>
    </Box>

    <Footer />
  </div>
);

export default FortWorth;
