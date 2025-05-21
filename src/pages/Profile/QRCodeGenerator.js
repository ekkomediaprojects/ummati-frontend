import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import RequestHandler from '../../utils/RequestHandler';
import toast from 'react-hot-toast';

const QRCodeGenerator = () => {
  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const isGenerating = useRef(false);

  const generateQRCode = async () => {
    if (isGenerating.current) return;
    
    try {
      isGenerating.current = true;
      setIsLoading(true);
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to generate QR code');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}qr/generate-qr`, 
        'POST',
        {},
        { Authorization: `Bearer ${token}` }
      );
      
      // Log the complete response for debugging
      console.log('Complete API Response:', response);
      
      if (response?.success) {
        // Check if we have a valid response structure
        if (!response.data?.data) {
          console.error('No data in response:', response);
          throw new Error('Invalid response from server');
        }

        // Extract the QR code data from the nested response
        const { code, displayUrl, qrCodeImage } = response.data.data;
        
        if (!code) {
          console.error('No QR code data found in response:', response);
          throw new Error('No QR code data received from server');
        }

        // If we have a direct QR code image, use it
        if (qrCodeImage) {
          setQrData({
            qrCodeImage,
            displayUrl: displayUrl || `https://api.ummaticommunity.com/qr/verify/${code}?captureLocation=true`
          });
        } else {
          // If we only have the code, generate the QR code image
          const qrCodeImage = `https://api.ummaticommunity.com/qr/image/${code}`;
          setQrData({
            qrCodeImage,
            displayUrl: displayUrl || `https://api.ummaticommunity.com/qr/verify/${code}?captureLocation=true`
          });
        }
        
        setTimeLeft(600); // Reset timer to 10 minutes
        toast.success('QR code generated successfully');
      } else {
        console.error('Server response indicates failure:', response);
        throw new Error(response?.message || 'Failed to generate QR code');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error(error.message || 'Error generating QR code');
      setQrData(null);
    } finally {
      setIsLoading(false);
      isGenerating.current = false;
    }
  };

  useEffect(() => {
    let timer;
    
    // Generate initial QR code
    generateQRCode();

    // Set up timer to refresh QR code
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateQRCode();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []); // Empty dependency array since we only want this to run once

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatUrl = (url) => {
    if (!url) return '';
    const baseUrl = 'https://api.ummaticommunity.com/qr/verify/';
    const code = url.split('/').pop().split('?')[0];
    return `${baseUrl}${code}`;
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 3,
      gap: 2
    }}>
      {isLoading ? (
        <CircularProgress size={200} />
      ) : (
        <>
          <Box sx={{ 
            p: 1, 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {qrData?.qrCodeImage ? (
              <img 
                src={qrData.qrCodeImage} 
                alt="QR Code" 
                style={{ 
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }} 
                onError={(e) => {
                  console.error('Error loading QR code image:', e);
                  toast.error('Failed to load QR code image');
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <CircularProgress size={200} />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Expires in: {formatTime(timeLeft)}
          </Typography>
          {qrData?.displayUrl && (
            <Paper 
              elevation={0}
              sx={{ 
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                maxWidth: '200px',
                wordBreak: 'break-all'
              }}
            >
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '0.7rem'
                }}
              >
                {formatUrl(qrData.displayUrl)}
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default QRCodeGenerator; 