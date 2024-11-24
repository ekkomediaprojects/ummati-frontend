import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bannerImage from "../../assets/images/purpleBanner.png";
import { Box, Typography, Avatar, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SettingsComponent from "./Settings";
import ViewProfileComponent from "./ViewProfile";
import PaymentHistoryComponent from "./PaymentHistory";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogined, setUserLogined] = useState(null);
  const [selectedButton, setSelectedButton] = useState("profile");

  const handleButtonClick = (page) => {
    console.log("page", page);
    setSelectedButton(page);
    // navigate(`${page.toLowerCase().replace(" ", "-")}`); // Update URL based on button
  };
  useEffect(() => {
    const user = localStorage.getItem("userLogin");
    console.log("user", user);
    setUserLogined(user ? JSON.parse(user) : null);
  }, []);

  let infoStyle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: { xs: "16px", md: "18px", lg: "20px" },
    lineHeight: { xs: "24px", md: "26px", lg: "30px" },
    textAlign: { xs: "center", md: "left" },
    color: "#FFFFFF99",
  };

  // Common button style
  const buttonsNav = {
    marginRight: "10px",
    padding: { xs: "2px", md: "12px" },
    gap: "2px",
    borderRadius: "70px",
    fontSize: { xs: "12px", md: "20px" },
    width: { xm: "150px", md: "200px" },
    fontFamily: "Poppins",
    lineHeight: "30px",
    fontWeight: 500,
    textTransform: "none",
    cursor: "pointer",
  };
  const selectedButtonStyle = {
    ...buttonsNav,
    backgroundColor: "#D9F4DA",
    color: "#4D744F",
    border: "1px solid #4D744F",
  };

  const unselectedButtonStyle = {
    ...buttonsNav,
    backgroundColor: "#F7F5EF",
    color: "#C4BAA2",
    border: "1px solid #C4BAA2",
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F7F5EF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "219px",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50px",
            left: "2%",
            right: "1%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "28%" },
              height: "430px",
              marginBottom: { xs: "16px", md: "0" },
              backgroundColor: "#5A4283",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: { xs: "center", md: "left" },
              }}
            >
              <Avatar
                alt="Profile Image"
                src={
                  userLogined?.imageUrl ||
                  "https://www.gravatar.com/avatar/placeholder-avatar"
                }
                sx={{ width: 135, height: 135 }}
              />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "32px",
                  lineHeight: "48px",
                  textAlign: { xs: "center", md: "left" },
                  color: "white",
                }}
              >
                {userLogined?.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{ ...infoStyle, marginTop: "20px" }}
              >
                Member ID: {userLogined?.member_id}
              </Typography>
              <Typography
                variant="body2"
                sx={{ ...infoStyle, textDecoration: "underline", gap: "10px" }}
              >
                {userLogined?.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "left" },
                alignItems: "center",
                gap: "8px",
              }}
            >
              <LocationOnIcon
                sx={{
                  color: "#FFFFFF99",
                  textAlign: { sm: "center", md: "left" },
                }}
              />
              <Typography variant="body2" sx={infoStyle}>
                {userLogined?.address}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                marginBottom: "20px",
                border: "1px solid #FFFFFF3D",
              }}
            ></Box>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
              height: { xs: "auto", md: "820px" },
              marginBottom: { xs: "16px", md: "0" },
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: { xs: "10px", sm: "12px", md: "16px" }, // Smaller font size for mobile
                    padding: {
                      xs: "1px 1px", // Smaller padding for mobile
                      sm: "6px 12px",
                      md: "10px 20px",
                    },
                    ...(selectedButton === "profile"
                      ? selectedButtonStyle
                      : unselectedButtonStyle),
                  }}
                  onClick={() => handleButtonClick("profile")}
                >
                  Profile
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: { xs: "10px", sm: "12px", md: "16px" },
                    padding: {
                      xs: "4px 8px", // Smaller padding for mobile
                      sm: "6px 12px",
                      md: "10px 20px",
                    },
                    ...(selectedButton === "paymenthistory"
                      ? selectedButtonStyle
                      : unselectedButtonStyle),
                  }}
                  onClick={() => handleButtonClick("paymenthistory")}
                >
                  Payment History
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: { xs: "10px", sm: "12px", md: "16px" },
                    padding: {
                      xs: "4px 8px", // Smaller padding for mobile
                      sm: "6px 12px",
                      md: "10px 20px",
                    },
                    ...(selectedButton === "settings"
                      ? selectedButtonStyle
                      : unselectedButtonStyle),
                  }}
                  onClick={() => handleButtonClick("settings")}
                >
                  Settings
                </Button>
              </div>
            </Box>

            {/* Second Box */}
            <Box
              sx={{
                display: "flex",
                height: { xs: "auto", md: "820px" },
                flexDirection: "column",
                alignItems: "center",
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              {selectedButton === "profile" && <ViewProfileComponent />}
              {selectedButton === "paymenthistory" && (
                <PaymentHistoryComponent />
              )}
              {selectedButton === "settings" && <SettingsComponent />}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
          height: {
            xs: selectedButton === "profile" ? "1500px" : "1000px",
            md: "800px",
          },
        }}
      ></Box>
      <Footer />
    </Box>
  );
};

export default Profile;
