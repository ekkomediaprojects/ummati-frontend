import React from "react";
import UserSelectList from "../../DashboardComponents/AdminSupport/UserSelectList";

// Mock roles
const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

// Mock session
const session = {
  user: {
    id: "u123",
    name: "Aamish Admin",
    role: Role.ADMIN,
    email: "admin@example.com",
  },
};

// Mock users list
const users = [
  { id: "u123", name: "Aamish Admin", email: "admin@example.com", role: Role.ADMIN },
  { id: "u124", name: "Sarah User", email: "sarah@example.com", role: Role.USER },
  { id: "u125", name: "John Smith", email: "john@example.com", role: Role.USER },
  { id: "u126", name: "Jane Doe", email: "jane@example.com", role: Role.USER },
];

export default function AdminSupport() {
  return (
    session &&
    session.user.role === Role.ADMIN && (
        <UserSelectList session = {session} users={users} />
    )
  );
}
