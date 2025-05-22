import React, { useState } from "react";
import axios from 'axios';
import { Button,Link, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useAuth } from '../authProviders/AuthContext'; // Import the useAuth hook to access the context
import RequestHandler from "../utils/RequestHandler";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import googleIcon from "../assets/icons/icons8-google.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import  { useGoogleLogin } from '@react-oauth/google';
import group1 from "../assets/images/login/Group.png";
import group2 from "../assets/images/login/Clippathgroup.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // API error message
  const { setIsLoggedIn ,setUserDetails} = useAuth(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setApiError("");

    try {
      const url = `${process.env.REACT_APP_API_URL}auth/login`;
      const body = { email, password };
      const res = await RequestHandler(url, "POST", body);
      
      if (res?.success) {
        const data = res?.data;
        if (data?.user && data?.token) {
          // Store user data and token
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userData", JSON.stringify(data.user));
          
          // Update auth context
          setIsLoggedIn(true);
          setUserDetails(data.user);
          
          // Check if user is admin
          const adminCheck = await RequestHandler(
            `${process.env.REACT_APP_API_URL}auth/check-admin`,
            'GET',
            {},
            { Authorization: `Bearer ${data.token}` }
          );

          if (adminCheck?.success && adminCheck?.data?.isAdmin) {
            toast.success("Login successful!");
            navigate("/dashboard");
          } else {
            toast.error("Access denied. Admin privileges required.");
            navigate("/");
          }
        } else {
          throw new Error("Invalid response format from server");
        }
      } else {
        throw new Error(res?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
      setApiError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',{
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
        
        // Use the existing login endpoint with Google user info
        const url = `${process.env.REACT_APP_API_URL}auth/google-login`;
        const body = {
          email: userInfo.data.email,
          firstName: userInfo.data.given_name,
          lastName: userInfo.data.family_name,
          googleId: userInfo.data.sub
        };
        
        const res = await RequestHandler(url, "POST", body);
        
        if (res?.success) {
          let data = res?.data;
          toast.success(data?.message);
          if(data?.user && data?.token){
            localStorage.setItem("userToken", data?.token);
            setIsLoggedIn(true);
            setUserDetails(data?.user);
            localStorage.setItem("userData", JSON.stringify(data?.user));
            setTimeout(() => {navigate("/")}, 1000);
          }
        } else if(!res?.success) {
          toast.error(`${res?.message}`);
        }
      } catch (error) {
        toast.error("An error occurred during Google login");
        console.error("Google login error:", error);
      }
    },
    scope: 'openid profile email',
    flow: "implicit",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      
      <Box className="flex md:flex-row justify-center items-end bg-[#F7F5EF] w-full">
        <Box 
          sx={{ 
            display: { xs: "none", lg: "flex" },
            alignItems: "flex-end",
            height: "100%",
            flex: 1,
            maxWidth: "249.86px"
          }}
        >
          <img
            src={group1}
            alt="Left group"
            style={{
              width: "100%",
              height: "459.51px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
            sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "540px" },
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
            m : { xs : "10px", md : "50px"}
          }}
          className="bg-white shadow-lg"
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
            LOG IN WITH
          </Typography>

          {/* Google Login Button */}
          <Button
           fullWidth
            startIcon={
              <img
                src={googleIcon}
                alt="Google Icon"
                style={{ width: "24px", height: "24px" }}
              />
            }
            onClick={handleGoogleLogin}
            sx={{
              boxShadow: "0px 2px 3px 0px #0000002B",
              borderRadius: "10px",
              maxWidth: "345px",
              height: "54px",
              fontFamily: "Roboto", // Font Family
              fontWeight: 500, // Font Weight
              fontSize: "20px", // Font Size
              lineHeight: "100%",
              color: "#0000008A",
              textTransform: "none",
              padding: "10px",
            }}
          >
            Continue with Google
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "358px",
              width: "100%",
              margin: "8px 0",
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: "1px",
                backgroundColor: "#5A4283",
              }}
            />
            <Typography
              sx={{
                padding: "0 16px",
                fontSize: "14px",
                color: "#5A4283",
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              OR
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: "1px",
                backgroundColor: "#5A4283",
              }}
            />
          </Box>

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} className="w-full"  style={{
            maxWidth: "353px",
          }}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#8692A6] mb-2"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Write your email"
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.email ? "border-red-500" : "border-[#8692A6]"
                } rounded-lg shadow-sm focus:outline-none focus:ring-1`}
              />
              {errors.email && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "4px", fontSize: "14px" }}
                >
                  {errors.email}
                </Typography>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-[#8692A6] mb-2">
                Your Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle the input type
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
                  top: errors.password != "" || errors.email != "" ? "40%" : "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              {/* Empty space to align "Forgot password?" to the right */}
              <div></div>
              {errors.password && (
                <Typography variant="body2" color="error" sx={{ marginTop: "4px" }}>
                  {errors.password}
                </Typography>
              )}
              <Typography
                variant="body2"
                color="textSecondary"
                className="text-sm text-right"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  marginTop :"12px",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  color: "#5A4283",
                }}
              >
                <a
                  href="/forgot-password"
                  className="text-[#5A4283]"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/forgot-password");
                  }}
                >
                  Forgot your password?
                </a>
              </Typography>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              sx={{
                fontSize:"20px",
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
            {/* Register Link */}
          
            {apiError && (
              <Typography variant="body2" color="error" sx={{ marginTop: "8px" }}>
                {apiError}
              </Typography>
            )}
          </form>
          <Box sx={{             
                marginTop: "12px",
                textAlign: "center",
                marginTop: "auto" 
              }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Poppins",
                    color: "grey",
                    fontSize: "16px",
                  }}
                >
                  Do you need an account?  {" "}
                  <Link
                    component="button"
                    sx={{
                      color: "#5A4283",
                      textDecoration: "underline",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    Create new account
                  </Link>
                </Typography>
            </Box>
        </Box>
        <Box 
          sx={{ 
            display: { xs: "none", lg: "flex" },
            alignItems: "flex-end",
            height: "100%",
            flex: 1,
            maxWidth: "249.86px"
          }}
        >
          <img
            src={group2}
            alt="Right group"
            style={{
              width: "100%",
              height: "459.51px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
        />
      </Box>
      
    </div>
  );
};

export default Login;
