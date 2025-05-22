"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import RequestHandler from "../../../utils/RequestHandler"
import toast from "react-hot-toast"

// Material UI components
import {TextField,Button,Grid,Typography,Paper,Box,InputAdornment,CircularProgress,Alert,Divider} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { CalendarMonth, Title, Link as LinkIcon, LocationOn, Description, Image as ImageIcon, Home, Map, Public, Code } from "@mui/icons-material"

const API_URL = "http://api.ummaticommunity.com/"

const AddEventForm = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
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
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('Please log in to create event')
      }

      const response = await RequestHandler(
        `${API_URL}admin/events`,
        'POST',
        formData,
        { Authorization: `Bearer ${token}` }
      )

      if (response?.success) {
        toast.success('Event created successfully')
        navigate('/dashboard/event-management')
    } else {
        throw new Error(response?.message || 'Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      setError(error.message || 'Error creating event')
      toast.error(error.message || 'Error creating event')
    } finally {
      setSubmitting(false)
    }
  }

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
                {submitting ? 'Creating...' : 'Create Event'}
            </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default AddEventForm
