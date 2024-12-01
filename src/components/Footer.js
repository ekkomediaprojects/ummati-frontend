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

      <Box className="p-6 sm:p-12 flex flex-col sm:flex-row flex-wrap justify-between gap-8">
        {/* Logo Section */}
        <Link to="/" className="flex justify-center">
          <img src={logo} alt="Logo" className="w-44 h-auto" />
        </Link>

        {/* Mission Section */}
        <Box className="flex flex-col md:justify-start sm:justify-center md:items-start sm:item-center text-left max-w-xs mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            Our Mission
          </Typography>
          <Typography className="text-black font-['Poppins'] text-sm leading-relaxed">
            Ummati Community is a community to empower women to be themselves,
            support one another, make friends, and have fun. We are a place of
            acceptance, inclusivity, and growth.
          </Typography>
        </Box>

        {/* Stay Updated Section */}
        <Box className="flex flex-col justify-start items-start text-left max-w-xs mx-auto space-y-4">
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
              flexDirection: { sm: "row" },
              gap: { xs: "10px", sm: "16px" },
              alignItems: "center",
              justifyContent: "flex-start", // Left-align the form
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "233px",
                height: "30px",
                borderRadius: "10px",
                border: "1px solid #C4BAA2",
                padding: "0 10px",
                backgroundColor: "white",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                fontFamily: "Quicksand",
                fontWeight: "700",
                backgroundColor: "#78B27B",
                borderRadius: "10px",
                textTransform: "none",
                height: "30px",
                width: { xs: "90px", sm: "120px" },
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
        {/* Site Links Section */}
        <Box className="flex flex-col justify-start items-start text-left max-w-xs mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            Site Links
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // Three items per row
              gap: "16px", // Spacing between items
              justifyItems: "start", // Align content to the left
            }}
          >
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
              <Link
                to={`/${link.toLowerCase()}`}
                key={index}
                className={`text-sm font-['Poppins'] ${
                  isActive(`/${link.toLowerCase()}`)
                    ? "font-bold"
                    : "font-normal"
                } text-black`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {link}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Legal Section */}
        <Box className="flex flex-col justify-start items-start text-left max-w-xs mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            Legal
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { sm: "row", lg: "column" },
              gap: 1,
            }}
          >
            {["Privacy", "Terms"].map((legalLink, index) => (
              <Link
                to={`/${legalLink.toLowerCase()}`}
                key={index}
                style={{
                  fontFamily: "Poppins",
                  fontSize: "0.875rem",
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
