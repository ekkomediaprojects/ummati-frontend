"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

// Material UI components
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  InputAdornment,
  CircularProgress,
  Alert
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

// Use the environment variable with a fallback
const API_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || 'https://api.ummaticommunity.com';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log('=== Login Process Debug ===');
    console.log('1. Form submitted with data:', formData);
    console.log('2. API URL:', API_URL);
    console.log('3. Environment variable:', process.env.REACT_APP_API_URL);

    try {
      console.log('4. Making login request...');
      const response = await RequestHandler(
        `${API_URL}/auth/login`,
        'POST',
        formData
      );

      console.log('5. Raw response:', {
        type: typeof response,
        isObject: typeof response === 'object',
        keys: Object.keys(response),
        success: response?.success,
        hasToken: !!response?.token,
        hasUser: !!response?.user,
        hasMessage: !!response?.message
      });

      // Check if response has the expected structure
      if (!response || typeof response !== 'object') {
        console.error('6. Invalid response type:', typeof response);
        throw new Error('Invalid response from server');
      }

      // Check if response has success flag and required data
      if (!response.success) {
        console.error('7. Login failed:', {
          message: response.message,
          response
        });
        throw new Error(response.message || 'Login failed');
      }

      // Extract data from response
      const { token, user } = response;

      console.log('8. Extracted data:', {
        hasToken: !!token,
        tokenLength: token?.length,
        hasUser: !!user,
        userKeys: user ? Object.keys(user) : [],
        userRole: user?.role
      });

      if (!token || !user) {
        console.error('9. Missing token or user data:', {
          hasToken: !!token,
          hasUser: !!user
        });
        throw new Error('Missing token or user data');
      }

      // Store token and user data
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      console.log('10. Data stored in localStorage:', {
        hasToken: !!localStorage.getItem('userToken'),
        tokenLength: localStorage.getItem('userToken')?.length,
        hasUserData: !!localStorage.getItem('userData'),
        userDataKeys: Object.keys(JSON.parse(localStorage.getItem('userData') || '{}'))
      });

      toast.success('Login successful');
      console.log('11. Navigating to dashboard...');
      navigate('/dashboard/event-management');
    } catch (error) {
      console.error('12. Login error:', {
        message: error.message,
        error: error,
        stack: error.stack
      });
      setError(error.message || 'Login failed');
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
      console.log('13. Login process completed');
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          maxWidth: "400px",
          borderRadius: 2
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin; 