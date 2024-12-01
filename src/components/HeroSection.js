import React from "react";
import { Grid2, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import leftImage from "../assets/images/homepage/hero/left image heroSection.png";
import rightImage from "../assets/images/homepage/hero/right image heroSection.png";
import podcastImage from "../assets/images/homepage/hero/podcast.png";
import { useNavigate } from "react-router-dom";
const StyledHero = styled(Box)({
  backgroundColor: "#F7F5EF",
  width: "100%",
  padding: "20px 0",
  boxSizing: "border-box",
  maxWidth: "100vw",
  overflow: "hidden",
});

const HeroSection = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <StyledHero>
      {/* Header */}
      <Box textAlign="center">
        <Typography
          sx={{
            fontFamily: "Caprasimo",
            fontSize: { xs: "14px", sm: "24px", md: "34px", lg: "42px" },
            margin: 0,
            lineHeight: "1.2",
            color: "#3D3D3C",
            marginTop: { xs: "4px", md: "10px", lg: "42px" },
          }}
        >
          Welcome to Ummati Community
        </Typography>
      </Box>
      {/* Content Section (Left Image, Text, and Right Image) */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          gap: { xs: "8px", sm: "14px", md: "32px" },
          boxSizing: "border-box",
          overflow: "hidden",
          // marginTop: { sm: "20px" },
          borderBottom: {
            sm: "3px solid #ECE7DA",
          },
        }}
      >
        {/* Left Image */}
        <Box
          component="img"
          src={leftImage}
          alt="Left side illustration"
          sx={{
            width: { xs: "97px", sm: "20%", md: "35%" },
            height: { xs: "114px", sm: "80%" },
            objectFit: "contain",
            maxWidth: "100%",
            alignSelf: "flex-end",
          }}
        />

        {/* Center Content */}
        <Box
          sx={{
            display: "flex", // Enable flexbox
            flexDirection: "column",
            justifyContent: "flex-start", // Align content at the top of the container
            alignItems: "center",
            textAlign: "center",
            maxWidth: { xs: "80%", sm: "60%", md: "30%" },
            mx: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 700,
              fontSize: { xs: "8px", sm: "16px", md: "24px", lg: "32px" },
              color: "black",
              lineHeight: { xs: "10px", sm: "20px", md: "24px", lg: "40px" },
              marginBottom: { sm: "20px", md: "40px" },
            }}
          >
            We Are One People, One Nation.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: "6px", sm: "8px", md: "14px", lg: "20px" },
              fontWeight: 400,
              lineHeight: { xs: "10px", sm: "12px", md: "25px" },
              mt: { lg: 2 },
            }}
          >
            We are a community where you can meet like-minded women and enjoy
            the company of so many others just like you! We're bringing together
            all who love attending a variety of social events and creating a
            community of friendship and sisterhood.
          </Typography>

          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "8px", sm: "10px", md: "14px", lg: "16px" },
              fontFamily: "Quicksand",
              fontWeight: "700",
              backgroundColor: "#78B27B",
              borderRadius: "10px",
              textTransform: "none",
              marginTop: { xs: "10px", lg: "20px" },
              width: { xs: "120px", sm: "140px", md: "200px", lg: "250px" },
            }}
            onClick={() => handleNavigate("/signup")}
          >
            Join Our Community
          </Button>
        </Box>

        <Box
          component="img"
          src={rightImage}
          alt="Right side illustration"
          sx={{
            width: { xs: "108px", sm: "20%", md: "35%" },
            height: { xs: "100px", sm: "70%", md: "60%" }, 
            objectFit: "contain", // Ensures the image maintains its aspect ratio
            maxWidth: "100%",
            alignSelf: "flex-end", // Align the image to the bottom
          }}
        />
      </Box>
      {/* Informational Sections */}
      <Box
        sx={{
          marginTop: "20px",
          maxWidth: "100%",
          mx: "auto",
          padding: "5px",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {[
          { title: "Explore Our Calendar", image: podcastImage },
          { title: "Become A Member", image: podcastImage },
          { title: "Listen To Our Podcast", image: podcastImage },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              width: { xs: "100%", sm: "33.33%" },
              textAlign: "center",
              ...(index === 1 && {
                borderLeft: { sm: "3px solid #ECE7DA" },
                borderRight: { sm: "3px solid #ECE7DA" },
              }),
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Quicksand",
                fontWeight: 700,
                fontSize: { xs: "14px", sm: "18px", md: "24px", lg: "32px" },
                lineHeight: { xs: "2px", sm: "30px", md: "30px", lg: "40px" },
                color: "black",
                marginBottom: "8px",
              }}
            >
              {item.title}
            </Typography>
            <Box
              component="img"
              src={item.image}
              alt={`${item.title} illustration`}
              sx={{
                maxWidth: { xs: "89px", sm: "150px", md: "180px" },
                height: { xs: "89px", sm: "150px", md: "180px" },
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>
    </StyledHero>
  );
};

export default HeroSection;
