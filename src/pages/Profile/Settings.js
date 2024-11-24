import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

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
        padding: { md: "30px" },
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
          Change Password
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xm: "100px", md: "50%" },
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
            Current Password
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            size="large"
            placeholder="Current Password"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
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
                placeholder: "New Password",
              }}
            >
              New Password
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="large"
              placeholder="New Password"
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
                placeholder: "Confirm New Password",
              }}
            >
              Confirm New Password
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="large"
              placeholder="Your State"
            />
          </Box>
        </Box>
        <Button
          sx={{
            marginTop: "20px",
            backgroundColor: "#78B27B",
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "14px", md: "16px", lg: "20px" },
            lineHeight: { xs: "14px", md: "16px", lg: "20px" },
            fontFamily: "Quicksand",
            textTransform: "none",
            borderRadius: "10px",
            width: { xs: "150px", md: "150px", lg: "200px" },
            height: { xs: "30px", md: "35px", lg: "37px" },
            alignItems: "center",
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
