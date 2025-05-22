"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Avatar, Grid, Box, CircularProgress } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const AccountDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDone, setIsSubmitDone] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    linkedIN: "",
    instagram: "",
    avatar: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to access your profile');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}user/profile`,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          mobile: response.data.mobile || "",
          linkedIN: response.data.linkedIN || "",
          instagram: response.data.instagram || "",
          avatar: response.data.avatar || "",
        });
      } else {
        toast.error(response?.message || 'Error fetching profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error fetching profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to update your profile');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}user/update-profile`,
        'PUT',
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
    setIsSubmitDone(true);
        toast.success('Profile updated successfully');
    setTimeout(() => setIsSubmitDone(false), 1500);
      } else {
        toast.error(response?.message || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Grid container justifyContent="center">
        <Avatar
          alt="User Image"
          src={
            formData.avatar
              ? formData.avatar
              : "/assets/placeholder/user_placeholder.jpg"
          }
          sx={{ width: 120, height: 120, border: "2px solid #000" }}
        />
      </Grid>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
              required
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="LinkedIn"
              name="linkedIN"
              value={formData.linkedIN}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ borderRadius: "50px" }}
              startIcon={isSubmitDone ? <DoneIcon color="success" /> : null}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : isSubmitDone ? (
                "Saved!"
              ) : (
                "Save Changes"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AccountDetailsForm;
