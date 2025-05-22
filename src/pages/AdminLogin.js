import React, { useState } from "react";
import { Button, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useAuth } from '../authProviders/AuthContext';
import RequestHandler from "../utils/RequestHandler";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setUserDetails } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');

    let validationErrors = {};

    // Email Validation
    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    // Password Validation
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation errors:', validationErrors);
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    console.log('Starting login process...');

    try {
      const url = `${process.env.REACT_APP_API_URL}auth/login`;
      console.log('=== Login Debug Info ===');
      console.log('1. Making request to:', url);
      console.log('2. Request body:', { email, password });
      console.log('API URL from env:', process.env.REACT_APP_API_URL);
      
      const body = { email, password };
      const res = await RequestHandler(url, "POST", body);
      
      console.log('3. Full response:', res);
      console.log('4. Response message:', res?.message);
      console.log('5. User data:', res?.user);
      console.log('6. User role:', res?.user?.role);
      
      if (res?.message === "Login successful" && res?.token && res?.user) {
        console.log('7. Login successful, checking admin role...');
        
        // Check if user is admin
        if (res.user.role !== "admin") {
          console.log('8. Role check failed:', {
            expected: "admin",
            received: res.user.role,
            fullUser: res.user
          });
          throw new Error("Access denied. Admin privileges required.");
        }

        console.log('9. Admin role verified, proceeding with login...');
        localStorage.setItem("userToken", res.token);
        localStorage.setItem("userData", JSON.stringify(res.user));
        setIsLoggedIn(true);
        setUserDetails(res.user);
        toast.success("Admin login successful!");
        navigate("/dashboard");
      } else {
        console.log('10. Invalid response format:', {
          hasMessage: !!res?.message,
          hasToken: !!res?.token,
          hasUser: !!res?.user,
          fullResponse: res
        });
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("11. Login error:", {
        message: error.message,
        error: error
      });
      toast.error(error.message || "Invalid admin credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
      <Box
        sx={{
          width: "100%",
          maxWidth: "540px",
          minHeight: "585px",
          height: "auto",
          borderRadius: "8px",
          padding: 3,
          border: "1px solid #C4BAA2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          boxSizing: "border-box",
          bgcolor: "white",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            lineHeight: "40px",
            textAlign: "center",
            color: "#5A4283",
            mb: 4,
          }}
        >
          ADMIN LOGIN
        </Typography>

        <form onSubmit={handleSubmit} className="w-full" style={{ maxWidth: "353px" }}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#8692A6] mb-2"
            >
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter admin email"
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-white border ${
                errors.email ? "border-red-500" : "border-[#8692A6]"
              } rounded-lg shadow-sm focus:outline-none focus:ring-1`}
            />
            {errors.email && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errors.email}
              </Typography>
            )}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-[#8692A6] mb-2">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="•••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 bg-white border ${
                errors.password ? "border-red-500" : "border-[#8692A6]"
              } rounded-lg shadow-sm focus:outline-none focus:ring-1`}
            />
            <IconButton
              onClick={togglePasswordVisibility}
              sx={{
                position: "absolute",
                right: "10px",
                top: errors.password ? "40%" : "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {errors.password && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errors.password}
              </Typography>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            sx={{
              fontSize: "20px",
              fontFamily: "Quicksand",
              fontWeight: "700",
              backgroundColor: "#78B27B",
              borderRadius: "50px",
              textTransform: "none",
              padding: "12px",
              color: "white",
              mt: 2,
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Box>
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default AdminLogin; 