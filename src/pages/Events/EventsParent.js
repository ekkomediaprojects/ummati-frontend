import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bannerImage from "../../assets/images/Events/banner.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MyCalender from "./MyCalender";
import EventPopup from "./EventPopup";
import FiltersAndSort from "./FilterAndSort";
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  useMediaQuery,
  Grid2,
} from "@mui/material";

const EventsParent = () => {
  const [showCities, setShowCities] = useState(false);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // Store all events for filtering/sorting
  const [listView, setListView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if screen size is less than 600px
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://api.ummaticommunity.com/events");
        const fetchedEvents = response.data.map((event) => ({
          ...event,
          title: event.name || event.title, // Use name if title is not available
          description: event.description,
          start: new Date(event.start), // Convert dates to JS Date objects
          end: new Date(event.end),
          chapter: `${event.venue?.city?.toLowerCase() || 'unknown'}-${event.venue?.state?.toLowerCase() || 'unknown'}`, // Create chapter for filtering with fallback
          image: event.imageUrl || "default-placeholder.png", // Use imageUrl or a fallback image
        }));
        setEvents(fetchedEvents); // Set events for rendering
        setAllEvents(fetchedEvents); // Keep all events for filtering/sorting
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, []);  
  
  const handleFilterChange = (selectedFilters) => {
    if (selectedFilters.length === 0) {
      setEvents(allEvents); // Use all events from API
      return;
    }
    const filteredRecords = allEvents.filter((event) =>
      selectedFilters.includes(event.chapter)
    );
    setEvents(filteredRecords);
  };
  

  const handleSortingChange = (selectedSorting) => {
    const now = moment();
    let sortedData = [];
  
    switch (selectedSorting) {
      case "date-new-to-old":
        sortedData = [...allEvents].sort((a, b) =>
          moment(b.start).isBefore(moment(a.start)) ? -1 : 1
        );
        break;
  
      case "date-old-to-new":
        sortedData = [...allEvents].sort((a, b) =>
          moment(a.start).isBefore(moment(b.start)) ? -1 : 1
        );
        break;
  
      case "upcoming-events":
        sortedData = allEvents.filter((event) =>
          moment(event.start).isAfter(now)
        );
        break;
  
      case "past-events":
        sortedData = allEvents.filter((event) =>
          moment(event.start).isBefore(now)
        );
        break;
  
      case "all-events":
        sortedData = allEvents; // No filter, return all events
        break;
  
      default:
        sortedData = allEvents;
    }
  
    setEvents(sortedData);
  };  

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };  

  return (
    <Box sx={{ backgroundColor: "#F7F5EF", minHeight: "100vh" }}>
      
      <Box
      sx={{
        width: "100%",
        height: { xs: "200px", sm: "250px", md: "300px" },
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color:"#3D3D3C",
          fontFamily: "Caprasimo",
          fontSize: { xs: "32px", md: "40px" },
          position: "absolute",
          bottom: "10%",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Events
      </Typography>
    </Box>

      {/* Toggle View Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          width: "100%",
          padding: isMobile ? "0px" : "20px",
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "90%", sm: "60%", md: "500px" },
              marginLeft: "auto",
              padding: "4px",
              gap: "10px",
              border: "1px solid #ddd",
              borderRadius: "70px",
              backgroundColor: "#FFF",
            }}
          >
            <Button
              sx={{
                fontFamily: "Quicksand",
                fontWeight: "700",
                backgroundColor: listView ? "#78B27B" : "#FFFF",
                gap: "10px",
                color: listView ? "#FFF" : "#000",
                borderRadius: "70px",
                textTransform: "none",
                width: "237.5px",
                whiteSpace: "nowrap",
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                paddingRight: "2px",
                paddingLeft: "2px",
              }}
              onClick={() => setListView(true)}
            >
              List View
            </Button>
            <Button
              sx={{
                fontFamily: "Quicksand",
                fontWeight: "700",
                gap: "10px",
                backgroundColor: !listView ? "#78B27B" : "#FFFF",
                color: !listView ? "#FFF" : "#000",
                borderRadius: "70px",
                textTransform: "none",
                width: "237.5px",
                whiteSpace: "nowrap",
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                paddingRight: "2px",
                paddingLeft: "2px",
              }}
              onClick={() => setListView(false)}
            >
              Calendar View
            </Button>
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: isMobile ? "0px" : "32px",
        }}
      >
        {/* Sidebar - Hidden on Mobile */}
        {!isMobile && (
          <Box
            sx={{
              width: { xs: "100%", md: "20%" },
              marginRight: { md: "16px" },
              marginBottom: { xs: "16px", md: "0" },
              backgroundColor: "#5A4283",
              gap: "32px",
              borderRadius: "8px",
              padding: "16px",
              height: 300,
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#A56F99",
                borderRadius: "4px",
                border: "2px solid #FFF",
              },
              "&::-webkit-scrollbar-track": {
                background: "#B99FB2",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-corner": {
                background: "#5A4283",
              },
            }}
          >
            {/* State Section */}
            <Box
              sx={{
                border: "1px solid #5A4283",
                backgroundColor: "#6D5397",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#FFFFFF",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                State
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                  />
                }
                label="Texas"
                sx={{
                  fontFamily: "Poppins",
                  color: "#FFFFFF",
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                  />
                }
                label="Arkansas"
                sx={{
                  fontFamily: "Poppins",
                  color: "#FFFFFF",
                }}
              />
            </Box>

            {/* City Section */}
            <Box
              sx={{
                border: "1px solid #5A4283",
                backgroundColor: "#6D5397",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                display="flex"
                center
                justifyContent="space-between"
                alignItems="center"
                onClick={() => setShowCities((prev) => !prev)} // Toggle visibility
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    color: "#FFFFFF",
                    fontWeight: "600",
                  }}
                >
                  City
                </Typography>
                <IconButton sx={{ color: "white" }}>
                  {showCities ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              {/* Conditionally Render City Checkboxes */}
              {showCities && (
                <Box mt={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Dallas"
                    sx={{
                      fontFamily: "Poppins",
                      color: "#FFFFFF",
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Houston"
                    sx={{
                      fontFamily: "Poppins",
                      color: "#FFFFFF",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Main Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            backgroundColor: "C4BAA2",
            minHeight: "auto",
            overflowY: "auto",
            overflowX: "hidden",
            // padding: "10px",
            border: !listView ? "1px solid #C4BAA2" : undefined,
          }}
        >
          {isMobile ? (
            <Box>
              <FiltersAndSort
                onFilterChange={handleFilterChange}
                onSortingChange={handleSortingChange}
              />
              {events.map((event, index) => {
                const isEventPassed = moment(event.start).isBefore(moment()); // Check if event has passed

                return (
                  <Box
                    key={index}
                    sx={{
                      width: { xs: "100%", md: "80%" },
                      backgroundColor: "white",
                      border: "1px solid #C4BAA2",
                      marginBottom: "10px" ,
                      padding: "20px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEventClick(event)}
                  >
                    {/* "Event Passed" Text */}
                    {isEventPassed && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontFamily: "poppins",
                          fontWeight: "800",
                          fontSize: "32px",
                          color: "#A31B1E",
                          zIndex: 2, // Ensure the message stays on top
                          lineHeight: "48px",
                        }}
                      >
                        Event Passed
                      </Box>
                    )}

                    {/* Content inside the Box (image, title, description, etc.) */}
                    <Box sx={{ opacity: isEventPassed ? 0.2 : 1 }}>
                      <img
                        src={event.image || "default-placeholder.png"}
                        alt={event.title}
                        style={{
                          width: isMobile ? "347px" : "100%",
                          height: isMobile ? "102px" : "auto",
                          borderRadius: isMobile ? "5px" : "4px",
                          marginBottom: "8px",
                          position: isMobile ? "relative" : "static",
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Quicksand",
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#5A4283",
                          lineHeight: "25px",
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "15px",
                          fontWeight: "400",
                          color: "#545454",
                          lineHeight: "22.4px",
                        }}
                      >
                        {event.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#545454",
                          lineHeight: "24px",
                        }}
                      >
                        {moment(event.start).format("LL")}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#545454",
                            lineHeight: "20px",
                          }}
                        >
                          {moment(event.start).format("LT")}
                        </Typography>

                        <Button
                          sx={{
                            fontFamily: "Quicksand",
                            fontWeight: "700",
                            backgroundColor: "#78B27B",
                            gap: "10px",
                            borderRadius: "40px",
                            textTransform: "none",
                            color: "white",
                            width: "117px",
                            fontSize: "15px",
                            height: "28px",
                          }}
                          onClick={() => "None"}
                        >
                          Buy Tickets
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : !isMobile && listView ? (
            // List view for non-mobile
            <Box
              sx={{
                backgroundColor: "C4BAA2",
                height: 600,
              }}
            >
              {/* {Events Map} */}
              {[...events].reverse().map((event, index) => {
                const isEventPassed = moment(event.start).isBefore(moment()); // Check if event has passed

                return (
                  <Grid2
                    key={index}
                    container
                    spacing={2}
                    sx={{
                      marginBottom: "16px",
                      padding: "15px",
                      backgroundColor: "white",
                      border: "1px solid #C4BAA2",
                      justifyContent: "space-between",
                      flexDirection: { xs: "column", lg: "row" },
                      alignItems: "stretch",
                      position: "relative", // Needed to position the "Event Passed" message
                      cursor: "pointer",
                    }}
                    onClick={() => handleEventClick(event)}
                  >
                    {/* Left side - Text */}
                    <Grid2
                      item
                      xs={12}
                      lg="auto"
                      sx={{
                        flexBasis: { xs: "100%", lg: "70%" },
                        maxWidth: { xs: "100%", lg: "1000px" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        order: { xs: 2, lg: 1 },
                        opacity: isEventPassed ? 0.2 : 1, // Apply opacity to content only
                      }}
                    >
                      {event?.title && (
                        <Typography
                          sx={{
                            fontFamily: "Quicksand",
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#5A4283",
                            lineHeight: "25px",
                            marginBottom: "8px",
                          }}
                        >
                          {event.title}
                        </Typography>
                      )}
                      {event?.description && (
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "400",
                            color: "#545454",
                            lineHeight: "22.4px",
                            marginBottom: "8px",
                          }}
                        >
                          {event.description}
                        </Typography>
                      )}
                      {event?.start && (
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#545454",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}
                        >
                          {moment(event.start).format("LL")} {/* Date */}
                        </Typography>
                      )}
                      {event?.start && (
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#545454",
                            lineHeight: "20px",
                          }}
                        >
                          {moment(event.start).format("LT")} {/* Time */}
                        </Typography>
                      )}
                      <Button
                        sx={{
                          fontFamily: "Quicksand",
                          fontWeight: "700",
                          backgroundColor: "#78B27B",
                          gap: "10px",
                          borderRadius: "40px",
                          textTransform: "none",
                          color: "white",
                          width: "117px",
                          fontSize: "15px",
                          height: "28px",
                          marginTop: "20px",
                        }}
                        onClick={() => "None"}
                      >
                        Buy Tickets
                      </Button>
                    </Grid2>

                    {/* Right side - Image */}
                    <Grid2
                      item
                      xs={12}
                      lg="auto"
                      sx={{
                        flexBasis: { xs: "100%", lg: "30%" },
                        maxWidth: { xs: "100%", lg: "300px" },
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        order: { xs: 1, lg: 2 },
                        opacity: isEventPassed ? 0.2 : 1, // Apply opacity to content only
                      }}
                    >
                      {event.image && (
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "500px",
                          }}
                        >
                          <img
                            src={event.image}
                            alt={event.title}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      )}
                    </Grid2>

                    {/* "Event Passed" Text */}
                    {isEventPassed && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontFamily: "poppins",
                          fontWeight: "800",
                          fontSize: "32px",
                          color: "#A31B1E",
                          zIndex: 2, // Ensure the message stays on top
                          lineHeight: "48px",
                        }}
                      >
                        Event Passed
                      </Box>
                    )}
                  </Grid2>
                );
              })}
            </Box>
          ) : (
            // Calendar view for non-mobile and not list view
            <Box
              sx={{
                padding: "16px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MyCalender 
                events={events} 
                onEventClick={handleEventClick}
              />
            </Box>
          )}
        </Box>
      </Box>
      
      {/* Event Popup */}
      <EventPopup
        event={selectedEvent}
        open={!!selectedEvent}
        onClose={handleClosePopup}
      />
    </Box>
  );
};

export default EventsParent;