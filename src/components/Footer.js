import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/footer logo.svg";
import { Button, Box, Typography, Grid2,CircularProgress } from "@mui/material";
import RequestHandler from "../utils/RequestHandler";
import toast, { Toaster } from 'react-hot-toast';
const Footer = () => {
  const location = useLocation();
  const navigtion = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      console.log("Invalid email:", email);
      setError("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const url = `${process.env.REACT_APP_API_URL}emailSubscribers/subscribe`;
      // const url = `http://localhost:5002/emailSubscribers/subscribe`;
      const body = { email };
      const res = await RequestHandler(url, "POST",body);
      if (res?.success) {
        let data = res?.data
        toast.success(data?.message);
        return;
      } else if(!res?.success) {
        toast.error(`${res?.message}`);
      }
    } catch (error) {
      toast.error("An Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
    setError(null);
  };

  return (
    <footer className="bg-[#F7F5EF]">
      {/* Top Border Line */}
      <div className="w-full h-[3px] bg-[#C4BAA2]" />

      <Box className="p-6 sm:p-12 flex flex-wrap gap-8 justify-start items-start">
        {/* Logo Section */}
        <Link to="/" className="hidden lg:flex justify-center">
          <img src={logo} alt="Logo" className="w-44 h-auto" />
        </Link>

        {/* Mission Section */}
        <Box className="flex flex-col sm:items-center md:items-start text-center md:text-left max-w-xs mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            Our Mission
          </Typography>
          <Typography
            sx={{
              alignItems : "start",
              color: "black",
              fontFamily: "Poppins",
              fontSize: "12px",
              lineHeight: "18px",
              marginBottom: "1rem", 
              textAlign: 'left',
            }}>
            Ummati Community is a community to empower women to be themselves,
            support one another, make friends, and have fun. We are a place of
            acceptance, inclusivity, and growth.
          </Typography>
        </Box>

        {/* Stay Updated Section */}
        <Box className="flex flex-col sm:items-center md:items-start text-center md:text-left max-w-xs mx-auto space-y-4">
          <Typography
            fontWeight="700"
            color="#5A4283"
            fontFamily="Quicksand"
            className="font-700 text-lg mb-2"
          >
            Stay Updated
          </Typography>
          <Typography
            sx={{
              alignItems : "start",
              color: "black",
              fontFamily: "Poppins",
              fontSize: "12px",
              lineHeight: "18px",
              marginBottom: "1rem", 
              textAlign: 'left',
            }}
          >
            Sign up with your email address to receive news and updates.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
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
                fontWeight : "400",
                borderRadius: "10px",
                border: "1px solid #C4BAA2",
                padding: "0 10px",
                backgroundColor: "white",
                fontSize: "12px",
                outline: "none",
              }}
            />
            <Button
              variant="contained"
              sx={{
                fontSize: "12px",
                lineHeight : "15px",
                fontFamily: "Quicksand",
                fontWeight: 700,
                backgroundColor: "#78B27B",
                borderRadius: "10px",
                textTransform: "none",
                height: "26px",
                width: "87px",
                textAlign:"center",
                whiteSpace: "nowrap", // Prevents text from wrapping
              }}
              onClick={handleSignUp}
            >
               {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
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
        <Box className="flex flex-col sm:items-center md:items-start text-center md:text-left max-w-xs mx-auto space-y-4">
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
              gap: "10px", // Spacing between items
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
                className={` font-['Poppins'] ${
                  isActive(`/${link.toLowerCase()}`)
                    ? "font-bold"
                    : "font-normal"
                } text-black`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "12px",
                }}
              >
                {link}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Legal Section */}
        <Box className="flex flex-col sm:items-center md:items-start text-center md:text-left max-w-xs mx-auto space-y-4">
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
                  fontSize: "12px",
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
