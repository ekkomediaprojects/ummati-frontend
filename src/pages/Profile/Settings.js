import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Settings = () => {
  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: 600,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: { xs: "30px" },
      }}
    >
      {/* Title */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
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
          Change Password
        </Typography>
      </Box>

      {/* Form */}
      <Box component="form" sx={{ width: "100%", maxWidth: "100%" }}>
        {/* Current Password */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "50%" },
            mt: 2,
          }}
        >
          <Typography
            sx={{
              color: "#646464",
              mb: 0.5,
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: { xs: "11px", md: "14px" },
              lineHeight: "20px",
            }}
          >
            Current Password
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Current Password"
            InputProps={{
              style: {
                fontFamily: "Poppins",
                fontSize: "14px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#C4BAA2", // same border as profile
                },
                "&:hover fieldset": {
                  borderColor: "#5A4283", // hover like profile
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5A4283", // focus color
                },
              },
            }}
          />
        </Box>

        {/* New + Confirm Password */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* New Password */}
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              sx={{
                color: "#646464",
                mb: 0.5,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "11px", md: "14px" },
                lineHeight: "20px",
              }}
            >
              New Password
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="New Password"
              InputProps={{
                style: {
                  fontFamily: "Poppins",
                  fontSize: "14px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: "#C4BAA2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#5A4283",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5A4283",
                  },
                },
              }}
            />
          </Box>

          {/* Confirm Password */}
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              sx={{
                color: "#646464",
                mb: 0.5,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "11px", md: "14px" },
                lineHeight: "20px",
              }}
            >
              Confirm New Password
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Confirm New Password"
              InputProps={{
                style: {
                  fontFamily: "Poppins",
                  fontSize: "14px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: "#C4BAA2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#5A4283",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5A4283",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Save Button */}
        <Button
          sx={{
            marginTop: "15px",
            backgroundColor: "#78B27B",
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "12px", md: "14px", lg: "16px" },
            lineHeight: "18px",
            fontFamily: "Quicksand",
            textTransform: "none",
            borderRadius: "8px",
            width: { xs: "120px", md: "140px", lg: "160px" },
            height: { xs: "28px", md: "32px", lg: "36px" },
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#6fa873",
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
