// src/pages/About.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/purpleBanner.png";
import aboutImage from "../assets/images/AboutImage.png";
import {
  Typography,
  Box,
  Container,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const About = () => {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [showFullPeople, setShowFullPeople] = useState(false);

  // Detect screen size
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSeeMoreHistory = () => {
    setShowFullHistory((prev) => !prev);
  };

  const handleSeeMorePeople = () => {
    setShowFullPeople((prev) => !prev);
  };

  return (
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
          color:"#3D3D3C",
          fontFamily: "Caprasimo",
          fontSize: { xs: "32px", md: "40px" },
          position: "absolute",
          bottom: "10%",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        About
      </Typography>
    </Box>

      {/* Main Content Section */}
      <Box
        className="bg-[#F7F5EF] py-16 px-8 md:px-32 flex justify-center"
        sx={{
          backgroundColor: "#F7F5EF",
          padding: { xs: "20px", sm: "40px", md: "60px" },
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr", lg: "1fr 1.5fr" }, // Equal width for small and medium screens
              gap: "30px",
            }}
          >
            {/* Image Section */}
            <Box
              className="flex-shrink-0 w-full bg-cover bg-center rounded-lg"
              sx={{
                backgroundImage: `url(${aboutImage})`,
                height: { xs: "400px", sm: "500px", md: "600px", lg: "718px" }, // Adjust height for smaller screens
                width: "100%", // Ensures image takes up full width within the grid container
                borderRadius: "8px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
            {/* Text Section */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #C4BAA2",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "auto", // Let the text box height adjust based on content
              }}
            >
              {/* History Section */}
              <Typography
                variant="h5"
                fontWeight="700"
                color="#5A4283"
                fontFamily="Quicksand"
              >
                History
              </Typography>

              {/* Show full text for larger screens, truncated with See More for small screens */}
              {isSmallScreen ? (
                <>
                  <Typography
                    variant="body1"
                    color="black"
                    fontFamily="Poppins"
                    fontWeight="400"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {showFullHistory
                      ? "Ummati Community was founded in May 2022 with the promise to empower and connect women. A means to allow women to create meaningful friendships, support one another, be themselves, and enjoy the experience of sisterhood as adults. Ummati Community is a place where women can meet and enjoy the company of other women from all walks of life. We host a variety of events open to all, such as professional networking meetups, social outings, volunteering opportunities, educational lectures, athletic events, playdates for kids, and gatherings for moms. Ummati Community is run solely by volunteers. We operate based on the suggestions and feedback of our community and are always open to new ideas for events. We are also accepting volunteers to help with planning and operations."
                      : "Ummati Community was founded in May 2022 with the promise to empower and connect women. A means to allow women to create meaningful friendships, support one another..."}
                  </Typography>
                  <Button
                    onClick={handleSeeMoreHistory}
                    sx={{ textTransform: "none", color: "#5A4283" }}
                  >
                    {showFullHistory ? "See Less" : "See More"}
                  </Button>
                </>
              ) : (
                <Typography
                  variant="body1"
                  color="black"
                  fontFamily="Poppins"
                  fontWeight="400"
                  sx={{ lineHeight: 1.6 }}
                >
                  Ummati Community was founded in May 2022 with the promise to
                  empower and connect women. A means to allow women to create
                  meaningful friendships, support one another, be themselves,
                  and enjoy the experience of sisterhood as adults. Ummati
                  Community is a place where women can meet and enjoy the
                  company of other women from all walks of life. We host a
                  variety of events open to all, such as professional networking
                  meetups, social outings, volunteering opportunities,
                  educational lectures, athletic events, playdates for kids, and
                  gatherings for moms. Ummati Community is run solely by
                  volunteers. We operate based on the suggestions and feedback
                  of our community and are always open to new ideas for events.
                  We are also accepting volunteers to help with planning and
                  operations.
                </Typography>
              )}

              {/* Our People Section */}
              <Typography
                variant="h5"
                color="#5A4283"
                fontFamily="Quicksand"
                fontWeight="700"
              >
                Our People
              </Typography>

              {/* Show full text for larger screens, truncated with See More for small screens */}
              {isSmallScreen ? (
                <>
                  <Typography
                    variant="body1"
                    color="black"
                    fontFamily="Poppins"
                    fontWeight="400"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {showFullPeople
                      ? "Ummati Community was founded by Sara Ahmad and Rabia Fatima. They both have entrepreneurial background and are well connected in the Dallas Muslim community. They both encountered a lack of community for Muslim women between the ages of 25 - 45. Ummati Community is a place of acceptance, and we hope to remain a pillar of support for women looking to build meaningful friendships, be social, or just have a good time. We value our sense of community and hope to grow stronger with each other. We strongly believe in inclusivity and being open and accepting to all. We are one people, one nation."
                      : "Ummati Community was founded by Sara Ahmad and Rabia Fatima. They both have entrepreneurial backgrounds..."}
                  </Typography>
                  <Button
                    onClick={handleSeeMorePeople}
                    sx={{ textTransform: "none", color: "#5A4283" }}
                  >
                    {showFullPeople ? "See Less" : "See More"}
                  </Button>
                </>
              ) : (
                <Typography
                  variant="body1"
                  color="black"
                  fontFamily="Poppins"
                  fontWeight="400"
                  sx={{ lineHeight: 1.6 }}
                >
                  Ummati Community was founded by Sara Ahmad and Rabia Fatima.
                  They both have entrepreneurial background and are well
                  connected in the Dallas Muslim community. They both
                  encountered a lack of community for Muslim women between the
                  ages of 25 - 45. Ummati Community is a place of acceptance,
                  and we hope to remain a pillar of support for women looking to
                  build meaningful friendships, be social, or just have a good
                  time. We value our sense of community and hope to grow
                  stronger with each other. We strongly believe in inclusivity
                  and being open and accepting to all. We are one people, one
                  nation.
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      
    </div>
  );
};

export default About;
