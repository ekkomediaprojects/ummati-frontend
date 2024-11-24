import React, { useState } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
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
  const [errors, setErrors] = useState({ email: "", password: "" }); // Error state

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {}; // Object to track validation errors

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

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Save user details to localStorage (example)
    const userDetails = {
      username: "john_doe",
      email: email,
      token: "abc123xyz",
      member_id: "3438204207",
      address : "street 10,los Angles",
      imageUrl : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
    };
    localStorage.setItem("userLogin", JSON.stringify(userDetails));

    // Redirect user
    navigate("/");
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#8692A6] mb-2"
              >
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
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "4px", fontSize: "14px" }}
                >
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
                <a href="/forgot-password">Forgot your password?</a>
              </Typography>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
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
              Login
            </Button>
          </form>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Login;
