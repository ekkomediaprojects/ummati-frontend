import React from "react";
import { useAuth } from "./AuthContext";
import { MenuItem } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth();  // This should retrieve the logout function correctly

  const handleLogout = () => {
    logout(); // This will call the logout function from context
  };

  return <MenuItem onClick={handleLogout}>Logout</MenuItem>;
};

export default LogoutButton;
