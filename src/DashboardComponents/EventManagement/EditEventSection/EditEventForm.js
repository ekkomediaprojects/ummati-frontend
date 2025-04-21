"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

// Material UI components
import {
  TextField,
  Button as MuiButton,
  Grid,
  Typography,
  MenuItem,
  FormControlLabel,
  Switch as MuiSwitch,
  Paper,
  Box,
  InputAdornment,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Icons
import {
  CalendarMonth,
  Title,
  Link as LinkIcon,
  LocationOn,
  Description,
  Numbers,
  AttachMoney,
  Category,
  LocationCity,
  Public,
  Image as ImageIcon,
  Delete as DeleteIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";

const EditEventForm = ({
  eventData,
  eventLocations,
  eventTypes,
  cities,
  states,
}) => {
  const [cityList, setCityList] = useState(cities);
  const [stateSelector, setStateSelector] = useState(cities[0]?.state?.id);
  const [stateList, setStateList] = useState(states);
  const [event, setEvent] = useState(eventData);
  const [dateTime, setDateTime] = useState(dayjs(eventData?.eventDate));
  const [name, setName] = useState(eventData?.name);
  const [eventLink, setEventLink] = useState(eventData?.eventLink);
  const [mapLink, setMapLink] = useState(eventData?.mapLink);
  const [description, setDescription] = useState(eventData?.description);
  const [quantity, setQuantity] = useState(
    eventData?.quantity ? eventData?.quantity : 0
  );
  const [price, setPrice] = useState(eventData?.price);
  const [eventType, setEventType] = useState(eventData?.eventTypeId);
  const [city, setCity] = useState(eventData?.cityId);
  const [active, setActive] = useState(eventData?.isActive);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getEventData = async () => {
    // API call to get event data (commented out in original code)
  };

  useEffect(() => {
    getEventData();
    const newStateList = [];
    cities.map((cityItem) => {
      let alreadyAdded = false;
      newStateList.map((newState) => {
        if (newState.id === cityItem.state.id) {
          alreadyAdded = true;
        }
      });
      if (!alreadyAdded) {
        newStateList.push(cityItem.state);
      }
    });
    setStateList(newStateList);
  }, []);

  useEffect(() => {
    if (stateSelector === "") {
      setCityList(cities);
    } else {
      const newCityList = [];
      cityList.map((cityitem) => {
        if (cityitem.stateId === stateSelector) {
          newCityList.push(cityitem);
        }
      });
      if (newCityList.length <= 0) {
        setCity("");
      }
      setCityList(newCityList);
    }
  }, [stateSelector]);

  useEffect(() => {
    if (event) {
      setDateTime(dayjs(event.eventDate));
      setName(event.name);
      setEventLink(event.eventLink);
      setMapLink(event.mapLink);
      setDescription(event.description);
      setQuantity(event.quantity ? event.quantity : 0);
      setPrice(event.price);
      setEventType(event.eventTypeId);
      setCity(event.cityId);
      setActive(event.isActive);
    }
  }, [event]);

  async function handleSubmit(e) {
    e.preventDefault();
    // Form submission logic (commented out in original code)
  }

  async function handleDeleteEvent(id) {
    const resp = await axios.get("/api/events/delete/" + id);
    if (resp.data.status === 200) {
      setIsLoading(false);
      navigate("/dashboard/eventmanagement");
    } else {
      setError("Could Not delete");
      setIsLoading(false);
    }
  }

  function replaceSpecialCharsAndSpaces(inputString) {
    // Replace special characters with blanks
    const stringWithoutSpecialChars = inputString.replace(/[^\w\s-]/g, " ");

    // Replace spaces with hyphens
    const stringWithHyphens = stringWithoutSpecialChars.replace(/\s+/g, "-");

    return stringWithHyphens.toLowerCase();
  }

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
        onSubmit={(e) => {
          setIsLoading(true);
          handleSubmit(e);
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={dateTime}
                label="Date and Time"
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
              rows={2}
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
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
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
              type="number"
              label="Price"
              value={price}
              onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
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
              {eventTypes.map((type, index) => (
                <MenuItem key={index} value={type.id}>
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
              {stateList.map((state, index) => (
                <MenuItem key={index} value={state.id}>
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
              {cityList.map((location, index) => (
                <MenuItem key={index} value={location.id}>
                  {location.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Image
            </Typography>
            <Box
              sx={{
                border: "1px dashed #ccc",
                p: { xs: 1, sm: 2 },
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ImageIcon color="action" />
                <Typography variant="body2">
                  Current Image:{" "}
                  <MuiLink href={event.imageUrl} target="_blank" rel="noopener">
                    View Original Image
                  </MuiLink>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 2,
                }}
              >
                <Typography variant="body2">
                  Upload New Image (optional):
                </Typography>
                <input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  style={{ width: "100%" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <MuiSwitch
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  color="primary"
                />
              }
              label="Active"
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
              }}
            >
              <MuiButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                startIcon={<UpdateIcon />}
                sx={{
                  borderRadius: 28,
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 1, sm: 1.5 },
                  fontWeight: "bold",
                  flex: { xs: "1", sm: "initial" },
                }}
              >
                {isLoading ? "Updating..." : "Update Event"}
              </MuiButton>
              <MuiButton
                type="button"
                variant="contained"
                color="error"
                disabled={isLoading}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setIsLoading(true);
                  handleDeleteEvent(event.id);
                }}
                sx={{
                  borderRadius: 28,
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 1, sm: 1.5 },
                  fontWeight: "bold",
                  flex: { xs: "1", sm: "initial" },
                }}
              >
                {isLoading ? "Deleting..." : "Delete Event"}
              </MuiButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditEventForm;
