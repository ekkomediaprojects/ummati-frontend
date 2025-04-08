import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DashboardNavBar from "../Dashboard/Nav/DashboardNavBar";
import DashboardNavMobile from "../Dashboard/Nav/DashboardNavMobile";

const DashboardLayout = () => {
  const [session, setSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate session check
    const fakeSession = true
    // JSON.parse(localStorage.getItem("session"));
    if (fakeSession) {
      setSession(fakeSession);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!session) {
    return <div className="h-screen flex items-center justify-center">Access Denied</div>;
  }

  return (
    <section className="flex flex-col md:flex-row h-fit md:p-7 px-4 mt-4">
      <DashboardNavBar session={session} />
      <DashboardNavMobile session={session} />
      <Outlet />
    </section>
  );
};

export default DashboardLayout;
