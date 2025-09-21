import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../authProviders/AuthContext";
import RequestHandler from "../../utils/RequestHandler";
import toast, { Toaster } from "react-hot-toast";

const ProfileView = ({ userData, updateUserState }) => {
  const { setUserDetails } = useAuth();
  const [profilePicture, setProfilePicture] = useState("");
  const [userDetails, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("userToken");

  // Initialize user details
  useEffect(() => {
    if (userData) {
      setProfilePicture(userData?.profilePicture || "");
      setUser({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phoneNumber: userData.phoneNumber || "",
        email: userData.email || "",
        streetAddress: userData.streetAddress || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
        postalCode: userData.postalCode || "",
      });
    }
  }, [userData]);

  // Validation
  const validateFields = () => {
    const newErrors = {};
    if (!userDetails.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!userDetails.lastName?.trim())
      newErrors.lastName = "Last name is required";
    if (userDetails.postalCode && isNaN(userDetails.postalCode))
      newErrors.postalCode = "Postal code must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userDetails, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const uploadUrl = `${process.env.REACT_APP_API_URL}auth/upload-image`;
      const uploadRes = await RequestHandler(
        uploadUrl,
        "POST",
        formData,
        { Authorization: `Bearer ${token}` },
        "multipart/form-data"
      );

      if (!uploadRes?.success) {
        toast.error(uploadRes?.message || "Failed to upload image");
        return;
      }

      const fileUrl = uploadRes.data.fileUrl;
      const updateUrl = `${process.env.REACT_APP_API_URL}auth/profile-picture`;

      const updateRes = await RequestHandler(
        updateUrl,
        "PUT",
        { profilePicture: fileUrl },
        { Authorization: `Bearer ${token}` }
      );

      if (updateRes?.success) {
        const picture = updateRes.data?.profilePicture || "";
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        const updatedUser = { ...storedUser, profilePicture: picture };

        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setUserDetails(updatedUser);
        setProfilePicture(picture);
        updateUserState(updatedUser);
        toast.success("Profile picture updated successfully");
      }
    } catch (error) {
      toast.error("Image upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Save user info
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}auth/update-profile`;
      const res = await RequestHandler(url, "PUT", userDetails, {
        Authorization: `Bearer ${token}`,
      });

      if (res?.success) {
        const updatedUser = { ...userData, ...res.data.user };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setUserDetails(updatedUser);
        updateUserState(updatedUser);
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable button styles
  const buttonSx = {
    backgroundColor: "#78B27B",
    color: "white",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "8px",
    px: 3,
    "&:hover": { backgroundColor: "#6aa86d" },
  };

  // Reusable input styles (same as Settings theme)
  const inputSx = {
    borderRadius: "8px",
    backgroundColor: "#FAFAFA",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C4BAA2",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5A4283",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#78B27B",
      borderWidth: 2,
    },
  };

  const labelSx = {
    color: "#5A4283",
    "&.Mui-focused": {
      color: "#78B27B",
    },
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "white", p: 3, borderRadius: 2 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          sx={{
            color: "#5A4283",
            fontWeight: 600,
            fontSize: { xs: "14px", md: "20px" },
            lineHeight: "24px",
            fontFamily: "Poppins",
          }}
        >
          Profile
        </Typography>
        {isEditing ? (
          <Button sx={buttonSx} onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        ) : (
          <Button sx={buttonSx} onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </Box>

      {/* Profile Picture */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Avatar
            src={`${profilePicture}?t=${Date.now()}`}
            sx={{
              width: 150,
              height: 150,
              border: "3px solid #C4BAA2",
              cursor: isEditing ? "pointer" : "default",
              "&:hover": isEditing ? { opacity: 0.8 } : {},
            }}
          />
          {uploading && (
            <CircularProgress
              size={160}
              thickness={3}
              sx={{
                color: "#78B27B",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          {isEditing && (
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          )}
        </Box>
        <Typography variant="caption" color="text.secondary" mt={1}>
          {isEditing ? "Click to change profile picture" : ""}
        </Typography>
      </Box>

      {/* Personal Info Form */}
      <form onSubmit={handleSave}>
        <Box display="flex" justifyContent="center" width="100%" mt={2}>
          <Grid container spacing={2} sx={{ maxWidth: 800 }}>
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Contact No.", name: "phoneNumber", type: "tel" },
              { label: "Email Address", name: "email", disabled: true },
              { label: "Street Address", name: "streetAddress" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              {
                label: "Country",
                name: "country",
                select: true,
                options: ["USA", "Pakistan", "Germany"],
              },
              { label: "Postal Code", name: "postalCode" },
            ].map((field, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <TextField
                  fullWidth
                  size="small"
                  label={field.label}
                  name={field.name}
                  value={userDetails[field.name] || ""}
                  onChange={handleChange}
                  disabled={!isEditing || field.disabled}
                  type={field.type || "text"}
                  select={field.select || false}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  InputProps={{ sx: inputSx }}
                  InputLabelProps={{ sx: labelSx }}
                >
                  {field.select &&
                    field.options.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            ))}
          </Grid>
        </Box>
      </form>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default ProfileView;
