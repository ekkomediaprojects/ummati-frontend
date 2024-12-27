import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../../authProviders/AuthContext";
import RequestHandler from "../../utils/RequestHandler";
import toast, { Toaster } from "react-hot-toast";

const ProfileView = ({ userData, updateUserState }) => {
  const [profilePicture, setProfilePicture] = useState("");
  const {setUserDetails} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({}); // Track errors for each field

  const user_data = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  };
  const [userDetails, setUser] = useState(user_data);
  const token = localStorage.getItem("userToken");


  const validateFields = () => {
    const newErrors = {};
    if (!userDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (userDetails.firstName.length < 3) {
      newErrors.firstName = "First name should be more than 2 characters";
    }
    if (!userDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (userDetails.lastName.length < 3) {
      newErrors.lastName = "Last name should be more than 2 characters";
    }
    if (isNaN(userDetails.postalCode)) {
      newErrors.postalCode = "Postal code should be a valid number";
    }
    // Object.keys(userDetails).forEach((key) => {
    //   if (!userDetails[key].trim() && !newErrors[key]) {
    //     newErrors[key] = `${key} is required`;
    //   }
    // });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const setUserMain = () => {
    setUser((prevDetails) => ({
      ...prevDetails,
      ...Object.keys(prevDetails).reduce((acc, key) => {
        acc[key] = userData[key] || "";
        return acc;
      }, {}),
    }));
  };
  const updateUserData = () => {
    setIsEditing(false);
    setUserMain();
  };
  useEffect(() => {
    if (userData) {
      setUserMain();
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userDetails, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for this field
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const url = `${process.env.REACT_APP_API_URL}auth/upload-image`;
      // const url = `http://localhost:5002/auth/upload-image`;
      try {
        const res = await RequestHandler(url,"POST",formData,{ Authorization: `Bearer ${token}` },"multipart/form-data");
        if (res?.success) {
          let data = res?.data;
          toast.success(data?.message);
          if (data?.fileUrl) setProfilePicture(data?.fileUrl);
        } else if (!res?.success) toast.error(`${res?.message}`);
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    }
  };
  // Save the updated details
  const handleSave = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      toast.error("Please change something to update!");
      return
    }

    setIsLoading(true);

    try {
      const url = `${process.env.REACT_APP_API_URL}auth/update-profile`;
      // const url = `http://localhost:5002/auth/update-profile`;
      const body = userDetails;
      const res = await RequestHandler(url, "PUT", body, {
        Authorization: `Bearer ${token}`,
      });
      if (res?.success) {
        let data = res?.data;
        toast.success(`${data?.message}`);
        if (data?.user) {
          const storedUser = localStorage.getItem("userData");
          const parsedUser = JSON.parse(storedUser);
          parsedUser['lastName'] = data?.user?.lastName 
          parsedUser['firstName'] = data?.user?.firstName
          localStorage.setItem("userData", JSON.stringify(parsedUser))
          setUserDetails(parsedUser)
          updateUserState(data?.user);
          setUserMain(data?.user);
          setIsEditing(false);
          return;
        }
      } else if (!res?.success) toast.error(`${res?.message}`);
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };


  const handleSaveImage = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}auth/profile-picture`;
      // const url = `http://localhost:5002/auth/profile-picture`;
      const body = { profilePicture};
      const res = await RequestHandler(url, "PUT", body, {
        Authorization: `Bearer ${token}`,
      });
      if (res?.success) {
        let data = res?.data;
        toast.success(`${data?.message}`);
        if (data?.profilePicture) {
          const  picture = data?.profilePicture || ""
          const storedUser = localStorage.getItem("userData");
          const parsedUser = JSON.parse(storedUser);
          localStorage.setItem("userData", JSON.stringify({...parsedUser ,profilePicture : picture}))
          setUserDetails({...parsedUser ,profilePicture : picture});
          setIsEditing(false);
          updateUserState({...userData ,profilePicture : picture });
          return;
        }
      } else if (!res?.success) toast.error(`${res?.message}`);
    } catch (error) {
      toast.error("An unexpected error occurred");
    } 
  };
  const ButtonStyling = {
    margin: "10px",
    backgroundColor: "#78B27B",
    color: "white",
    fontWeight: 700,
    fontSize: { xs: "14px", md: "16px", lg: "20px" },
    lineHeight: "25px",
    fontFamily: "Quicksand",
    textTransform: "none",
    borderRadius: "10px",
    width: { xs: "100px", md: "150px", lg: "200px" },
    height: { xs: "20px", md: "25px", lg: "37px" },
    alignItems: "center",
  };
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
      <Box
        sx={{
          width: "100%",
          bgcolor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px",
        }}
      >
        {isEditing ? (
          <Box>
            <Button
              sx={{
                margin: "10px",
                backgroundColor: "#a88532",
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "14px", md: "16px", lg: "20px" },
                lineHeight: "25px",
                fontFamily: "Quicksand",
                textTransform: "none",
                borderRadius: "10px",
                width: { xs: "100px", md: "150px", lg: "200px" },
                height: { xs: "20px", md: "25px", lg: "37px" },
                alignItems: "center",
              }}
              onClick={updateUserData}
            >
              Discard
            </Button>
            <Button sx={ButtonStyling} onClick={handleSave}>
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                " Save"
              )}
            </Button>
          </Box>
        ) : (
          <Button sx={ButtonStyling} onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
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
            width: "199px",
            height: "199px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FAFAFA",
            border: "2px dashed #C4BAA2",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          {isEditing ? (
            <Box
              sx={{
                width: "199px",
                height: "199px",
                backgroundImage: `url(${profilePicture})`, // Set background image
                backgroundSize: "cover", // Ensure the image covers the div
                backgroundPosition: "center", // Center the image
                position: "relative", // For absolute positioning inside Box
              }}
            >
              {/* Camera icon and other upload text */}
              <PhotoCamera
                sx={{
                  color: "#C4BAA2",
                  fontSize: "large",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)", // Center the icon
                }}
              />

              <Typography
                component="span"
                sx={{
                  position: "absolute",
                  top: "70px",
                  right: "70px",
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
                  bottom: "40px",
                  left: "50%",
                  transform: "translateX(-50%)", // Center the text horizontally
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
            </Box>
          ) : (
            <Box>
              {" "}
              <img
                src={userDetails?.profilePicture}
                alt="Uploaded"
                style={{
                  width: "199px",
                  height: "199px",
                  objectFit: "cover",
                }}
              />{" "}
            </Box>
          )}
        </label>
        {isEditing && (
          <Box>
            <Button sx={ButtonStyling} onClick={handleSaveImage}>
              Save Image
            </Button>
          </Box>
        )}
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
           {errors['firstName'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['firstName']}
            </div>
          )}

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
          {errors['lastName'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['lastName']}
            </div>
          )}
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
              name="phoneNumber"
              onChange={handleChange}
              value={userDetails?.phoneNumber}
              disabled={!isEditing}
              type="tel"
              placeholder="+1 Enter 10 digit number"
            />
              {errors['phoneNumber'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['phoneNumber']}
            </div>
          )}
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
              value={userDetails?.email}
              // onChange={handleChange}
              disabled={true}
              size="small"
              type="email"
              name="email"
              placeholder="jondoe@gmail.com"
            />
            {errors['email'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['email']}
            </div>
          )}
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
            name="streetAddress"
            value={userDetails?.streetAddress}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter Street Address"
          />
            {errors['streetAddress'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['streetAddress']}
            </div>
          )}
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
              value={userDetails?.city}
              disabled={!isEditing}
              name="city"
              placeholder="Your City"
            />
              {errors['city'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['city']}
            </div>
          )}
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
              value={userDetails?.state}
              onChange={handleChange}
              disabled={!isEditing}
              name="state"
              placeholder="Your State"
            />
             {errors['state'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['state']}
            </div>
          )}
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
              value={userDetails?.country}
              color="#11111166"
              onChange={handleChange}
              disabled={!isEditing}
              name="country"
            >
              <MenuItem value="">None</MenuItem>
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
              value={userDetails?.postalCode}
              onChange={handleChange}
              disabled={!isEditing}
              name="postalCode"
              placeholder="eg. 00000"
            />
            {errors['postalCode'] && (
            <div style={{ color: "red", fontSize: "10px", padding: "2px 4px", marginTop: "2px", borderRadius: "4px",}}>
              {errors['postalCode']}
            </div>
          )}
          </Box>
          <Toaster position="bottom-right" reverseOrder={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileView;
