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
    console.log('=== EditEventForm Debug ===');
    console.log('1. Component mounted with ID:', id);
    console.log('2. API URL:', API_URL);
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    console.log('3. Fetching event details for ID:', id);
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Please log in to edit event');
      }

      const requestUrl = `${API_URL}/admin/events/${id}`;
      console.log('4. Request details:', {
        url: requestUrl,
        method: 'GET',
        headers: {
          Authorization: 'Bearer [REDACTED]'
        }
      });

      const response = await RequestHandler(
        requestUrl,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log('5. Raw API Response:', {
        type: typeof response,
        isObject: typeof response === 'object',
        keys: response ? Object.keys(response) : [],
        success: response?.success,
        hasData: !!response?.data,
        dataType: response?.data ? typeof response?.data : 'undefined',
        fullResponse: response
      });

      if (!response) {
        console.error('6. No response received');
        throw new Error('No response received from server');
      }

      if (response.success) {
        // Extract event data from the nested response structure
        const event = response.data?.data?.data || response.data?.data || response.data;
        console.log('7. Event data received:', {
          eventId: event._id || event.eventId,
          name: event.name,
          hasVenue: !!event.venue,
          hasExternalUrls: !!event.externalUrls,
          fullEvent: event
        });

        // Map the event data to match the form structure
        setFormData({
          eventId: event._id || event.eventId || "",
          name: event.name || "",
          description: event.description || "",
          start: event.start ? dayjs(event.start) : dayjs(),
          end: event.end ? dayjs(event.end) : dayjs().add(2, 'hour'),
          imageUrl: event.imageUrl || "",
          venue: {
            name: event.venue?.name || event.location || "",
            addressLine1: event.venue?.addressLine1 || "",
            addressLine2: event.venue?.addressLine2 || "",
            city: event.venue?.city || event.city || "",
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

        console.log('8. Form data set:', {
          eventId: event._id || event.eventId,
          name: event.name,
          hasVenue: !!event.venue,
          hasExternalUrls: !!event.externalUrls,
          venueName: event.venue?.name,
          city: event.venue?.city || event.city,
          start: event.start,
          end: event.end,
          description: event.description,
          imageUrl: event.imageUrl,
          venue: event.venue,
          externalUrls: event.externalUrls
        });
      } else {
        console.error('9. Error response:', {
          message: response.message,
          success: response.success
        });
        throw new Error(response?.message || 'Error fetching event details');
      }
    } catch (error) {
      console.error('10. Error caught:', {
        message: error.message,
        stack: error.stack,
        response: error.response,
        name: error.name
      });
      setError(error.message || 'Error fetching event details');
      toast.error(error.message || 'Error fetching event details');
    } finally {
      setLoading(false);
      console.log('11. Request completed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (field) => (newValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Please log in to update event');
        }

      // Create a clean data object without the additional fields
      const cleanFormData = {
        eventId: formData.eventId,
        name: formData.name,
        description: formData.description,
        start: formData.start,
        end: formData.end,
        imageUrl: formData.imageUrl,
        venue: formData.venue,
        externalUrls: formData.externalUrls
      };

      const requestUrl = `${API_URL}/admin/events/${id}`;
      console.log('=== Update Event Debug ===');
      console.log('1. Update request details:', {
        url: requestUrl,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer [REDACTED]'
        },
        data: cleanFormData
      });

      const response = await RequestHandler(
        requestUrl,
        'PUT',
        cleanFormData,
        { Authorization: `Bearer ${token}` }
      );

      console.log('2. Update response:', {
        success: response?.success,
        message: response?.message,
        data: response?.data
      });

      if (response?.success) {
        toast.success('Event updated successfully');
        navigate('/dashboard/event-management');
      } else {
        throw new Error(response?.message || 'Failed to update event');
      }
    } catch (error) {
      console.error('3. Update error:', {
        message: error.message,
        stack: error.stack,
        response: error.response,
        name: error.name
      });
      setError(error.message || 'Error updating event');
      toast.error(error.message || 'Error updating event');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload the image
    try {
      setUploadingImage(true);
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Please log in to upload image');
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        'PUT',
        formData,
        { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      );

      console.log('Image upload response:', response);

      if (response.success) {
        // Extract imageUrl from the response data
        const imageUrl = response.data?.data?.data?.imageUrl || response.data?.data?.imageUrl || response.data?.imageUrl;
        
        if (!imageUrl) {
          throw new Error('No image URL received from server');
        }

        setFormData(prev => ({
          ...prev,
          imageUrl
        }));
        toast.success('Image uploaded successfully');
    } else {
        throw new Error(response.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error(error.message || 'Error uploading image');
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Please log in to remove image');
      }

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        'PUT',
        { imageUrl: null },
        { Authorization: `Bearer ${token}` }
      );

      if (response.success) {
        setImagePreview(null);
        setFormData(prev => ({
          ...prev,
          imageUrl: ""
        }));
        toast.success('Image removed successfully');
      } else {
        throw new Error(response.message || 'Failed to remove image');
      }
    } catch (error) {
      console.error('Remove image error:', error);
      toast.error(error.message || 'Error removing image');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box className="text-themeblack md:w-3/4 mb-5">
      <div className="flex justify-between items-center">
        <Typography variant="h6">Edit Event</Typography>
      </div>
      <hr className="my-2" />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Event Information */}
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
              InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                    <Code />
                        </InputAdornment>
                      ),
                }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Title />
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                value={formData.start}
                onChange={handleDateChange('start')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date & Time"
                value={formData.end}
                onChange={handleDateChange('end')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    disabled={uploadingImage}
                    startIcon={uploadingImage ? <CircularProgress size={20} /> : <ImageIcon />}
                  >
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                  </Button>
                </label>
              </div>
              
              {(imagePreview || formData.imageUrl) && (
                <div className="relative w-full max-w-md">
                  <img
                    src={imagePreview || formData.imageUrl}
                    alt="Event preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <IconButton
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    size="small"
                  >
                    <Close />
                  </IconButton>
                </div>
              )}
            </div>
          </Grid>

          {/* Venue Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Venue Information</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Venue Name"
              name="venue.name"
              value={formData.venue.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="venue.addressLine1"
              value={formData.venue.addressLine1}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="venue.addressLine2"
              value={formData.venue.addressLine2}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="City"
              name="venue.city"
              value={formData.venue.city}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Map />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="State"
              name="venue.state"
              value={formData.venue.state}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Public />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Postal Code"
              name="venue.postalCode"
              value={formData.venue.postalCode}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Code />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* External URLs */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>External URLs</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Eventbrite URL"
              name="externalUrls.eventbrite"
              value={formData.externalUrls.eventbrite}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Meetup URL"
              name="externalUrls.meetup"
              value={formData.externalUrls.meetup}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Zeffy URL"
              name="externalUrls.zeffy"
              value={formData.externalUrls.zeffy}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
                />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Other URL"
              name="externalUrls.other"
              value={formData.externalUrls.other}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

            <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard/event-management')}
            >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} /> : null}
              >
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
