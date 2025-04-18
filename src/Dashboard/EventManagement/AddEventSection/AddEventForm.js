"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"

// Material UI components
import {TextField,Button,Grid,Typography,MenuItem,FormControlLabel,Switch,Paper,Box,InputAdornment,Divider} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {CalendarMonth,Title,Link as LinkIcon,LocationOn,Description,Numbers,AttachMoney,Category,LocationCity,Public,Image as ImageIcon} from "@mui/icons-material"
const AddEventForm = ({ cities, states, eventTypes, setIsLoading }) => {
  const router = useNavigate()
  const [dateTime, setDateTime] = useState(dayjs(new Date()))
  const [name, setName] = useState("")
  const [eventLink, setEventLink] = useState("")
  const [mapLink, setMapLink] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(1)
  const [eventType, setEventType] = useState(eventTypes[0].id)
  const [active, setActive] = useState(true)
  const [image, setImage] = useState(null)
  const [city, setCity] = useState("")
  const [stateSelector, setStateSelector] = useState(cities[0].state.id)
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
   // if (dateTime === null) {
    //   setError("Please Enter a Date and Time");
    //   return;
    // } else {
    //   setError("");

    //   const slug = replaceSpecialCharsAndSpaces(name);
    //   let imgUrl = "";
    //   if (image) {
    //     // imgUrl = await uploadImage(image);
    //   } else {
    //     imgUrl = "";
    //   }
    //   if (imgUrl != "") {
    //     const event = await createEvent(
    //       slug,
    //       city,
    //       eventLink,
    //       mapLink,
    //       name,
    //       description,
    //       quantity,
    //       price,
    //       imgUrl,
    //       dateTime.toDate(),
    //       eventType
    //     );
    //     if (event === null) {
    //       setError("There was an issue creating the Event");
    //       setisLoading(false);
    //       return;
    //     } else {
    //       console.log("event.slug", event.slug);
    //       setisLoading(false);
    //       router.push("/events/" + event.slug);
    //     }
    //   } else {
    //     setError("There was an error uploading an image");
    //     setIsLoading(false);
    //   }
    // }
  };

  useEffect(() => {
    let newStateList= [];
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
      let newCityList= [];
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
          setLoading(true)
          handleSubmit(e)
        }}
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

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
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
              {cityList.map((cityItem, index) => (
                <MenuItem key={index} value={cityItem.id}>
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
              {loading ? "Adding Event..." : "Add Event"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default AddEventForm
