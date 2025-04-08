"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Avatar, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const AccountDetailsForm = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    mobile: "1234567890",
    linkedIN: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
    avatar: "", // Default avatar
  });

  const [isSubmitDone, setIsSubmitDone] = useState(false);

  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fake submit: update user state
    setUser(formData);
    setIsSubmitDone(true);
    setTimeout(() => setIsSubmitDone(false), 1500);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Grid container justifyContent="center">
        <Avatar
          alt="User Image"
          src={
            user.avatar !== "" && user.avatar !== "avatar"
              ? user.avatar
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
            >
              {isSubmitDone ? "Saved!" : "Save Changes"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AccountDetailsForm;
