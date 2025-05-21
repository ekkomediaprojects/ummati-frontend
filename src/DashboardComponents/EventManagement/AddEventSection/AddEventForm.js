"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import RequestHandler from "../../../utils/RequestHandler"
import toast from "react-hot-toast"

// Material UI components
import {TextField,Button,Grid,Typography,MenuItem,FormControlLabel,Switch,Paper,Box,InputAdornment,Divider,CircularProgress} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {CalendarMonth,Title,Link as LinkIcon,LocationOn,Description,Numbers,AttachMoney,Category,LocationCity,Public,Image as ImageIcon} from "@mui/icons-material"

const AddEventForm = ({ cities, states, eventTypes, setIsLoading }) => {
  const navigate = useNavigate()
  const [dateTime, setDateTime] = useState(dayjs(new Date()))
  const [name, setName] = useState("")
  const [eventLink, setEventLink] = useState("")
  const [mapLink, setMapLink] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(1)
  const [eventType, setEventType] = useState(eventTypes[0]?.id || "")
  const [active, setActive] = useState(true)
  const [image, setImage] = useState(null)
  const [city, setCity] = useState("")
  const [stateSelector, setStateSelector] = useState(cities[0]?.state?.id || "")
  const [cityList, setCityList] = useState(cities)
  const [stateList, setStateList] = useState(states)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputProps = {
    placeholder: "Date and time of event",
  };
  function replaceSpecialCharsAndSpaces(inputString) {
    // Replace special characters with blanks
    const stringWithoutSpecialChars = inputString.replace(/[^\w\s-]/g, " ");

    // Replace spaces with hyphens
    const stringWithHyphens = stringWithoutSpecialChars.replace(/\s+/g, "-");

    return stringWithHyphens.toLowerCase();
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!dateTime) {
        setError("Please select a date and time")
        return
      }

      const token = localStorage.getItem('userToken')
      if (!token) {
        toast.error('Please log in to create an event')
        return
      }

      // First upload the image if one is selected
      let imageUrl = ""
      if (image) {
        const formData = new FormData()
        formData.append('file', image)
        
        const uploadResponse = await RequestHandler(
          `${process.env.REACT_APP_API_URL}upload`,
          'POST',
          formData,
          { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        )

        if (uploadResponse?.success) {
          imageUrl = uploadResponse.data.fileUrl
        } else {
          throw new Error('Failed to upload image')
        }
      }

      // Create the event
      const eventData = {
        name,
        description,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        imageUrl,
        eventDate: dateTime.toISOString(),
        eventTypeId: eventType,
        locationId: city,
        cityId: city,
        isActive: active,
        eventLink,
        mapLink
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}events`,
        'POST',
        eventData,
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
      setLoading(false)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const newStateList = [];
    cities.forEach((cityItem) => {
      if (!newStateList.some(state => state.id === cityItem.state.id)) {
        newStateList.push(cityItem.state);
      }
    });
    setStateList(newStateList);
  }, [cities]);

  useEffect(() => {
    if (!stateSelector) {
      setCityList(cities);
    } else {
      const newCityList = cities.filter(city => city.stateId === stateSelector);
      if (newCityList.length === 0) {
        setCity("");
      }
      setCityList(newCityList);
    }
  }, [stateSelector, cities]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        mt: 1,
        borderRadius: 2,
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <form
        onSubmit={handleSubmit}
      >

        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={dateTime}
                label="Date Time"
                onChange={(value) => setDateTime(value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    size: "small",
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </LocalizationProvider>
          
          </Grid>

          <Grid item xs={12} md={6}>
             <TextField
              fullWidth
              required
              label="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
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
              required
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              size="small"
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Event Link"
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Map Link"
              value={mapLink}
              onChange={(e) => setMapLink(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Numbers />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              required
              label="Event Type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Category />
                  </InputAdornment>
                ),
              }}
            >
              {eventTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              required
              label="State"
              value={stateSelector}
              onChange={(e) => setStateSelector(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Public />
                  </InputAdornment>
                ),
              }}
            >
              {stateList.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              required
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCity />
                  </InputAdornment>
                ),
              }}
            >
              {cityList.map((cityItem) => (
                <MenuItem key={cityItem.id} value={cityItem.id}>
                  {cityItem.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Event Image
            </Typography>
            <Box
              sx={{
                border: "1px dashed #ccc",
                p: { xs: 1, sm: 2 },
                borderRadius: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
              }}
            >
              <ImageIcon color="action" />
              <input
                type = "file"
                id = "event-image"
                accept="image/*"
                required
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
          <FormControlLabel
              control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} color="primary" />}
              label="Active"
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                borderRadius: 28,
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1, sm: 1.5 },
                fontWeight: "bold",
                maxWidth: { sm: "300px" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Event"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default AddEventForm
