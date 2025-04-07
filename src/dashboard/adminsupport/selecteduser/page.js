import React from "react";
import ChatBlock from "../../../Dashboard/AdminSupport/ChatBlock";

// Mock session (ADMIN)
const session = {
  user: {
    id: "admin123",
    name: "Admin User",
    role: "ADMIN", // Mock Role.ADMIN
    email: "admin@example.com",
  },
};

// Mock chat user
const chatuser = {
  id: "u101",
  name: "John Doe",
  email: "john@example.com",
};

// Mock chat messages
const chat = {
  id: "chat123",
  messages: [
    { id: "m1", from: "u101", to: "admin123", text: "Hi there!", timestamp: "2025-04-07T10:00:00Z" },
    { id: "m2", from: "admin123", to: "u101", text: "Hello! How can I help?", timestamp: "2025-04-07T10:01:00Z" },
  ],
  seen: true,
};

export default function AdminSupport() {

  return <ChatBlock session={true} chatItem={chat} chatuser={chatuser} isAdmin />
 
}
