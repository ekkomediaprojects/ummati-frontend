import React from "react";
import { Grid2, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import leftImage from "../assets/images/homepage/hero/left image heroSection.png";
import leftImageCroped from "../assets/images/homepage/hero/left image heroSectionCroped.png";
import rightImageCroped from "../assets/images/homepage/hero/right image heroSectionCroped.png";

import rightImage from "../assets/images/homepage/hero/right image heroSection.png";
import calendarImage from "../assets/images/homepage/hero/calendar.svg";
import memberImage from "../assets/images/homepage/hero/member.svg";
import podcastImage from "../assets/images/homepage/hero/podcast.svg";
import { useNavigate } from "react-router-dom";
const StyledHero = styled(Box)({
  backgroundColor: "#F7F5EF",
  width: "100%",
  paddingTop: "15px",
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
            fontFamily: "Cooper Black",
            fontWeight : "bold",
            fontSize: { xs: "14px", sm: "24px", md: "34px", lg: "82px" },
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
          marginTop: { sm: "20px" },
          borderBottom: "2px solid #ECE7DA",
        }}
      >
        {/* Left Image */}
        <Box
          component="img"
          src={leftImage}
          alt="Left side illustration"
          sx={{
            width: { xs: "97px", sm: "20%", md: "35%" },
            height: { xs: "114px", sm: "auto" },
            maxWidth: "100%",
            alignSelf: "flex-end",
          }}
        />

        {/* Center Content */}
        <Box
          sx={{
            display: "flex", // Enable flexbox
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
            maxWidth: { xs: "80%", sm: "60%", md: "50%" },
            mx: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 700,
              fontSize: { xs: "8px", sm: "16px", lg: "32px" },
              color: "black",
              lineHeight: { xs: "10px", sm: "20px", lg: "40px" },
              marginBottom: { sm: "20px", lg: "60px" },
            }}
          >
            We Are One People, One Nation.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: "6px", sm: "8px", md: "14px", lg: "20px" },
              fontWeight: 400,
              textAlign : "center",
              lineHeight: { xs: "10px", sm: "12px", md: "30px" },
              mt: { lg: 2 },
            }}
          >
          We are a community where you can meet like-minded women and enjoy the company of so many others just like you! We're bringing together all who love attending a variety of social events and creating a community of friendship and sisterhood.
          </Typography>

          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "7px", sm: "10px", md: "14px", lg: "16px" },
              fontFamily: "Quicksand",
              fontWeight: "700",
              backgroundColor: "#78B27B",
              borderRadius: "10px",
              textTransform: "none",
              whiteSpace: "nowrap",
              marginTop: { xs: "8px", lg: "20px" },
              width: { xs: "100px", sm: "140px", md: "200px", lg: "250px" },
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
            height: { xs: "100px", sm: "auto" }, 
            objectFit: "contain",
            maxWidth: "100%",
            alignSelf: "flex-end", 
          }}
        />
      </Box>
      {/* Informational Sections */}
      <Box
        sx={{
          marginTop: "20px",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        
        {[
          { title: "Explore Our Calendar", image: calendarImage },
          { title: "Become A Member", image: memberImage },
          { title: "Listen To Our Podcast", image: podcastImage },
        ].map((item, index) => (
          <React.Fragment key={index}>
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: { xs: "100%", sm: "calc(33.33% - 20px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Quicksand",
                fontWeight: 700,
                padding: "10px",
                fontSize: { xs: "14px",  lg: "32px" },
                lineHeight: { xs: "2px", lg: "40px" },
                color: "black",
              }}
            >
              {item.title}
            </Typography>
            <Box
              component="img"
              src={item.image}
              alt={`${item.title} illustration`}
              sx={{
                marginBottom : "10px",
                maxWidth: { xs: "89px", sm: "150px", md: "180px" },
                height: { xs: "89px", sm: "150px", md: "180px" },
                objectFit: "contain",
              }}
            />
          </Box>

        {/* Full-width line after each image */}
        <Box
          sx={{
            width: "100%",
            height: "2px",
            backgroundColor: "#ECE7DA",
            ...(index !==2 && {marginBottom: { xs: "20px", sm: "0" }}),
            display: { xs: "block", sm: "none" },
          }}
        />
        <Box
          sx={{
            width: "2px",
            height: { xs: "0", sm: "160px", md: "200px", lg: "220px" },
            backgroundColor: "#ECE7DA",
            marginBottom: { xs: "0px", sm: "15px" },
            display: { xs: "none", sm: "block" }
          }}
        />
      </React.Fragment>
        ))}
      </Box>
    </StyledHero>
  );
};

export default HeroSection;
