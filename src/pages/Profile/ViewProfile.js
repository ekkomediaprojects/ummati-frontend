import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../../authProviders/AuthContext";

const ProfileView = () => {
  // State to manage form data
  const { setIsLoggedIn ,setUserDetails, isLoggedIn } = useAuth();
  const [userDetails, setUser] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "USA",
    postalCode: "",
    imageUrl : "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userDetails, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result; 
        setUserDetails({ ...userDetails, 'imageUrl': base64String })
        console.log("Base64 String:", base64String);
      };

      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };
  // Save the updated details
  const handleSave = () => {
    localStorage.setItem("userLogin", JSON.stringify(userDetails));
    setUserDetails(userDetails); 
    setIsEditing(false)
    alert(userDetails);
  };
  const ButtonStyling = {
    marginTop: "20px",
    backgroundColor: "#78B27B",
    color: "white",
    fontWeight: 700,
    fontSize: { xs: "14px", md: "16px", lg: "20px" },
    lineHeight: "25px",
    fontFamily: "Quicksand",
    textTransform: "none",
    borderRadius: "10px",
    width: { xs: "100px", md: "150px", lg: "200px" },
  }
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: { md: "20px" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#5A4283",
            fontWeight: 600,
            fontSize: { xs: "16px", md: "24px" },
            lineHeight: "30px",
          }}
        >
          Profile Photo
        </Typography>
        {isEditing ? (
          <Button
            sx={ButtonStyling}
            onClick={handleSave} 
          >
            Save
          </Button>
        ) : (  <Button
          sx={ButtonStyling}
          onClick={() => setIsEditing(true)} 
        >
          Edit Profile
        </Button>)}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 6,
          position: "relative",
        }}
      >
        <label
          htmlFor="upload-photo"
          style={{
            width:  "199px",
            height:  "199px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background : "#FAFAFA",
            border: "2px dashed #C4BAA2",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          {userDetails?.imageUrl ? (
          <img
              src={`data:image/jpeg;base64,${userDetails?.imageUrl}`}
              alt="Uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            
          ) : (
            <PhotoCamera
              sx={{
                color: "#C4BAA2",
                fontSize: "large",
              }}
            />
          )}

          <Typography
            component="span"
            sx={{
              position: "absolute",
              top: 70,
              right: 70,
              color: "#C4BAA2",
              fontSize: "24px",
              fontWeight: "900",
              lineHeight: "1",
            }}
          >
            +
          </Typography>

          {/* Upload text below the camera icon */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#C4BAA2",
              position: "absolute",
              bottom: 40, // Adjust as needed
            }}
          >
            Upload
          </Typography>

          {/* Hidden file input */}
          <input
            type="file"
            id="upload-photo"
            style={{ display: "none" }}
            onChange={handleFileChange} // Handle file change
          />
        </label>
      </Box>

      {/* Profile Form */}
      <Box component="form" sx={{ width: "100%", maxWidth: "100%" }}>
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "24px" },
            color: "#5A4283",
            fontWeight: 600,
            lineHeight: "30px",
            marginBottom: "10px",
          }}
        >
          Personal Info
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
              }}
            >
              First Name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter First Name"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
              }}
            >
              Last Name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter Last Name"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
              }}
            >
              Contact No.
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              disabled={!isEditing}
              type="tel"
              placeholder="+1 Enter 10 digit number"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
              }}
            >
              Email Address
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange}
              disabled={!isEditing}
              size="small"
              type="email"
              placeholder="jondoe@gmail.com"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: "#646464",
              mb: 1,
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: { xs: "12px", md: "18px" },
              lineHeight: "27px",
            }}
          >
            Address
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter Street Address"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2, width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
                placeholder: "Enter City",
              }}
            >
              City
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Your City"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
                placeholder: "Enter State",
              }}
            >
              State
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Your State"
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2, width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
                placeholder: "Enter Country",
              }}
            >
              Country
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              select
              defaultValue="USA"
              color="#11111166"
              onChange={handleChange}
              disabled={!isEditing}
            >
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Pakistan">Germany</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#646464",
                mb: 1,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "18px" },
                lineHeight: "27px",
              }}
            >
              Postal Code
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="eg. 00000"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileView;
