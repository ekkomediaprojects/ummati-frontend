import React, { useState } from "react";
import { Button,Link, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useAuth } from '../authProviders/AuthContext'; // Import the useAuth hook to access the context
import RequestHandler from "../utils/RequestHandler";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import googleIcon from "../assets/icons/icons8-google.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
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
      // const url = `http://localhost:5002/auth/login`;
      const body = { email, password };
      const res = await RequestHandler(url, "POST", body);
      if (res?.success) {
        let data = res?.data
        toast.success(data?.message);
       if(data?.user && data?.token){
          localStorage.setItem("userToken", data?.token)
          setIsLoggedIn(true);
          setUserDetails(data?.user);
          localStorage.setItem("userData", JSON.stringify(data?.user))
          setTimeout(() => {navigate("/")}, 1000);
          return;
        }
      } else if(!res?.success) {
        toast.error(`${res?.message}`);
        console.error("Request error:", res, "Status:", res?.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected error occurred:", error);

      // setApiError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    navigate("/");
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
            LOG IN WITH
          </Typography>

          {/* Google Login Button */}
          <Button
            variant="outlined"
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
              boxShadow: "10px 0px 10px 0px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              width: "100%",
              height: "54px",
              fontFamily: "Roboto", // Font Family
              fontWeight: 200, // Font Weight
              fontSize: "20px", // Font Size
              lineHeight: "23.44px",
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
              width: "100%",
              margin: "16px 0", // Adjusts spacing around the divider
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
          <form onSubmit={handleSubmit} className="w-full">
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
                placeholder="Write your password"
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
                  top: "55%",
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
            {/* Register Link */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontFamily: "Poppins",
              textAlign: "center",
              color: "grey",
              fontSize: "16px",
              margin : "8px"
            }}
            className="text-sm text-center"
          >
            Do you already have an account?{" "}
            <a
              href="/register"
              className="text-[#5A4283] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign Up
            </a>
          </Typography>
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

export default Login;
