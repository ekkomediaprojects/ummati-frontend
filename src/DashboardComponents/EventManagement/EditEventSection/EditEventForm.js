"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import RequestHandler from "../../../utils/RequestHandler";
import toast from "react-hot-toast";

import {
  TextField,
  Button,
  Grid,
  Typography,
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

const API_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") ||
  "https://api.ummaticommunity.com";

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
    end: dayjs().add(2, "hour"),
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
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Please log in");

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        "GET",
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.success) throw new Error(response?.message);

      const event =
        response.data?.data?.data ||
        response.data?.data ||
        response.data;

      setFormData({
        eventId: event._id || "",
        name: event.name || "",
        description: event.description || "",
        start: event.start ? dayjs(event.start) : dayjs(),
        end: event.end ? dayjs(event.end) : dayjs().add(2, "hour"),
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

    if (name.includes(".")) {
      const [p, c] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [p]: { ...prev[p], [c]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = field => newValue => {
    if (!newValue || !dayjs(newValue).isValid()) return;

    setFormData(prev => ({
      ...prev,
      [field]: dayjs(newValue)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (dayjs(formData.end).isBefore(dayjs(formData.start))) {
      toast.error("End time cannot be before start time");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Please log in");

      const payload = {
        ...formData,
        start: formData.start.toISOString(),
        end: formData.end.toISOString()
      };

      const response = await RequestHandler(
        `${API_URL}/admin/events/${id}`,
        "PUT",
        payload,
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.success) throw new Error(response?.message);

      toast.success("Event updated");
      navigate("/dashboard/event-management");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );

  return (
    <Box className="md:w-3/4">
      <Typography variant="h6">Edit Event</Typography>
      <hr className="my-2" />

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Event Name" name="name" value={formData.name} onChange={handleChange} required />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Description" multiline rows={3} name="description" value={formData.description} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start"
                value={formData.start}
                onChange={handleDateChange("start")}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End"
                value={formData.end}
                onChange={handleDateChange("end")}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Box className="flex justify-end gap-2">
              <Button variant="outlined" onClick={() => navigate("/dashboard/event-management")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? "Updating..." : "Update Event"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditEventForm;
