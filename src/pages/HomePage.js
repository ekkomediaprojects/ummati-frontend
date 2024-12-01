import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, IconButton } from "@mui/material";
import Footer from "../components/Footer";
import podcastImage from "../assets/images/homepage/hero/podcast.png";
import generalEvents from "../assets/images/homepage/Types of Events/General Events.png";
import professioanalNetworking from "../assets/images/homepage/Types of Events/Professional networking.png";
import mommyNMe from "../assets/images/homepage/Types of Events/Mommy n me.png";
import getInvolved1 from "../assets/images/homepage/Get involved/getInvolved1.png";
import getInvolved2 from "../assets/images/homepage/Get involved/getInvolved2.png";
import getInvolved3 from "../assets/images/homepage/Get involved/getInvolved3.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";

const HomePage = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className="">
      <Header />
      <HeroSection />
      {/* Latest Episode Section */}
      <section className="w-full px-6 py-10 bg-white text-center">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#5A4283",
            fontSize: { xs: "16px", sm: "30px", md: "40px" },
            fontHeight: { xs: "20px", sm: "35px", md: "50px" },
            fontFamily: "Quicksand",
          }}
        >
          Listen To Our Latest Episode
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "black",
            fontFamily: "poppins",
            fontWeight: 400,
            marginTop: 2,
            fontSize: { xs: "12px", sm: "16px", md: "22px" },
            fontHeight: { xs: "18px", sm: "20px", md: "33px" },
          }}
        >
          Stay Up To Date
        </Typography>

        {/* Podcast Player */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ECE7DA",
            borderRadius: 2,
            padding: 2,
            marginTop: 3,
            maxWidth: { sm: "662px" },
            maxHeight: { sm: "149px" },
            marginX: "auto",
            boxShadow: 2,
            overflow: "hidden",
          }}
        >
          {/* Thumbnail */}
          <Box
            component="img"
            src={podcastImage}
            alt={`${podcastImage} illustration`}
            sx={{
              maxWidth: { xs: "56px", sm: "90px", md: "137px" },
              height: { xs: "56px", sm: "90px", md: "141px" },
              objectFit: "contain",
              flexShrink: 0, // Prevents shrinking of image
            }}
          />

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              overflow: "hidden", // Prevent content overflow
              // paddingLeft: 2,
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: 400,
                  fontSize: { xs: "16px", sm: "18px", md: "32px" },
                  lineHeight: { xs: "16px", sm: "18px", md: "40px" },
                  overflow: "hidden", // Ensure text does not overflow
                  marginLeft: "20px",
                }}
              >
                Episode Title
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  fontSize: { xs: "14px", sm: "16px", md: "16px" },
                  lineHeight: { xs: "14px", sm: "16px", md: "20px" },
                  color: "#5A4283",
                  overflow: "hidden", // Ensure text does not overflow
                  marginLeft: "20px",
                }}
              >
                Interlaced
              </Typography>
            </Box>

            {/* Player Controls */}
            <Box sx={{ display: "flex", alignItems: "center", margin: 0.5 }}>
              <IconButton
                sx={{
                  width: { xs: 18, sm: 48 },
                  height: { xs: 18, sm: 48 },
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              >
                <PlayArrowIcon
                  sx={{
                    fontSize: { xs: "20px", sm: "28px" }, // Smaller icon size on xs screens
                    color: "black",
                  }}
                />
              </IconButton>

              {/* Progress Bar */}
              <Box
                sx={{
                  flex: 1,
                  marginX: 2,
                  backgroundColor: "#D9D9D9",
                  height: 8,
                  borderRadius: 1,
                  overflow: "hidden", // Ensure the progress bar doesn't overflow
                }}
              >
                <Box
                  sx={{
                    width: "33%",
                    backgroundColor: "#5A4283",
                    height: "100%",
                  }}
                />
              </Box>
            </Box>

            {/* Rewind, Pause, Forward Controls */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 2,
                overflow: "hidden",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  sx={{
                    color: "black",
                    width: { xs: 18, sm: 48 },
                    height: { xs: 18, sm: 48 },
                  }}
                >
                  <FastRewindIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "black",
                    width: { xs: 18, sm: 48 },
                    height: { xs: 18, sm: 48 },
                  }}
                >
                  <PauseIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "black",
                    width: { xs: 18, sm: 48 },
                    height: { xs: 18, sm: 48 },
                  }}
                >
                  <FastForwardIcon />
                </IconButton>
              </Box>
              <Typography
                sx={{ color: "black", fontSize: { xs: "12px", sm: "14px" } }}
              >
                15:32
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* More Episodes Button */}
        <Button
          variant="contained"
          sx={{
            marginTop: 3,
            padding: "8px 16px",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px" }, // Responsive font size
            fontFamily: "Quicksand",
            fontWeight: "700",
            backgroundColor: "#78B27B",
            borderRadius: "10px",
            textTransform: "none",
            width: { xs: "150px", sm: "200px", md: "250px", lg: "300px" },
          }}
          onClick={() => handleNavigate("/podcast")}
        >
          More Episodes
        </Button>
      </section>
      {/* Types of Events Section */}
      <section className="w-full px-6 py-10 bg-[#F7F5EF] text-center">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#5A4283",
            fontSize: { xs: "16px", sm: "30px", md: "40px" },
            fontHeight: { xs: "20px", sm: "35px", md: "50px" },
            fontFamily: "Quicksand",
          }}
        >
          Types Of Events
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "12px", sm: "16px", md: "22px" },
            fontHeight: { xs: "18px", sm: "24px", md: "33px" },
            fontFamily: "poppins",
            color: "black",
            mt: 2,
            maxWidth: { xs: "316px", md: "816px", lg: "1164px" },
            marginX: "auto",
          }}
        >
          We aim to host events for women in all stages of life. We want to
          encourage you to meet and enjoy the company of various women in safe
          spaces allowing you to foster friendships over shared experiences.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: "32px",
            mt: "32px",
            paddingX: { xs: "16px", sm: "32px", md: "48px" },
          }}
        >
          {/* General Events */}
          <Box sx={{ textAlign: "center" }}>
            <img
              src={generalEvents}
              alt="General Events"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <Typography
              variant="h3"
              sx={{
                mt: "16px",
                fontWeight: 700,
                fontSize: { xs: "16px", md: "20px", lg: "24px" },
                fontHeight: { xs: "20px", md: "24px", lg: "30px" },
                fontFamily: "Quicksand",
                color: "black",
              }}
            >
              General Events
            </Typography>
            <Typography
              sx={{
                mt: "8px",
                fontWeight: 400,
                fontSize: { xs: "18px", md: "18px", lg: "20px" },
                fontHeight: { xs: "12px", md: "24px", lg: "30px" },
                fontFamily: "poppins",
                color: "black",
              }}
            >
              These events are for anyone 18+ years old. Everyone is welcome!
            </Typography>
          </Box>

          {/* Professional Networking */}
          <Box sx={{ textAlign: "center" }}>
            <img
              src={professioanalNetworking}
              alt="Professional Networking"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <Typography
              variant="h3"
              sx={{
                mt: "16px",
                fontWeight: 700,
                fontSize: { xs: "16px", md: "20px", lg: "24px" },
                fontHeight: { xs: "20px", md: "24px", lg: "30px" },
                fontFamily: "Quicksand",
                color: "black",
              }}
            >
              Professional Networking
            </Typography>
            <Typography
              sx={{
                mt: "8px",
                fontWeight: 400,
                fontSize: { xs: "18px", md: "18px", lg: "20px" },
                fontHeight: { xs: "12px", md: "24px", lg: "30px" },
                fontFamily: "poppins",
                color: "black",
              }}
            >
              We host networking events amongst working women and also host
              workshops.
            </Typography>
          </Box>

          {/* Mommy & Me */}
          <Box sx={{ textAlign: "center" }}>
            <img
              src={mommyNMe}
              alt="Mommy & Me"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <Typography
              variant="h3"
              sx={{
                mt: "16px",
                fontWeight: 700,
                fontSize: { xs: "16px", md: "20px", lg: "24px" },
                fontHeight: { xs: "20px", md: "24px", lg: "30px" },
                fontFamily: "Quicksand",
                color: "black",
              }}
            >
              Mommy & Me
            </Typography>
            <Typography
              sx={{
                mt: "8px",
                fontWeight: 400,
                fontSize: { xs: "18px", md: "18px", lg: "20px" },
                fontHeight: { xs: "12px", md: "24px", lg: "30px" },
                fontFamily: "poppins",
                color: "black",
              }}
            >
              We host networking events amongst working women and also host
              workshops.
            </Typography>
          </Box>
        </Box>
      </section>
      <Box sx={{ mt: 2 }}>
        {/* Header Text */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              color: "#5A4283",
              fontSize: { xs: "16px", sm: "30px", md: "40px" },
              fontHeight: { xs: "20px", sm: "35px", md: "50px" },
              fontFamily: "Quicksand",
            }}
          >
            Get Involved
          </Typography>

          {/* Sub Text */}
          <Typography
            variant="h4"
            sx={{
              textAlign: "start",
              mt: 2,
              mb: 2,
              padding: "10px",
              fontWeight: 400,
              fontSize: { xs: "12px", sm: "16px", md: "22px" },
              fontHeight: { xs: "18px", sm: "24px", md: "33px" },
              fontFamily: "poppins",
              color: "black",
              maxWidth: { md: "816px", lg: "1164px" },
              marginX: "auto",
            }}
          >
            There are many ways to get involved and be a part of our growing
            network of inspiring women. You can join our team, help us open a
            new chapter in your city, attend one of our events, sponsor an
            event, or collaborate with us. As we expand, we are always eager to
            connect with like-minded individuals and organizations. Together, we
            can create meaningful change and foster a supportive community.
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {/* Button Container */}
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
                width: { xs: "150px", sm: "200px", md: "250px", lg: "300px" }, // Increased button width
              }}
              onClick={() => handleNavigate("/membership")}
            >
              Chapters
            </Button>
          </Box>
        </Box>

        {/* Edge-to-Edge Images Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {  xs: "column",md: "row", }, // Switches to column on xs, row on sm and up
            width: "100%",
            mt: 4,
          }}
        >
          <Box sx={{ flex: 1, height: 300 }}>
            <img
              src={getInvolved1}
              alt="Group pic 1"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, height: 300 }}>
            <img
              src={getInvolved2}
              alt="Group pic 2"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, height: 300 }}>
            <img
              src={getInvolved3}
              alt="Group pic 3"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default HomePage;
