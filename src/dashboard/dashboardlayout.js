import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DashboardNavBar from "../DashboardComponents/Nav/DashboardNavBar";
import DashboardNavMobile from "../DashboardComponents/Nav/DashboardNavMobile";
import toast from "react-hot-toast";
import { CircularProgress, Box, Typography } from "@mui/material";

const DashboardLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const token = localStorage.getItem('userToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        console.log('Checking admin status:', {
          hasToken: !!token,
          userData: userData
        });

        if (!token) {
          console.log('No token found, redirecting to login');
          toast.error('Please log in to access the dashboard');
          navigate('/admin-login', { replace: true });
          return;
        }

        if (userData.role === 'admin') {
          console.log('User is admin based on stored data');
          setIsAdmin(true);
    } else {
          console.log('User is not an admin');
          toast.error('Access denied. Admin privileges required.');
          navigate('/admin-login', { replace: true });
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Error verifying admin status');
        navigate('/admin-login', { replace: true });
      } finally {
        setIsLoading(false);
    }
    };

    checkAdminStatus();
  }, [navigate]);

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Verifying admin access...
        </Typography>
      </Box>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <section className="flex flex-col md:flex-row h-fit md:p-7 px-4 mt-4">
      <DashboardNavBar isAdmin={isAdmin} />
      <DashboardNavMobile isAdmin={isAdmin} />
      <Outlet />
    </section>
  );
};

export default DashboardLayout;
