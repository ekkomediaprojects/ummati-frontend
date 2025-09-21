import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bannerImage from "../../assets/images/purpleBanner.png";
import { Box, Typography, Avatar, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SettingsComponent from "./Settings";
import Subscription from "./Subscription";

import ViewProfileComponent from "./ViewProfile";
import PaymentHistoryComponent from "./PaymentHistory";
import noProfile from "../../assets/images/no-profile-picture-15257.png";
import RequestHandler from "../../utils/RequestHandler";
import toast, { Toaster } from "react-hot-toast";
import QRCodeGenerator from "./QRCodeGenerator";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("profile");
  const handleButtonClick = (page) => {
    setSelectedButton(page);
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
  };
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1]; // get part after "/"
    if (path) {
      setSelectedButton(path);
    }
  }, [location]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      let token = localStorage.getItem("userToken");
      if (token) {
        const url = `${process.env.REACT_APP_API_URL}auth/profile`;
        try {
          const res = await RequestHandler(
            url,
            "GET",
            {},
            { Authorization: `Bearer ${token}` }
          );
          if (res?.success) {
            if (res?.data?.user) {
              setUserData(res?.data?.user);
              return;
            }
          } else if (!res?.success) {
            toast.error(`${res?.message}`);
          }
        } catch (err) {
          toast.error("An unexpected error occurred");
        }
      }
    };
    fetchUserInfo();
  }, []);
  const updateUserState = (updated) => {
    setUserData(updated);
  };

  // Shared button styles
  const baseButtonStyle = {
    fontFamily: "Poppins",
    lineHeight: "20px",
    fontWeight: 500,
    textTransform: "none",
    cursor: "pointer",
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    padding: {
      xs: "8px 12px", // bigger touch area on mobile
      sm: "6px 12px",
      md: "6px 14px",
    },
    width: { xs: "100%", sm: "auto" }, // full width on phones
    borderRadius: "30px",
  };

  const selectedButtonStyle = {
    backgroundColor: "#D9F4DA",
    color: "#4D744F",
    border: "1px solid #4D744F",
  };

  const unselectedButtonStyle = {
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
          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", md: "28%" },
              height: "600px",
              backgroundColor: "#5A4283",
              borderRadius: "12px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              zIndex: 1,
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "center" },
              }}
            >
              <Avatar
                alt="Profile Image"
                src={userData?.profilePicture || noProfile}
                sx={{ width: 120, height: 120 }}
              />
            </Box>

            {/* Name and Email */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "24px",
                  textAlign: { xs: "center", md: "center" },
                  color: "white",
                  mb: 1,
                }}
              >
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#FFFFFFCC",
                  textAlign: { xs: "center", md: "center" },
                  textDecoration: "underline",
                }}
              >
                {userData?.email}
              </Typography>
            </Box>

            {/* Address */}
            {userData?.streetAddress && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "center" },
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <LocationOnIcon sx={{ color: "#FFFFFF99" }} />
                <Typography variant="body2" sx={{ color: "#FFFFFFCC" }}>
                  {userData.streetAddress}
                </Typography>
              </Box>
            )}

            {/* Divider */}
            <Box sx={{ border: "1px solid #FFFFFF3D", my: 2 }} />

            {/* QR Code */}
            <Box>
              <QRCodeGenerator />
            </Box>

            {/* Member ID */}
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#FFFFFF99",
                }}
              >
                Member ID: {userData?.membershipTier || "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "72%" },
              height: { xs: "auto", md: "720px" },
              marginBottom: { xs: "16px", md: "0" },
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              zIndex: 1,
            }}
          >
            {/* Navigation Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // stack on mobile, row on bigger
                gap: "8px",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                width: "100%",
              }}
            >
              {[
                { label: "Profile", value: "profile" },
                { label: "Subscription", value: "subscription" },
                { label: "Payment History", value: "paymenthistory" },
                { label: "Settings", value: "settings" },
              ].map((btn) => (
                <Button
                  key={btn.value}
                  variant="outlined"
                  sx={{
                    ...baseButtonStyle,
                    ...(selectedButton === btn.value
                      ? selectedButtonStyle
                      : unselectedButtonStyle),
                  }}
                  onClick={() => handleButtonClick(btn.value)}
                >
                  {btn.label}
                </Button>
              ))}
            </Box>

            {/* Content Section */}
            <Box
              sx={{
                display: "flex",
                height: { xs: "auto", md: "1200px" },
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              {selectedButton === "profile" && (
                <ViewProfileComponent
                  userData={userData}
                  updateUserState={updateUserState}
                />
              )}
              {selectedButton === "subscription" && <Subscription />}
              {selectedButton === "paymenthistory" && (
                <PaymentHistoryComponent />
              )}
              {selectedButton === "settings" && <SettingsComponent />}
            </Box>
          </Box>
          <Toaster position="bottom-right" reverseOrder={true} />
        </Box>
      </Box>

      {/* Spacer to prevent footer overlap */}
      <Box
        sx={{
          padding: "2px",
          height: {
            xs:
              selectedButton === "subscription"
                ? "2000px"
                : selectedButton === "settings"
                ? "1050px"
                : "1500px",
            md: "1400px",
            lg: "700px",
          },
        }}
      ></Box>
    </Box>
  );
};

export default Profile;
