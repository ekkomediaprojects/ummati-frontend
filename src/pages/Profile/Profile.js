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
import toast, { Toaster} from 'react-hot-toast';
import QRCodeGenerator from './QRCodeGenerator';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("profile");
  const handleButtonClick = (page) => {
    console.log("page", page);
    setSelectedButton(page);
    navigate(`/${page.toLowerCase().replace(" ", "-")}`); 
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      let token = localStorage.getItem('userToken')
      if(token){
      const url = `${process.env.REACT_APP_API_URL}auth/profile`;
      // const url = `http://localhost:5002/auth/profile`;
      try {
          const res = await RequestHandler(url, "GET",{}, {'Authorization': `Bearer ${token}`});
          if (res?.success) {
            if(res?.data?.user){
              console.log("res?.data?.user" , res?.data?.user)
              setUserData(res?.data?.user)
              return;
            }
          } else if(!res?.success) {
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
  let infoStyle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: { xs: "16px",xl: "20px" },
    lineHeight: { xs: "24px",  xl: "30px" },
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
              height: "796px",
              marginBottom: { xs: "16px", md: "0" },
              backgroundColor: "#5A4283",
              borderRadius: "12px",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
                justifyContent: { xs: "center", md: "left" },
              }}
            >
              <Avatar
                alt="Profile Image"
                src={
                  userData?.profilePicture || noProfile
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
                  lineHeight: "100%",
                  textAlign: { xs: "center", md: "left" },
                  color: "white",
                  mb: 2
                }}
              >
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ ...infoStyle, textDecoration: "underline", gap: "10px" }}
              >
               {userData?.email}
              </Typography>
            </Box>
            {userData?.streetAddress && ( 
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
                  {userData.streetAddress}
                </Typography>
              </Box>
            )}
            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "30px",
                marginBottom: "30px",
                border: "1px solid #FFFFFF3D",
              }}
            ></Box>
            <Box>
              <QRCodeGenerator/>
            </Box>
            <Box>
              <Typography
                  variant="body2"
                  sx={{  
                      marginTop: "10px" ,
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontSize: { xs: "16px",xl: "20px" },
                      lineHeight: { xs: "24px",  xl: "30px" },
                      textAlign: "center",
                      color: "#FFFFFF99",}}
                >
                  Member ID : {userData?.memberId || '12345678910'}
                </Typography>
            </Box>
          
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
                    fontSize: { xs: "10px", sm: "12px", md: "16px" }, 
                    padding: {
                      xs: "1px 1px", 
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
                      xs: "1px 1px", 
                      sm: "6px 12px",
                      md: "10px 20px",
                    },
                    ...(selectedButton === "subscription"
                      ? selectedButtonStyle
                      : unselectedButtonStyle),
                  }}
                  onClick={() => handleButtonClick("subscription")}
                >
                  Subscription
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
                height: { xs: "auto", md: "1400px" },
                flexDirection: "column",
                alignItems: "center",
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              {selectedButton === "profile" && <ViewProfileComponent  userData={userData} updateUserState={updateUserState}/>}
              {selectedButton === "subscription" && <Subscription />}
              {selectedButton === "paymenthistory" && (
                <PaymentHistoryComponent />
              )}
              {selectedButton === "settings" && <SettingsComponent />}
            </Box>
          </Box>
          <Toaster
              position="bottom-right"
              reverseOrder={true}
           />
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
          height: {
            xs: selectedButton === "profile" || selectedButton === "subscription" ? "2000px" : selectedButton === "settings" ? "1250px" :   "1450px",
            md: "1400px",
            lg: "900px",
          },
        }}
      ></Box>
      
    </Box>
  );
};

export default Profile;
