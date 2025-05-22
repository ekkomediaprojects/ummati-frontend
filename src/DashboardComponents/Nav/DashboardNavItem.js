import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Icon from "@mui/material/Icon";

const DashboardNavItem = ({ to, icon, label, active }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1.5,
          borderRadius: 1,
          cursor: "pointer",
          transition: "all 0.2s",
          bgcolor: active ? "primary.main" : "transparent",
          color: active ? "primary.contrastText" : "text.primary",
          "&:hover": {
            bgcolor: active ? "primary.dark" : "action.hover",
          },
        }}
    >
        <Icon sx={{ fontSize: 20 }}>{icon}</Icon>
        <Typography variant="body2" sx={{ fontWeight: active ? 600 : 400 }}>
          {label}
        </Typography>
      </Box>
    </Link>
  );
};

export default DashboardNavItem;
