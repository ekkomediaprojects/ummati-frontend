import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { Typography, Button, Box } from "@mui/material";
import Footer from "../components/Footer";
import playButton from "../assets/images/homepage/Latest Episode/playButton.svg";
import pauseButton from "../assets/images/homepage/Latest Episode/pauseButton.svg";
import forwardButton from "../assets/images/homepage/Latest Episode/fast_forward.svg";
import rewindButton from "../assets/images/homepage/Latest Episode/fast_rewind.svg";
import generalEvents from "../assets/images/homepage/Types of Events/General Events.png";
import professioanalNetworking from "../assets/images/homepage/Types of Events/Professional networking.png";
import mommyNMe from "../assets/images/homepage/Types of Events/Mommy n me.png";
import getInvolved1 from "../assets/images/homepage/Get involved/getInvolved1.png";
import getInvolved2 from "../assets/images/homepage/Get involved/getInvolved2.png";
import getInvolved3 from "../assets/images/homepage/Get involved/getInvolved3.png";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <HeroSection />

      {/* Latest Episode Section */}
      <section className="w-full px-6 py-10 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#5A4283]">
          Listen To Our Latest Episode
        </h2>
        <h2 className="text-lg text-gray-600 mt-2">Stay Up To Date</h2>

        {/* Podcast Player */}
        <div className="flex flex-col sm:flex-row items-center bg-gray-200 rounded-lg p-6 mt-6 shadow-md w-full max-w-4xl mx-auto">
          {/* Thumbnail */}
          <div className="w-28 h-28 bg-gray-300 rounded-md border border-gray-400"></div>

          {/* Content */}
          <div className="flex-1 ml-0 sm:ml-6 mt-6 sm:mt-0">
            <div className="text-left">
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: 400,
                }}
                className="text-xl font-medium"
              >
                Episode Title
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  fontSize: { xs: "10px", sm: "14px" }, // Responsive font size
                  lineHeight: { xs: "12.5px", sm: "17.5px" }, // Responsive line height
                  color: "#5A4283",
                }}
                className="font-bold"
              >
                Interlaced
              </Typography>
            </div>

            <div className="flex items-center mt-4 gap-4">
              <button className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full">
                <img src={playButton} alt="Play Button" className="w-6" />
              </button>
              <div className="flex-1 bg-gray-300 h-2 rounded overflow-hidden">
                <div className="bg-[#5A4283] h-full w-1/3"></div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-3">
                <img
                  src={rewindButton}
                  alt="Rewind"
                  className="w-6 cursor-pointer"
                />
                <img
                  src={pauseButton}
                  alt="Pause"
                  className="w-6 cursor-pointer"
                />
                <img
                  src={forwardButton}
                  alt="Forward"
                  className="w-6 cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-500">15:32</p>
            </div>
          </div>
        </div>

        {/* More Episodes Button */}
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
          More Episodes
        </Button>
      </section>

      {/* Types of Events Section */}
      <section className="w-full px-6 py-10 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-[#5A4283]">Types Of Events</h2>
        <h4 className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
          We aim to host events for women in all stages of life. We want to
          encourage you to meet and enjoy the company of various women in safe
          spaces allowing you to foster friendships over shared experiences.
        </h4>

        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8">
          {/* General Events */}
          <div className="text-center">
            <img
              src={generalEvents}
              alt="General Events"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <h3 className="text-2xl font-bold mt-4">General Events</h3>
            <p className="text-gray-600 mt-2">
              These events are for anyone 18+ years old. Everyone is welcome!
            </p>
          </div>

          {/* Professional Networking */}
          <div className="text-center">
            <img
              src={professioanalNetworking}
              alt="Professional Networking"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <h3 className="text-2xl font-bold mt-4">Professional Networking</h3>
            <p className="text-gray-600 mt-2">
              We host networking events amongst working women and also host
              workshops.
            </p>
          </div>

          {/* Mommy & Me */}
          <div className="text-center">
            <img
              src={mommyNMe}
              alt="Mommy & Me"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <h3 className="text-2xl font-bold mt-4">Mommy & Me</h3>
            <p className="text-gray-600 mt-2">
              We host networking events amongst working women and also host
              workshops.
            </p>
          </div>
        </div>
      </section>
      <Box sx={{ mt: 5 }}>
        {/* Header Text */}
        <Box sx={{ padding: 4 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              color: "#5A4283",
              fontFamily: "Quicksand",
              fontWeight: 700,
              fontSize: { xs: "28px", sm: "32px", md: "36px", lg: "40px" },
            }}
          >
            Get Involved
          </Typography>

          {/* Sub Text */}
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "black",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "20px" },
              lineHeight: "1.8",
              mt: 2,
              mb: 4,
              padding: "10px",
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
            >
              Chapters
            </Button>
          </Box>
        </Box>

        {/* Edge-to-Edge Images Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Switches to column on xs, row on sm and up
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
