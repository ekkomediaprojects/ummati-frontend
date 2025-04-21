"use client";

import { useEffect, useState } from "react";
import MembershipManagementSection from "../../DashboardComponents/Memberships/Membership Management/MembershipManagementSection";

import { Button, Typography, Container } from "@mui/material";

// Mock data
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    membership: "Gold",
    role: "ADMIN",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    membership: "Platinum",
    role: 'ADMIN',
  },
  {
    id: 3,
    firstName: "Sam",
    lastName: "Johnson",
    email: "sam@example.com",
    membership: "Silver",
    role: 'USER',
  },
];

async function getSessionData() {
  // Simulate session data retrieval
  return {
    user: {
      id: 1,
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      role: 'ADMIN',
    },
  };
}

export default function MembershipManagement() {
  const [session, setSession] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate getting session and users data
    const fetchData = async () => {
      const sessionData = await getSessionData();
      setSession(sessionData);
      setUsers(mockUsers);
    };

    fetchData();
  }, []);

  return (
    session && (
      session != null && (
        <div className=" text-themeblack md:w-3/4">
          <MembershipManagementSection session={session} usersList={users} />
        </div>
      )
    )
  );
}
