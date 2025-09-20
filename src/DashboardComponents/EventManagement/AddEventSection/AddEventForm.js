"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import RequestHandler from "../../../utils/RequestHandler";
import toast from "react-hot-toast";
import { State, City } from "country-state-city";

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
  IconButton,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {CalendarMonth,Title,Link as LinkIcon,LocationOn,Description,Image as ImageIcon,Home,Map,Public,Code,Close } from "@mui/icons-material";

const API_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "https://api.ummaticommunity.com";

// Helper function to generate event ID
const generateEventId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `EVT-${year}${month}${day}-${random}`;
};

const US_STATES = [
  { id: 'AL', name: 'Alabama', symbol: 'AL' },
  { id: 'AK', name: 'Alaska', symbol: 'AK' },
  { id: 'AZ', name: 'Arizona', symbol: 'AZ' },
  { id: 'AR', name: 'Arkansas', symbol: 'AR' },
  { id: 'CA', name: 'California', symbol: 'CA' },
  { id: 'CO', name: 'Colorado', symbol: 'CO' },
  { id: 'CT', name: 'Connecticut', symbol: 'CT' },
  { id: 'DE', name: 'Delaware', symbol: 'DE' },
  { id: 'FL', name: 'Florida', symbol: 'FL' },
  { id: 'GA', name: 'Georgia', symbol: 'GA' },
  { id: 'HI', name: 'Hawaii', symbol: 'HI' },
  { id: 'ID', name: 'Idaho', symbol: 'ID' },
  { id: 'IL', name: 'Illinois', symbol: 'IL' },
  { id: 'IN', name: 'Indiana', symbol: 'IN' },
  { id: 'IA', name: 'Iowa', symbol: 'IA' },
  { id: 'KS', name: 'Kansas', symbol: 'KS' },
  { id: 'KY', name: 'Kentucky', symbol: 'KY' },
  { id: 'LA', name: 'Louisiana', symbol: 'LA' },
  { id: 'ME', name: 'Maine', symbol: 'ME' },
  { id: 'MD', name: 'Maryland', symbol: 'MD' },
  { id: 'MA', name: 'Massachusetts', symbol: 'MA' },
  { id: 'MI', name: 'Michigan', symbol: 'MI' },
  { id: 'MN', name: 'Minnesota', symbol: 'MN' },
  { id: 'MS', name: 'Mississippi', symbol: 'MS' },
  { id: 'MO', name: 'Missouri', symbol: 'MO' },
  { id: 'MT', name: 'Montana', symbol: 'MT' },
  { id: 'NE', name: 'Nebraska', symbol: 'NE' },
  { id: 'NV', name: 'Nevada', symbol: 'NV' },
  { id: 'NH', name: 'New Hampshire', symbol: 'NH' },
  { id: 'NJ', name: 'New Jersey', symbol: 'NJ' },
  { id: 'NM', name: 'New Mexico', symbol: 'NM' },
  { id: 'NY', name: 'New York', symbol: 'NY' },
  { id: 'NC', name: 'North Carolina', symbol: 'NC' },
  { id: 'ND', name: 'North Dakota', symbol: 'ND' },
  { id: 'OH', name: 'Ohio', symbol: 'OH' },
  { id: 'OK', name: 'Oklahoma', symbol: 'OK' },
  { id: 'OR', name: 'Oregon', symbol: 'OR' },
  { id: 'PA', name: 'Pennsylvania', symbol: 'PA' },
  { id: 'RI', name: 'Rhode Island', symbol: 'RI' },
  { id: 'SC', name: 'South Carolina', symbol: 'SC' },
  { id: 'SD', name: 'South Dakota', symbol: 'SD' },
  { id: 'TN', name: 'Tennessee', symbol: 'TN' },
  { id: 'TX', name: 'Texas', symbol: 'TX' },
  { id: 'UT', name: 'Utah', symbol: 'UT' },
  { id: 'VT', name: 'Vermont', symbol: 'VT' },
  { id: 'VA', name: 'Virginia', symbol: 'VA' },
  { id: 'WA', name: 'Washington', symbol: 'WA' },
  { id: 'WV', name: 'West Virginia', symbol: 'WV' },
  { id: 'WI', name: 'Wisconsin', symbol: 'WI' },
  { id: 'WY', name: 'Wyoming', symbol: 'WY' }
];

const US_CITIES = {
  'TX': [
    { id: 'tx-austin', name: 'Austin', state: 'TX' },
    { id: 'tx-houston', name: 'Houston', state: 'TX' },
    { id: 'tx-dallas', name: 'Dallas', state: 'TX' },
    { id: 'tx-san-antonio', name: 'San Antonio', state: 'TX' },
    { id: 'tx-fort-worth', name: 'Fort Worth', state: 'TX' },
    { id: 'tx-el-paso', name: 'El Paso', state: 'TX' },
    { id: 'tx-arlington', name: 'Arlington', state: 'TX' },
    { id: 'tx-corpus-christi', name: 'Corpus Christi', state: 'TX' },
    { id: 'tx-plano', name: 'Plano', state: 'TX' },
    { id: 'tx-laredo', name: 'Laredo', state: 'TX' },
    { id: 'tx-lubbock', name: 'Lubbock', state: 'TX' },
    { id: 'tx-garland', name: 'Garland', state: 'TX' },
    { id: 'tx-irving', name: 'Irving', state: 'TX' },
    { id: 'tx-amarillo', name: 'Amarillo', state: 'TX' },
    { id: 'tx-grand-prairie', name: 'Grand Prairie', state: 'TX' },
    { id: 'tx-brownsville', name: 'Brownsville', state: 'TX' },
    { id: 'tx-pasadena', name: 'Pasadena', state: 'TX' },
    { id: 'tx-mesquite', name: 'Mesquite', state: 'TX' },
    { id: 'tx-mckinney', name: 'McKinney', state: 'TX' },
    { id: 'tx-mcallen', name: 'McAllen', state: 'TX' }
  ],
  'CA': [
    { id: 'ca-los-angeles', name: 'Los Angeles', state: 'CA' },
    { id: 'ca-san-diego', name: 'San Diego', state: 'CA' },
    { id: 'ca-san-jose', name: 'San Jose', state: 'CA' },
    { id: 'ca-san-francisco', name: 'San Francisco', state: 'CA' },
    { id: 'ca-fresno', name: 'Fresno', state: 'CA' },
    { id: 'ca-sacramento', name: 'Sacramento', state: 'CA' },
    { id: 'ca-long-beach', name: 'Long Beach', state: 'CA' },
    { id: 'ca-oakland', name: 'Oakland', state: 'CA' },
    { id: 'ca-bakersfield', name: 'Bakersfield', state: 'CA' },
    { id: 'ca-anaheim', name: 'Anaheim', state: 'CA' }
  ],
  'NY': [
    { id: 'ny-new-york', name: 'New York City', state: 'NY' },
    { id: 'ny-buffalo', name: 'Buffalo', state: 'NY' },
    { id: 'ny-rochester', name: 'Rochester', state: 'NY' },
    { id: 'ny-yonkers', name: 'Yonkers', state: 'NY' },
    { id: 'ny-syracuse', name: 'Syracuse', state: 'NY' },
    { id: 'ny-albany', name: 'Albany', state: 'NY' },
    { id: 'ny-new-rochelle', name: 'New Rochelle', state: 'NY' },
    { id: 'ny-mount-vernon', name: 'Mount Vernon', state: 'NY' },
    { id: 'ny-schenectady', name: 'Schenectady', state: 'NY' },
    { id: 'ny-utica', name: 'Utica', state: 'NY' }
  ]
  // Add more states and their cities as needed
};

const AddEventForm = ({ eventTypes, cities: propCities, states }) => {
  const navigate = useNavigate()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [filteredCities, setFilteredCities] = useState([])
  const [usStates, setUsStates] = useState([])
  const [formData, setFormData] = useState({
    eventId: generateEventId(),
    name: "",
    description: "",
    start: dayjs(),
    end: dayjs().add(2, 'hour'),
    imageUrl: "",
    eventType: eventTypes?.[0]?.id || "",
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
  })

  // Load US states on component mount
  useEffect(() => {
    const states = State.getStatesOfCountry("US");
    setUsStates(states);
  }, []);

  // Update filtered cities when state changes
  useEffect(() => {
    if (formData.venue.state) {
      const citiesInState = City.getCitiesOfState("US", formData.venue.state);
      setFilteredCities(citiesInState);
      
      // Clear city if it's not in the new state
      if (formData.venue.city && !citiesInState.some(city => city.name === formData.venue.city)) {
        setFormData(prev => ({
          ...prev,
          venue: {
            ...prev.venue,
            city: ""
          }
        }));
      }
    } else {
      setFilteredCities([]);
    }
  }, [formData.venue.state]);

  // Update eventType when eventTypes prop changes
  useEffect(() => {
    if (eventTypes?.length > 0 && !formData.eventType) {
      setFormData((prev) => ({
        ...prev,
        eventType: eventTypes[0].id
      }));
    }
  }, [eventTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleDateChange = (field) => (newValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      const msg = "Please upload a valid image file (JPG, JPEG, or PNG).";
      setError(msg);
      toast.error(msg, { duration: 5000, position: "top-center" });
      e.target.value = "";
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      const errorMessage = `Image size (${(file.size / (1024 * 1024)).toFixed(
        1
      )}MB) exceeds the 10MB limit. Please resize your image before uploading.`;
      setError(errorMessage);
      toast.error(errorMessage, { duration: 5000, position: "top-center" });
      e.target.value = "";
      return;
    }

    setError("");
    setUploadingImage(true);

    // Simulate upload progress
    const reader = new FileReader();
    reader.onloadstart = () => setUploadProgress(0);
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setSelectedImage(file);
      setUploadingImage(false);
      setUploadProgress(100);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedImage(null);
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("You must be logged in to create an event.");
        return;
      }

      // Prepare the data
      const submitData = {
        ...formData,
        start: formData.start.toISOString(),
        end: formData.end.toISOString(),
        venue: JSON.stringify(formData.venue),
        externalUrls: JSON.stringify(formData.externalUrls),
      };

      let finalData = submitData;
      let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (selectedImage) {
        const formDataObj = new FormData();
        formDataObj.append("image", selectedImage, selectedImage.name);
        Object.entries(submitData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formDataObj.append(key, value);
          }
        });
        finalData = formDataObj;
        headers = { Authorization: `Bearer ${token}` }; // browser sets content-type with boundary
      }

      const response = await RequestHandler(
        `${API_URL}/admin/events`,
        "POST",
        finalData,
        headers
      );

      if (response?.success) {
        toast.success("Event created successfully");
        navigate("/dashboard/event-management");
      } else if (response?.statusCode) {
        // Display server error based on status code
        switch (response.statusCode) {
          case 400:
            setError("Bad Request: Please check the data you entered.");
            break;
          case 401:
            setError("Unauthorized: Please log in again.");
            break;
          case 403:
            setError("Forbidden: You do not have permission to create events.");
            break;
          case 409:
            setError(
              "Conflict: Event with the same ID or name already exists."
            );
            break;
          case 500:
          default:
            setError("Server error: Please try again later.");
        }
      } else {
        setError(response?.message || "Failed to create event.");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      if (err.response?.status) {
        switch (err.response.status) {
          case 400:
            setError("Bad Request: Please check the data you entered.");
            break;
          case 401:
            setError("Unauthorized: Please log in again.");
            break;
          case 403:
            setError("Forbidden: You do not have permission to create events.");
            break;
          case 409:
            setError(
              "Conflict: Event with the same ID or name already exists."
            );
            break;
          case 500:
          default:
            setError("Server error: Please try again later.");
        }
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="text-themeblack md:w-3/4 mb-5">
      <div className="flex justify-between items-center">
        <Typography variant="h6">Add New Event</Typography>
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
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Basic Information
            </Typography>
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
                onChange={handleDateChange("start")}
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
                onChange={handleDateChange("end")}
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
                  accept="image/jpeg,image/png,image/gif"
                  style={{ display: "none" }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    disabled={uploadingImage}
                    startIcon={
                      uploadingImage ? (
                        <CircularProgress
                          size={20}
                          variant="determinate"
                          value={uploadProgress}
                        />
                      ) : (
                        <ImageIcon />
                      )
                    }
                  >
                    {uploadingImage
                      ? `Uploading ${uploadProgress}%`
                      : "Select Image"}
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
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Venue Information
            </Typography>
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

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="State"
              name="venue.state"
              value={formData.venue.state}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Public />
                  </InputAdornment>
                ),
              }}
            >
              {usStates.map((state) => (
                <MenuItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={filteredCities}
              getOptionLabel={(option) => option.name}
              value={
                filteredCities.find(
                  (city) => city.name === formData.venue.city
                ) || null
              }
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  venue: {
                    ...prev.venue,
                    city: newValue ? newValue.name : "",
                    postalCode: newValue
                      ? newValue.zipcode
                      : prev.venue.postalCode,
                  },
                }));
              }}
              disabled={!formData.venue.state}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  required
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Map />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>
                    <Typography variant="body1">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.stateCode} - {option.zipcode}
                    </Typography>
                  </Box>
                </li>
              )}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              noOptionsText="No cities found"
              loadingText="Loading cities..."
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
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              External URLs
            </Typography>
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

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Event Type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Code />
                  </InputAdornment>
                ),
              }}
            >
              {eventTypes?.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/dashboard/event-management")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} /> : null}
              >
                {submitting ? "Creating..." : "Create Event"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEventForm;
