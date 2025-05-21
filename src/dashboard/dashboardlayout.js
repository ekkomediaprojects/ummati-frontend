import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DashboardNavBar from "../DashboardComponents/Nav/DashboardNavBar";
import DashboardNavMobile from "../DashboardComponents/Nav/DashboardNavMobile";
import RequestHandler from "../utils/RequestHandler";
import toast from "react-hot-toast";
import { CircularProgress, Box, Typography } from "@mui/material";

const DashboardLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          toast.error('Please log in to access the dashboard');
          navigate('/login');
          return;
        }

        const response = await RequestHandler(
          `${process.env.REACT_APP_API_URL}auth/check-admin`,
          'GET',
          {},
          { Authorization: `Bearer ${token}` }
        );

        if (response?.success) {
          setIsAdmin(response.data.isAdmin);
          if (!response.data.isAdmin) {
            toast.error('Access denied. Admin privileges required.');
            navigate('/');
          }
        } else {
          toast.error(response?.message || 'Error verifying admin status');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Error verifying admin status');
        navigate('/');
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
        <Typography variant="h4" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You do not have permission to access this area.
        </Typography>
      </Box>
    );
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
