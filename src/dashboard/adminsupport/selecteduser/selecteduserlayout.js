import React from "react";
import ChatList from "../../DashboardMain/AdminSupport/ChatList";
import { Divider, Box, Typography } from "@mui/material";

// Mock session
const session = {
  user: {
    id: "admin123",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
};

// Mock chat users
const allChatUsers = [
  { id: "u101", name: "John Doe", email: "john@example.com" },
  { id: "u102", name: "Jane Smith", email: "jane@example.com" },
  { id: "u103", name: "Mark Johnson", email: "mark@example.com" },
];

export default function DashboardLayout({ children }) {
  const alreadySelected = "u101"; // mock selected user ID

  return session ? (
    <Box display="flex" flexDirection="row" height="100vh" padding={4} gap={2}>
      <Box width="100%" color="black">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Support Chat
          </Typography>
          <ChatList
            session={session}
            allChatUsers={allChatUsers}
            alreadySelected={alreadySelected}
          />
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
        {children}
      </Box>
    </Box>
  ) : (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h5">Access Denied</Typography>
    </Box>
  );
}
