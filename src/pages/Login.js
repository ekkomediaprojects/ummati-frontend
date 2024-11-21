import React, { useState } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import googleIcon from "../assets/icons/icons8-google.svg";
// import rightFlower from "../assets/icons/writeFlowerLogin.svg";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    navigate("/dashboard");
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
                required
                className="w-full px-4 py-3 bg-white border border-[#8692A6] rounded-lg shadow-sm focus:outline-none focus:ring-1"
              />
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
                placeholder="Write your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#8692A6] rounded-lg shadow-sm focus:outline-none focus:ring-1"
              />
              {/* Eye Icon for toggling password visibility */}
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
            </div>

            <div className="flex justify-between items-center mb-4">
              {/* Empty space to align "Forgot password?" to the right */}
              <div></div>
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

          {/* Register Link */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontFamily: "Poppins",
              textAlign: "center",
              color: "grey",
              fontSize: "16px",
            }}
            className="text-sm text-center"
          >
            Don&apos;t have an account?{" "}
            <a
              href = "/signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup"); // Navigate to the signup page
              }}
              className="text-[#5A4283] hover:underline"
            >
              Create an account
            </a>
          </Typography>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Login;
