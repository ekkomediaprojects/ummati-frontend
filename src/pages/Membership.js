import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/images/membership/membershipBanner.png";
import activateLogo from "../assets/images/membership/partnerships/activiateLogo.svg";
import deRaCoffeeLogo from "../assets/images/membership/partnerships/deRaCoffeeLogo.svg";
import { Button, Typography, Box } from "@mui/material";

const Membership = () => {


  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (

    <Box>
      <Header />
  
      {/* Banner Section */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "250px", md: "300px" },
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
            fontSize: { xs: "32px", md: "40px" },
            position: "absolute",
            bottom: "10%",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Membership
        </Typography>
      </Box>
  
      {/* Membership Info Section */}
      <Box sx={{ backgroundColor: "#F7F5EF", py: 8, px: { xs: 2, sm: 16 } }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1069px",
            margin: "0 auto",
            padding: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#3D3D3C",
              fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.5rem" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Unlock exclusive benefits and elevate your experience by joining our
            membership program! As a valued member, you'll gain access to special
            discounts, early product releases, members-only events, and more.
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
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "left",
                color: "#040416",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
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
                fontSize: "1rem",
                listStyleType: "disc",
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
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "left",
                color: "#040416",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                fontFamily: "Quicksand",
                fontWeight: "bold",
              }}
            >
              <span>$20</span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#040416",
                }}
              >
                /Month
              </span>
            </Typography>
            <ul
              style={{
                paddingLeft: "1.5rem",
                color: "#686868",
                fontSize: "1rem",
                listStyleType: "disc",
              }}
            >
              <li>You have access to all the events with no event fees.</li>
              <li>
                Get exclusive discounts on your favorite restaurants, brands,
                cafes, and more!
              </li>
            </ul>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#78B27B",
                fontSize: { xs: "1rem", sm: "1.2rem" },
                py: 2,
                borderRadius: "8px",
              }}
              onClick={() => handleNavigate("/signup")}
            >
              Join Now
            </Button>
          </Box>
        </Box>
      </Box>
  
      {/* Partnerships Section */}
      <Box
        sx={{
          py: 4,
          px: { xs: 2, sm: 10 },
          textAlign: "center",
          height: "400px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#5A4283",
            fontWeight: 700,
            fontSize: { xs: "24px", sm: "24", md: "32px" },
            fontFamily: "Quicksand",
            margin: "20px",
          }}
        >
          Partnerships
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "start" },
            alignItems: { xs: "center", md: "flex-end" },
            flexWrap: "wrap",
            gap: { xs: 2, sm: 4 },
          }}
        >
          {/* Logo 1 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img
              src={activateLogo}
              alt="Activate Logo"
              style={{
                width: "100px",
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "12px",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                mt: 2,
              }}
            >
              Dallas location: 10% off
            </Typography>
          </Box>
  
          {/* Logo 2 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img
              src={deRaCoffeeLogo}
              alt="deRa Coffee Logo"
              style={{
                width: "100px",
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "12px",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                mt: 2,
              }}
            >
              Plano location: 10% off
            </Typography>
          </Box>
        </Box>
      </Box>
  
      <Footer />
    </Box>
  )
};

export default Membership;
