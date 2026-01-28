"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import RequestHandler from "../../../utils/RequestHandler";
import toast from "react-hot-toast";

// Material UI components
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  InputAdornment,
  CircularProgress,
  Alert,
  Divider,
  IconButton
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CalendarMonth,
  Title,
  Link as LinkIcon,
  LocationOn,
  Description,
  Image as ImageIcon,
  Home,
  Map,
  Public,
  Code,
  Close
} from "@mui/icons-material";

const API_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || 'https://api.ummaticommunity.com';

const EditEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    eventId: "",
    name: "",
    description: "",
    start: dayjs(),
    end: dayjs().add(2, 'hour'),
    imageUrl: "",
    venue: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: ""
    },
    externalUrls: {
      eventbrite: "",
      meetup: "",
      zeffy: "",
      other: ""
    }
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Please log in');

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.success) throw new Error(response?.message);

      const event = response.data?.data?.data || response.data?.data || response.data;

      setFormData({
        eventId: event._id || "",
        name: event.name || "",
        description: event.description || "",
        start: event.start ? dayjs(event.start) : dayjs(),
        end: event.end ? dayjs(event.end) : dayjs().add(2, 'hour'),
        imageUrl: event.imageUrl || "",
        venue: {
          name: event.venue?.name || "",
          addressLine1: event.venue?.addressLine1 || "",
          addressLine2: event.venue?.addressLine2 || "",
          city: event.venue?.city || "",
          state: event.venue?.state || "",
          postalCode: event.venue?.postalCode || ""
        },
        externalUrls: {
          eventbrite: event.externalUrls?.eventbrite || "",
          meetup: event.externalUrls?.meetup || "",
          zeffy: event.externalUrls?.zeffy || "",
          other: event.externalUrls?.other || ""
        }
      });

      if (event.imageUrl) setImagePreview(event.imageUrl);

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (field) => (newValue) => {
    if (!newValue || !dayjs(newValue).isValid()) return;
    setFormData(prev => ({
      ...prev,
      [field]: dayjs(newValue)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dayjs(formData.end).isBefore(dayjs(formData.start))) {
      toast.error("End date cannot be before start");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Please log in');

      // Convert Dayjs to ISO for backend
      const payload = {
        eventId: formData.eventId,
        name: formData.name,
        description: formData.description,
        start: formData.start.toISOString(),
        end: formData.end.toISOString(),
        imageUrl: formData.imageUrl,
        venue: formData.venue,
        externalUrls: formData.externalUrls
      };

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        'PUT',
        payload,
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.success) throw new Error(response?.message);
      toast.success('Event updated successfully');
      navigate('/dashboard/event-management');

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    try {
      setUploadingImage(true);
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Please log in');

      const form = new FormData();
      form.append('image', file);

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        'PUT',
        form,
        { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      );

      if (!response?.success) throw new Error(response?.message);

      const imageUrl = response.data?.data?.data?.imageUrl || response.data?.imageUrl;
      setFormData(prev => ({ ...prev, imageUrl }));
      toast.success('Image uploaded successfully');

    } catch (err) {
      setImagePreview(null);
      toast.error(err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Please log in');

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        'PUT',
        { imageUrl: null },
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.success) throw new Error(response?.message);
      setImagePreview(null);
      setFormData(prev => ({ ...prev, imageUrl: "" }));
      toast.success('Image removed successfully');

    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <CircularProgress />
    </div>
  );

  return (
    <Box className="text-themeblack md:w-3/4 mb-5">
      <div className="flex justify-between items-center">
        <Typography variant="h6">Edit Event</Typography>
      </div>
      <hr className="my-2" />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Event Info */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Basic Information</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event ID"
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              required
              InputProps={{ startAdornment: <InputAdornment position="start"><Code /></InputAdornment> }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              InputProps={{ startAdornment: <InputAdornment position="start"><Title /></InputAdornment> }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              InputProps={{ startAdornment: <InputAdornment position="start"><Description /></InputAdornment> }}
            />
          </Grid>

          {/* DateTime Pickers */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                value={formData.start}
                onChange={handleDateChange("start")}
                slotProps={{ textField: { fullWidth: true, required: true, InputProps: { startAdornment: <InputAdornment position="start"><CalendarMonth /></InputAdornment> } } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date & Time"
                value={formData.end}
                onChange={handleDateChange("end")}
                slotProps={{ textField: { fullWidth: true, required: true, InputProps: { startAdornment: <InputAdornment position="start"><CalendarMonth /></InputAdornment> } } }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon /></InputAdornment> }}
                />
                <input accept="image/*" style={{ display: 'none' }} id="image-upload" type="file" onChange={handleImageChange} />
                <label htmlFor="image-upload">
                  <Button variant="outlined" component="span" disabled={uploadingImage} startIcon={uploadingImage ? <CircularProgress size={20} /> : <ImageIcon />}>
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                  </Button>
                </label>
              </div>

              {(imagePreview || formData.imageUrl) && (
                <div className="relative w-full max-w-md">
                  <img src={imagePreview || formData.imageUrl} alt="Event preview" className="w-full h-48 object-cover rounded-lg" />
                  <IconButton onClick={removeImage} className="absolute top-2 right-2 bg-white/80 hover:bg-white" size="small">
                    <Close />
                  </IconButton>
                </div>
              )}
            </div>
          </Grid>

          {/* Venue Info */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Venue Information</Typography>
          </Grid>

          {["name", "addressLine1", "addressLine2", "city", "state", "postalCode"].map((field, idx) => (
            <Grid item xs={12} sm={field === "city" || field === "state" || field === "postalCode" ? 4 : 12} key={field}>
              <TextField
                fullWidth
                label={field === "name" ? "Venue Name" : field.replace(/([A-Z])/g, ' $1')}
                name={`venue.${field}`}
                value={formData.venue[field]}
                onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start">{field==="name"?<Home />:field==="city"?<Map />:field==="state"?<Public />:<LocationOn />}</InputAdornment> }}
              />
            </Grid>
          ))}

          {/* External URLs */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>External URLs</Typography>
          </Grid>

          {["eventbrite", "meetup", "zeffy", "other"].map((url) => (
            <Grid item xs={12} sm={6} key={url}>
              <TextField
                fullWidth
                label={`${url.charAt(0).toUpperCase() + url.slice(1)} URL`}
                name={`externalUrls.${url}`}
                value={formData.externalUrls[url]}
                onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment> }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/dashboard/event-management')}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={submitting} startIcon={submitting ? <CircularProgress size={20} /> : null}>
                {submitting ? 'Updating...' : 'Update Event'}
              </Button>
            </Box>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
};

export default EditEventForm;
