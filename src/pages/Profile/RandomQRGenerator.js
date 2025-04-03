import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress,
  Stack
} from '@mui/material';

const RandomQRGenerator = () => {
  const [qrValue, setQrValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const generateRandomValue = () => {
    const timestamp = new Date().toISOString();
    const randomStr = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
    return `https://example.com/auth?token=${randomStr}&ts=${timestamp}`;
  };
  const updateQRValue = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newValue = generateRandomValue();
      setQrValue(newValue);
      setIsLoading(false);
    }, 500);
  };
  useEffect(() => {
    updateQRValue();
    const interval = setInterval(updateQRValue, 600000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt:  3
    }}>
      <Box sx={{ 
        p: 1, 
        bgcolor: 'background.paper', 
        borderRadius: 1,
      }} >
        {isLoading ? (
          <CircularProgress size={200} />
        ) : (
          <QRCodeSVG 
            value={qrValue || ' '}
            size={200}
            level="H"
          />
        )}
      </Box>
    </Box>
  );
};

export default RandomQRGenerator;