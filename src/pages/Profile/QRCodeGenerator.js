import React, { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const QRCodeGenerator = ({ size = 200 }) => {
  // default size smaller
  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600);
  const isGenerating = useRef(false);

  const generateQRCode = async () => {
    if (isGenerating.current) return;
    try {
      isGenerating.current = true;
      setIsLoading(true);
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("Please log in to generate QR code");
        return;
      }
      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}qr/generate-qr`,
        "POST",
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success && response.data?.data) {
        const { code, displayUrl, qrCodeImage } = response.data.data;
        setQrData({
          qrCodeImage:
            qrCodeImage || `https://api.ummaticommunity.com/qr/image/${code}`,
          displayUrl:
            displayUrl ||
            `https://api.ummaticommunity.com/qr/verify/${code}?captureLocation=true`,
        });
        setTimeLeft(600);
      } else {
        throw new Error(response?.message || "Failed to generate QR code");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error generating QR code");
      setQrData(null);
    } finally {
      setIsLoading(false);
      isGenerating.current = false;
    }
  };

  useEffect(() => {
    generateQRCode();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateQRCode();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec.toString().padStart(2, "0")}`;
  };

  const handleCopy = () => {
    if (qrData?.displayUrl) {
      navigator.clipboard.writeText(qrData.displayUrl);
      toast.success("Link copied!");
    }
  };

  const handleOpen = () => {
    if (qrData?.displayUrl) {
      window.open(qrData.displayUrl, "_blank");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {isLoading ? (
        <CircularProgress size={size} />
      ) : (
        <>
          <Box
            sx={{
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 0.5,
            }}
          >
            {qrData?.qrCodeImage ? (
              <img
                src={qrData.qrCodeImage}
                alt="QR Code"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <CircularProgress size={size} />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            Expires in: {formatTime(timeLeft)}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            <Button
              size="small"
              variant="text"
              component="a"
              sx={{
                textDecoration: "underline",
                color: "black",
                padding: 0,
                minWidth: 0,
                "&:hover": { backgroundColor: "transparent", color: "black" }, // keeps black on hover
              }}
              onClick={handleCopy}
            >
              Copy
            </Button>
            <Button
              size="small"
              variant="text"
              component="a"
              sx={{
                textDecoration: "underline",
                color: "black",
                padding: 0,
                minWidth: 0,
                "&:hover": { backgroundColor: "transparent", color: "black" }, // keeps black on hover
              }}
              onClick={handleOpen}
            >
              Open
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default QRCodeGenerator;
