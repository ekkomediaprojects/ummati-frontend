import React from "react";
import { Grid2, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import leftImage from "../assets/images/homepage/hero/left image heroSection.png";
import rightImage from "../assets/images/homepage/hero/right image heroSection.png";
import podcastImage from "../assets/images/homepage/hero/podcast.png";
const StyledHero = styled(Box)({
  backgroundColor: "#F7F5EF",
  width: "100%",
  padding: "20px 0",
  boxSizing: "border-box",
  maxWidth: "100vw",
  overflow: "hidden",
});
const HeroSection = () => (
  <StyledHero>
    {/* Header */}
    <Box textAlign="center">
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Caprasimo",
          fontSize: { xs: "14px", sm: "32px", md: "48px" },
          margin: 0,
          lineHeight: "1.2",
          color: "#3D3D3C",
        }}
      >
        Welcome to Ummati Community
      </Typography>
    </Box>

    {/* Content Section */}
    <Box
      display="flex"
      flexDirection={{ sm: "row" }}
      alignItems="center"
      justifyContent="center" // Center the content for all screen sizes
      sx={{
        width: "100%",
        gap: { xs: "14px", sm: "24px", md: "20px" },
        padding: { xs: "4px", sm: "24px" },
        boxSizing: "border-box",
        overflow: "hidden",
        marginTop: { sm: "-20px" },
      }}
    >
      {/* Left Image */}
      <Box
        component="img"
        src={leftImage}
        alt="Left side illustration"
        sx={{
          width: { xs: "70%", sm: "20%", md: "30%" },
          height: { xs: "114px", sm: "auto" },
          objectFit: "contain",
          maxWidth: "100%",
        }}
      />

      {/* Center Content */}
      <Box
        sx={{
          textAlign: "center",
          maxWidth: { xs: "90%", sm: "60%", md: "40%" },
          mx: "auto",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Quicksand",
            fontWeight: 700,
            fontSize: { xs: "10px", sm: "24px", md: "32px" },
            color: "black",
            lineHeight: "1.25",
          }}
        >
          We Are One People, One Nation.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: { xs: "8px", sm: "14px", md: "16px" },
            fontWeight: 400,
            mt: 2,
          }}
        >
          We are a community where you can meet like-minded women and enjoy the
          company of so many others just like you! We're bringing together all
          who love attending a variety of social events and creating a community
          of friendship and sisterhood.
        </Typography>

        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            padding: "8px 16px",
            fontSize: { xs: "10px", sm: "14px", md: "16px", lg: "20px" },
            fontFamily: "Quicksand",
            fontWeight: "700",
            backgroundColor: "#78B27B",
            borderRadius: "10px",
            textTransform: "none",
            width: { xs: "150px", sm: "200px", md: "250px", lg: "300px" },
          }}
        >
          Join Our Community
        </Button>
      </Box>

      {/* Right Image */}
      <Box
        component="img"
        src={rightImage}
        alt="Right side illustration"
        sx={{
          width: { xs: "150px", sm: "20%", md: "30%" },
          height: { xs: "120px", sm: "auto" },
          objectFit: "contain",
          maxWidth: "100%",
        }}
      />
    </Box>
    <div className="w-full h-[2px] bg-[#C4BAA2]" />

    {/* Informational Sections */}

    <Grid2
      container
      sx={{
        marginTop: "40px",
        maxWidth: "1200px",
        mx: "auto",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {[
        { title: "Explore Our Calendar", image: podcastImage },
        { title: "Become A Member", image: podcastImage },
        { title: "Listen To Our Podcast", image: podcastImage },
      ].map((item, index) => (
        <Grid2
          item
          xs={12}
          sm={12}
          md={4}
          key={index}
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column", // Stack the elements vertically
            alignItems: "center", // Align elements to the center horizontally
            justifyContent: "center", // Vertically center content in each grid item
            marginBottom: "20px", // Add margin at the bottom for spacing between rows
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 700,
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
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
              maxWidth: { xs: "200px", sm: "250px", md: "300px" },
              height: { xs: "200px", sm: "250px", md: "300px" },
              objectFit: "cover",
              margin: "10px auto 0",
            }}
          />
        </Grid2>
      ))}
    </Grid2>

  </StyledHero>
);

export default HeroSection;
