import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/membership/membershipBanner.png";
import activateLogo from "../assets/images/membership/partnerships/activiateLogo.svg";
import deRaCoffeeLogo from "../assets/images/membership/partnerships/deRaCoffeeLogo.svg";
import { Button, Typography, Box } from "@mui/material"; // Material UI components
import "../assets/fonts/Poppins-Regular.ttf";
import "../assets/fonts/Quicksand-Regular.ttf";

const Membership = () => (
  <Box>
    <Header />

    {/* Banner Section */}
    <Box
      sx={{
        width: "100%",
        height: "220px",
        backgroundColor: "#F7F5EF",
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
          fontSize: { xs: "36px", sm: "48px", md: "56px" },
          position: "absolute",
          top: "50%", // Center the text vertically
          transform: "translateY(-50%)",
        }}
      >
        Membership
      </Typography>
    </Box>

    {/* Membership Info Section */}

    {/* Main Content Section */}
    <Box sx={{ backgroundColor: "#F7F5EF", py: 8, px: { xs: 2, sm: 16 } }}>
      <Box
        sx={{
          backgroundColor: "#F7F5EF",
          width: "100%",
          maxWidth: "1069px", // Set a max width
          margin: "0 auto", // Center the content
          padding: { xs: 2, sm: 4 }, // Add responsive padding
          opacity: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#3D3D3C", // Darker text for better readability
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            marginBottom: 2, // Margin bottom for spacing
            textAlign: { xs: "center", sm: "left" }, // Align text based on screen size
          }}
        >
          Unlock exclusive benefits and elevate your experience by joining our
          membership program! As a valued member, you'll gain access to special
          discounts, early product releases, members-only events, and more.
          Whether you're looking for extra perks or a deeper connection to our
          community, our membership is designed to offer unbeatable value. Join
          today and start enjoying the privileges you deserve!
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {/* Free Membership Box */}
        <Box
          sx={{
            width: { xs: "100%", sm: "360px" },
            backgroundColor: "white",
            p: 4,
            borderRadius: "16px",
            border: "1px solid #C4BAA2",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              color: "#040416",
              fontSize: "2.25rem",
              fontFamily: "Quicksand",
              fontWeight: "bold",
            }}
          >
            Free
          </Typography>
          <ul
            style={{
              paddingLeft: "1.5rem",
              color: "#686868",
              fontSize: "1.25rem",
              listStyleType: "disc"
            }}
          >
            <li>You pay for the events you want to attend.</li>
            <li>
              The ticket price includes all supplies and planning for each
              event.
            </li>
          </ul>
        </Box>

        {/* Premium Membership Box */}
        <Box
          sx={{
            width: { xs: "100%", sm: "360px" },
            backgroundColor: "white",
            p: 4,
            borderRadius: "16px",
            border: "2px solid #78B27B",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              color: "#040416",
              fontSize: "2.25rem",
              fontFamily: "Quicksand",
              fontWeight: "bold",
            }}
          >
            <span>$20</span>
            <span style={{ fontSize: "1.25rem", color: "#040416" }}>
              /Month
            </span>
          </Typography>
          <ul
            style={{
              paddingLeft: "1.5rem",
              color: "#686868",
              fontSize: "1.25rem",
              listStyleType: "disc"
            }}
          >
            <li>You have access to all the events with no event fees.</li>
            <li>
              Get exclusive discounts on your favorite restaurants, brands,
              cafes, and more!
            </li>
            <li>You have early access to events.</li>
            <li>You have early access to the travel groups.</li>
            <li>You will have access to members-only events.</li>
          </ul>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#78B27B",
              color: "white",
              fontSize: "1.25rem",
              py: 2,
              borderRadius: "8px",
            }}
          >
            Join Now
          </Button>
        </Box>
      </Box>
    </Box>

    {/* Partnership Section */}
    <Box sx={{ py: 8, px: { xs: 2, sm: 16 }, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#5A4283",
          fontSize: { xs: "2rem", sm: "3rem" },
          fontFamily: "Quicksand",
          fontWeight: "medium",
          mb: 5,
        }}
      >
        Our Partnerships
      </Typography>

      {/* Main Content Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Always display images in a row
          alignItems: "center", // Align items to the center
          justifyContent: "center", // Center content horizontally
          gap: { xs: 2, sm: 4 }, // Adjust gap between images based on screen size
          flexWrap: "wrap", // Allow images to wrap when needed on smaller screens
        }}
      >
        {/* Images Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Keep images in a row
            gap: 4, // Space between images
            alignItems: "center", // Align images vertically in row
            justifyContent: "center", // Center images horizontally
            flexWrap: "wrap", // Allow images to wrap
            width: "100%", // Ensure it takes up full width
            maxWidth: "100%", // Prevent it from overflowing on smaller screens
          }}
        >
          <img
            src={activateLogo}
            alt="Activate Logo"
            style={{
              width: "150px", // Set width to make the images consistent
              height: "auto",
              objectFit: "contain", // Maintain aspect ratio
              maxWidth: "100%", // Make sure the image is responsive
            }}
          />
          <img
            src={activateLogo}
            alt="Activate Logo"
            style={{
              width: "150px", // Set width to make the images consistent
              height: "auto",
              objectFit: "contain", // Maintain aspect ratio
              maxWidth: "100%", // Make sure the image is responsive
            }}
          />
          <img
            src={activateLogo}
            alt="Activate Logo"
            style={{
              width: "150px", // Set width to make the images consistent
              height: "auto",
              objectFit: "contain", // Maintain aspect ratio
              maxWidth: "100%", // Make sure the image is responsive
            }}
          />
          <img
            src={deRaCoffeeLogo}
            alt="deRa Coffee Logo"
            style={{
              width: "150px", // Set width to make the images consistent
              height: "auto",
              objectFit: "contain", // Maintain aspect ratio
              maxWidth: "100%", // Make sure the image is responsive
            }}
          />
        </Box>
      </Box>
    </Box>

    <Footer />
  </Box>
);

export default Membership;
