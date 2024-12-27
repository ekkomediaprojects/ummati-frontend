import React, { useState } from "react";
import { Button, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useAuth } from '../authProviders/AuthContext'; // Import the useAuth hook to access the context
import RequestHandler from "../utils/RequestHandler";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the ArrowBack icon

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Email Validation
    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setApiError("");

    try {
      const url = `${process.env.REACT_APP_API_URL}auth/forgot-password`;
      // const url = `http://localhost:5002/auth/forgot-password`;
      const body = { email };
      const res = await RequestHandler(url, "POST", body);
      if (res?.success) {
        let data = res?.data
        toast.success(data?.message);
        console.log("Forget Password:", res.data, "Status:", res.status);
        setTimeout(() => {navigate("/")}, 1000);
        return;
      } else if(!res?.success) {
        toast.error(`${res?.message}`);
        console.error("Request error:", res, "Status:", res?.message);
      }
    } catch (error) {
      toast.error("An Unexpected error occurred");
      console.error("Unexpected error occurred:", error);
    } finally {
      setIsLoading(false);
    }
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
            gap: "24px", 
            boxSizing: "border-box",
          }}
          className=" bg-white shadow-lg"
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', maxWidth: '540px' }}>
            <IconButton
              onClick={handleBack}
              style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.5em' }}
              aria-label="back"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
                  
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
            Forget Password
          </Typography>

          <Typography
                variant="body2"
                color="textSecondary"
                className="text-sm text-right"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: "500",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  color: "#5A4283",
                }}
              >
              A password reset link will be sent to the email address you provide.
          </Typography>

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
                className={`w-full px-4 mb-2 py-3 bg-white border ${
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send"}
            </Button>
            </div>
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

export default ForgotPassword;
