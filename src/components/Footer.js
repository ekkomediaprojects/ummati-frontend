import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/footer logo.svg";
import { Button, Box, Typography, Grid2 } from "@mui/material";
const Footer = () => {
  const location = useLocation();
  const navigtion = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const isActive = (path) => location.pathname === path;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      console.log("Invalid email:", email);
      setError("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }

    console.log("Navigating to signup with email:", email);
    setError(null);
    navigtion("/signup");
  };

  return (
    <footer className="bg-[#F7F5EF]">
      {/* Top Border Line */}
      <div className="w-full h-[3px] bg-[#C4BAA2]" />

      <Box className="p-6 sm:p-12 flex flex-col sm:flex-row flex-wrap justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex justify-center ">
          <img src={logo} alt="Logo" className="w-44 h-auto" />
        </Link>

        {/* Mission Section */}
        <Box className="flex flex-col justify-center items-center text-left max-w-xs mt-8 sm:mt-0 mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            {" "}
            Our Mission
          </Typography>
          <Typography className="text-black font-['Poppins'] text-sm leading-relaxed text-center ">
            Ummati Community is a community to empower women to be themselves,
            support one another, make friends, and have fun. We are a place of
            acceptance, inclusivity, and growth.
          </Typography>
        </Box>

        {/* Stay Updated Section */}
        <Box className="flex flex-col justify-center items-center text-left max-w-xs mt-8 sm:mt-0 mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            Stay Updated
          </Typography>
          <Typography className="text-black font-['Poppins'] text-sm leading-relaxed mb-4">
            Sign up with your email address to receive news and updates.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { sm: "row" }, // Stack on mobile, row on larger screens
              gap: { xs: "10px", sm: "16px" }, // Adjust gap for mobile vs larger screens
              alignItems: "center",
              justifyContent: "center", // Center the content
              // padding: { xs: "16px", sm: "20px", md: "24px" }, // Padding for different screen sizes
            }}
          >
            {" "}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", // Full width on small screens
                maxWidth: "233px", // Maximum width on larger screens
                height: "30px", // Fixed height
                borderRadius: "10px", // Border radius
                border: "1px solid #C4BAA2", // Border color: Change to your desired color
                padding: "0 10px", // Padding for input field
                backgroundColor: "white", // White background
                fontSize: "14px", // Font size
                outline: "none", // Remove default focus outline
              }}
            />
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "8px", sm: "8px", md: "10px", lg: "12px" },
                fontFamily: "Quicksand",
                fontWeight: "700",
                backgroundColor: "#78B27B",
                borderRadius: "10px",
                textTransform: "none",
                height: "30px",
                width: { xs: "80px", sm: "90px", md: "100px", lg: "120px" },
                padding: {
                  xs: "4px 8px",
                  sm: "6px 12px",
                  md: "8px 16px",
                  lg: "10px 20px",
                },
              }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Box>

          {error && (
            <Typography className="text-red-500 text-sm mt-2">
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography className="text-green-500 text-sm mt-2">
              {successMessage}
            </Typography>
          )}
        </Box>

        {/* Site Links Section */}
        <Box className="flex flex-col justify-center items-center text-left max-w-xs mt-8 sm:mt-0 mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            Site Links
          </Typography>
          <Grid2 container spacing={4} justifyContent="center">
            {[
              "Events",
              "Chapters",
              "FAQs",
              "Podcast",
              "Volunteer",
              "About",
              "Membership",
              "Collaborate",
              "Contact",
            ].map((link, index) => (
              <Grid2 item xs={3} sm={3} key={index}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className={`text-sm font-['Poppins'] ${
                    isActive(`/${link.toLowerCase()}`)
                      ? "font-bold"
                      : "font-normal"
                  } text-black`}
                >
                  {link}
                </Link>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {/* Legal Section */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
            maxWidth: "xs",
            marginTop: { xs: 8, sm: 0 },
            marginX: "auto",
            gap: 2,
          }}
        >
          {/* Title */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              fontWeight="700"
              color="#5A4283"
              fontFamily="Quicksand"
              sx={{
                fontSize: "lg",
                marginBottom: 2,
              }}
            >
              Legal
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {["Privacy", "Terms"].map((legalLink, index) => (
              <Link
                to={`/${legalLink.toLowerCase()}`}
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontFamily: "Poppins",
                  fontSize: "0.875rem",
                  margin: "4px 0",
                  color: "black",
                  fontWeight: isActive(`/${legalLink.toLowerCase()}`)
                    ? "bold"
                    : "normal",
                  textDecoration: "none",
                }}
              >
                {legalLink}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Bottom Border Line */}
      <div className="w-full h-[3px] bg-[#C4BAA2]" />

      {/* Bottom Section */}
      <Box className="bg-white py-4 text-center">
        <Typography className="text-sm text-[#111111] font-['Poppins']">
          © 2024 Ummati Community | All Rights Reserved
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
