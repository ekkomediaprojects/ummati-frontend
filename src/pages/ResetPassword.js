import React, { useState } from "react";
import { Button, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useAuth } from '../authProviders/AuthContext'; // Import the useAuth hook to access the context
import RequestHandler from "../utils/RequestHandler";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {token } = useParams()

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // API error essage
  const { setIsLoggedIn ,setUserDetails} = useAuth(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Email Validation
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }

    // Password Validation
    if (confirmPassword !== password) {
      validationErrors.password = "Password didnt match.";
    } 

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setApiError("");

    try {
      const url = `${process.env.REACT_APP_API_URL}auth/reset-password/${token}`;
      // const url = `http://localhost:5002/auth/reset-password/${token}`;
      const body = { password };
      const res = await RequestHandler(url, "PUT", body);
      if (res?.success) {
          let data = res?.data
          if(data?.message){
            toast.success(data?.message);
            setTimeout(() => {navigate("/login")}, 1000);
           return;
          } 
      } else if(!res?.success) {
        toast.error(`${res?.message}`);
        console.error("Request error:", res, "Status:", res?.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <Header />
      <Box className="flex justify-center items-center bg-[#F7F5EF] p-4 sm:p-6 md:p-10">
        <Box
          sx={{
            width: "100%",
            maxWidth: "540px",
            height: "auto",
            borderRadius: "8px",
            padding: { lg: 6, xs: 4 },
            border: "1px solid #C4BAA2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px", // Adds equal spacing between all children
            boxSizing: "border-box", // Ensures padding doesn't push the element out of view
          }}
          className=" bg-white shadow-lg"
        >
          {/* Header Text */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontWeight: 700,
              fontSize: "32px",
              lineHeight: "40px",
              textAlign: "center",
              color: "#5A4283",
            }}
          >
            Reset your Password
          </Typography>


          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} className="w-full">
           {/* Password Input */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-[#8692A6] mb-2">
                Your Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle the input type
                value={password}
                placeholder="Write your password"
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.password ? "border-red-500" : "border-[#8692A6]"
                } rounded-lg shadow-sm focus:outline-none focus:ring-1`}
              />
            
              {/* Empty space to align "Forgot password?" to the right */}
              <div></div>
              {errors.password && (
                <Typography variant="body2" color="error" sx={{ marginTop: "4px" }}>
                  {errors.password}
                </Typography>
              )}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-[#8692A6] mb-2">
              Confirm Your Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"} // Toggle the input type
                value={confirmPassword}
                placeholder="Confirm Your Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#8692A6]"
                } rounded-lg shadow-sm focus:outline-none focus:ring-1`}
              />
                <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "70%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              {/* Empty space to align "Forgot password?" to the right */}
              <div></div>
              {errors.confirmPassword && (
                <Typography variant="body2" color="error" sx={{ marginTop: "4px" }}>
                  {errors.confirmPassword}
                </Typography>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              sx={{
                fontSize: { lg: "20px" },
                fontFamily: "Quicksand",
                fontWeight: "700",
                backgroundColor: "#78B27B",
                borderRadius: "50px",
                textTransform: "none",
                width: "100%",
                padding: "12px",
                color: "white",
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
            </Button>
            {/* Register Link */}
            {apiError && (
              <Typography variant="body2" color="error" sx={{ marginTop: "16px" }}>
                {apiError}
              </Typography>
            )}
          </form>
        </Box>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
        />
      </Box>
      <Footer />
    </div>
  );
};

export default ResetPassword;
