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
  Divider
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
  Code
} from "@mui/icons-material";

const API_URL = "http://api.ummaticommunity.com/";

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

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Please log in to edit event');
      }

      const response = await RequestHandler(
        `${API_URL}admin/events/${id}`,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        const event = response.data;
        setFormData({
          eventId: event.eventId || "",
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
      } else {
        throw new Error(response?.message || 'Error fetching event details');
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError(error.message || 'Error fetching event details');
      toast.error(error.message || 'Error fetching event details');
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

      const response = await RequestHandler(
        `${API_URL}admin/events/${id}`,
        'PUT',
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        toast.success('Event updated successfully');
        navigate('/dashboard/event-management');
    } else {
        throw new Error(response?.message || 'Failed to update event');
    }
    } catch (error) {
      console.error('Error updating event:', error);
      setError(error.message || 'Error updating event');
      toast.error(error.message || 'Error updating event');
    } finally {
      setSubmitting(false);
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
