import React from "react";
import { useLocation } from "react-router-dom";
import DashboardNavItem from "./DashboardNavItem";
import { Box, Typography, Divider } from "@mui/material";

const DashboardNavBar = ({ isAdmin }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      sx={{
        width: { md: "280px" },
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        gap: 2,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        height: "fit-content",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Admin Dashboard
      </Typography>

      {/* Account Management */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Account Management
        </Typography>
        <DashboardNavItem
          to="/dashboard/account-details"
          icon="account_circle"
          label="Account Details"
          active={isActive("/dashboard/account-details")}
        />
        <DashboardNavItem
          to="/dashboard/account-security"
          icon="security"
          label="Security"
          active={isActive("/dashboard/account-security")}
        />
      </Box>

      <Divider />

      {/* Event Management */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Event Management
        </Typography>
             <DashboardNavItem
          to="/dashboard/event-management"
          icon="event"
          label="Events"
          active={isActive("/dashboard/event-management")}
                  />
                  <DashboardNavItem
          to="/dashboard/event-categories"
          icon="category"
          label="Categories"
          active={isActive("/dashboard/event-categories")}
                  />
                  <DashboardNavItem
          to="/dashboard/event-locations"
          icon="location_on"
          label="Locations"
          active={isActive("/dashboard/event-locations")}
                  />
      </Box>

      <Divider />

      {/* User Management */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          User Management
        </Typography>
                  <DashboardNavItem
          to="/dashboard/user-list"
          icon="people"
          label="User List"
          active={isActive("/dashboard/user-list")}
                  />
                  <DashboardNavItem
          to="/dashboard/bookings"
          icon="book_online"
          label="Bookings"
          active={isActive("/dashboard/bookings")}
                  />
                  <DashboardNavItem
          to="/dashboard/membership-management"
          icon="card_membership"
          label="Memberships"
          active={isActive("/dashboard/membership-management")}
                  />
      </Box>

      <Divider />

      {/* Support */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Support
        </Typography>
                  <DashboardNavItem
          to="/dashboard/admin-support"
          icon="support_agent"
          label="Support Chat"
          active={isActive("/dashboard/admin-support")}
                  />
      </Box>
    </Box>
  );
};

export default DashboardNavBar;