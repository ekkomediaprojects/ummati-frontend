import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const AccountSecurityForm = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isSubmitDone, setIsSubmitDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPass || !newPass || !confirmPass) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/user/resetPassword", {
        currentPass,
        newPass,
        confirmPass,
      });

      switch (response.data.status) {
        case 200:
          setError("");
          setIsSubmitDone(true);
          setTimeout(() => {
            setIsSubmitDone(false);
          }, 800);
          break;
        case 400:
          setError("Invalid User");
          break;
        case 401:
          setError("Invalid Password");
          break;
        case 402:
          setError("Passwords do not match");
          break;
        default:
          setError("There was an error resetting your password");
          break;
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Reset Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}></Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ borderRadius: "999px", paddingX: 4 }}
              startIcon={isSubmitDone ? <DoneIcon color="success" /> : null}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : "Reset Password"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default AccountSecurityForm;
