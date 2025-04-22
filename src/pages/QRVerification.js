import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import RequestHandler from '../utils/RequestHandler';
import toast from 'react-hot-toast';

const QRVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyQRCode = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}auth/verify-qr/${token}`;
        const res = await RequestHandler(url, "GET");

        if (res?.success) {
          setVerificationStatus('success');
          toast.success('Verification successful!');
          // Redirect to profile or home page after 2 seconds
          setTimeout(() => navigate('/profile'), 2000);
        } else {
          setVerificationStatus('error');
          toast.error(res?.message || 'Verification failed');
        }
      } catch (error) {
        setVerificationStatus('error');
        toast.error('An error occurred during verification');
      } finally {
        setIsLoading(false);
      }
    };

    verifyQRCode();
  }, [token, navigate]);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      p: 3
    }}>
      {isLoading ? (
        <CircularProgress size={60} />
      ) : (
        <Typography variant="h5" sx={{ mt: 2 }}>
          {verificationStatus === 'success' 
            ? 'Verification Successful!'
            : 'Verification Failed'}
        </Typography>
      )}
    </Box>
  );
};

export default QRVerification; 