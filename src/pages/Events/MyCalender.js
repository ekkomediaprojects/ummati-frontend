import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Box, Typography, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// Create a localizer for moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const [view, setView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Validate and format events
  const validEvents = events.filter(event => {
    return event && 
           event.start && 
           event.end && 
           (event.title || event.name) && 
           !isNaN(new Date(event.start).getTime()) && 
           !isNaN(new Date(event.end).getTime());
  }).map(event => ({
    ...event,
    title: event.name || event.title,
    externalUrls: event.externalUrls || {}
  })).reverse(); // Simply reverse the array order

  // Custom event sorting for list view
  const customSort = (events) => {
    return events; // Return events as is since we already reversed them
  };

  // Custom Event component
  const EventComponent = ({ event }) => {
    // Styles for different views
    const getEventStyle = () => {
      switch (view) {
        case "day":
          return {
            backgroundColor: "#D9F4DA",
            borderRadius: "5px",
            width: "200px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "black",
            minHeight: "80px",
          };
        case "week":
          return {
            backgroundColor: "#D9F4DA",
            borderRadius: "5px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "black",
            minHeight: "60px",
          };
        case "month":
          return {
            backgroundColor: "#D9F4DA",
            borderRadius: "5px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "black",
            minHeight: "40px",
          };
        default:
          return {};
      }
    };

    // Event Title Component
    const EventTitle = () => (
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {event.title || event.name || "Untitled Event"}
      </Typography>
    );

    // Event Time Component
    const EventTime = () => {
      try {
        const startTime = moment(event.start).format("h:mm a");
        const endTime = moment(event.end).format("h:mm a");
        return (
          <Typography
            variant="body2"
            sx={{
              marginTop: "8px",
              fontFamily: "Inter",
              color: "#444",
            }}
          >
            {startTime} - {endTime}
          </Typography>
        );
      } catch (error) {
        console.error("Error formatting event time:", error);
        return null;
      }
    };

    // Render Event based on view type
    return (
      <Box sx={getEventStyle()}>
        {/* Image in Day and Week View */}
        {(view === "day" || view === "week") && event.image && (
          <Box sx={{ marginTop: "8px" }}>
            <img
              src={event.image}
              alt={event.title || event.name || "Event"}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "5px",
              }}
            />
          </Box>
        )}

        {/* Render Title */}
        <EventTitle />

        {/* Render Description in Day View Only */}
        {(view === "day" || view === "week") && event.description && (
          <Typography
            variant="body2"
            sx={{
              marginTop: "4px",
              gap: "4px",
              fontFamily: "Inter",
              color: "#444",
            }}
          >
            {event.description}
          </Typography>
        )}
        <EventTime />
      </Box>
    );
  };

  // Event Modal Component
  const EventModal = ({ event, open, onClose }) => {
    const [linkDialogOpen, setLinkDialogOpen] = useState(false);

    if (!event) return null;

    const handleLinkClick = () => {
      console.log('Button clicked');
      console.log('Event data:', event);
      console.log('External URLs:', event.externalUrls);
      
      const availableLinks = [];
      if (event.externalUrls?.eventbrite) {
        console.log('Found Eventbrite link:', event.externalUrls.eventbrite);
        availableLinks.push({ name: 'Eventbrite', url: event.externalUrls.eventbrite });
      }
      if (event.externalUrls?.zeffy) {
        console.log('Found Zeffy link:', event.externalUrls.zeffy);
        availableLinks.push({ name: 'Zeffy', url: event.externalUrls.zeffy });
      }
      if (event.externalUrls?.meetup) {
        console.log('Found Meetup link:', event.externalUrls.meetup);
        availableLinks.push({ name: 'Meetup', url: event.externalUrls.meetup });
      }
      if (event.externalUrls?.other) {
        console.log('Found Other link:', event.externalUrls.other);
        availableLinks.push({ name: 'Other', url: event.externalUrls.other });
      }

      console.log('Available links:', availableLinks);

      if (availableLinks.length === 1) {
        console.log('Opening single link:', availableLinks[0].url);
        window.open(availableLinks[0].url, '_blank', 'noopener,noreferrer');
      } else if (availableLinks.length > 1) {
        console.log('Opening link selection dialog');
        setLinkDialogOpen(true);
      } else {
        console.log('No links available');
      }
    };

    const handleLinkSelect = (url) => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setLinkDialogOpen(false);
    };

    const hasAnyLinks = event.externalUrls?.eventbrite || 
                       event.externalUrls?.zeffy || 
                       event.externalUrls?.meetup || 
                       event.externalUrls?.other;

    console.log('Has any links:', hasAnyLinks);

    return (
      <>
        <Dialog 
          open={open} 
          onClose={onClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              width: '800px',
              maxWidth: '90vw',
              maxHeight: '90vh'
            }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            {event.image && (
              <img
                src={event.image}
                alt={event.title || event.name || "Event"}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
              />
            )}
            <IconButton 
              onClick={onClose} 
              size="small"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <Typography 
              sx={{
                color: 'black',
                fontSize: 20,
                fontFamily: 'Poppins',
                fontWeight: '600',
                wordWrap: 'break-word',
                textAlign: 'center'
              }}
            >
              {event.title || event.name || "Untitled Event"}
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              gap: '8px',
              width: '100%',
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
                <Typography 
                  sx={{
                    color: '#5A4283',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    wordWrap: 'break-word',
                    minWidth: '80px'
                  }}
                >
                  Date:
                </Typography>
                <Typography 
                  sx={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                  }}
                >
                  {moment(event.start).format('MMMM D, YYYY')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
                <Typography 
                  sx={{
                    color: '#5A4283',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    wordWrap: 'break-word',
                    minWidth: '80px'
                  }}
                >
                  Time:
                </Typography>
                <Typography 
                  sx={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                  }}
                >
                  {moment(event.start).format('h:mm a')} - {moment(event.end).format('h:mm a')}
                </Typography>
              </Box>

              {event.venue && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
                    <Typography 
                      sx={{
                        color: '#5A4283',
                        fontSize: 14,
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        wordWrap: 'break-word',
                        minWidth: '80px'
                      }}
                    >
                      Location:
                    </Typography>
                    <Typography 
                      sx={{
                        color: 'black',
                        fontSize: 14,
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        wordWrap: 'break-word'
                      }}
                    >
                      {event.venue.name}
                    </Typography>
                  </Box>
                  {event.venue.addressLine1 && (
                    <Typography 
                      sx={{
                        color: 'black',
                        fontSize: 14,
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        wordWrap: 'break-word',
                        marginLeft: '84px'
                      }}
                    >
                      {event.venue.addressLine1}
                    </Typography>
                  )}
                  {event.venue.addressLine2 && (
                    <Typography 
                      sx={{
                        color: 'black',
                        fontSize: 14,
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        wordWrap: 'break-word',
                        marginLeft: '84px'
                      }}
                    >
                      {event.venue.addressLine2}
                    </Typography>
                  )}
                  <Typography 
                    sx={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Poppins',
                      fontWeight: '400',
                      wordWrap: 'break-word',
                      marginLeft: '84px'
                    }}
                  >
                    {event.venue.city && `${event.venue.city}`}
                    {event.venue.state && `, ${event.venue.state}`}
                    {event.venue.postalCode && ` ${event.venue.postalCode}`}
                  </Typography>
                </Box>
              )}
            </Box>

            {event.description && (
              <Typography 
                sx={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  wordWrap: 'break-word',
                  textAlign: 'center'
                }}
              >
                {event.description}
              </Typography>
            )}

            {hasAnyLinks && (
              <Box 
                component="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLinkClick();
                }}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  width: '100%',
                  height: '48px',
                  background: '#78B27B',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  '&:hover': {
                    background: '#6a9e6d'
                  }
                }}
              >
                <Typography 
                  sx={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Quicksand',
                    fontWeight: '700',
                    wordWrap: 'break-word'
                  }}
                >
                  Buy Ticket
                </Typography>
              </Box>
            )}
          </Box>
        </Dialog>

        {/* Link Selection Dialog */}
        <Dialog
          open={linkDialogOpen}
          onClose={() => setLinkDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
            Select Ticket Provider
          </DialogTitle>
          <DialogContent>
            <List>
              {event.externalUrls?.eventbrite && (
                <ListItem 
                  button 
                  onClick={() => handleLinkSelect(event.externalUrls.eventbrite)}
                  sx={{
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary="Eventbrite"
                    primaryTypographyProps={{
                      fontFamily: 'Poppins',
                      fontWeight: '500'
                    }}
                  />
                </ListItem>
              )}
              {event.externalUrls?.zeffy && (
                <ListItem 
                  button 
                  onClick={() => handleLinkSelect(event.externalUrls.zeffy)}
                  sx={{
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary="Zeffy"
                    primaryTypographyProps={{
                      fontFamily: 'Poppins',
                      fontWeight: '500'
                    }}
                  />
                </ListItem>
              )}
              {event.externalUrls?.meetup && (
                <ListItem 
                  button 
                  onClick={() => handleLinkSelect(event.externalUrls.meetup)}
                  sx={{
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary="Meetup"
                    primaryTypographyProps={{
                      fontFamily: 'Poppins',
                      fontWeight: '500'
                    }}
                  />
                </ListItem>
              )}
              {event.externalUrls?.other && (
                <ListItem 
                  button 
                  onClick={() => handleLinkSelect(event.externalUrls.other)}
                  sx={{
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary="Other"
                    primaryTypographyProps={{
                      fontFamily: 'Poppins',
                      fontWeight: '500'
                    }}
                  />
                </ListItem>
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setLinkDialogOpen(false)}
              sx={{
                fontFamily: 'Poppins',
                color: '#5A4283'
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <Box sx={{ padding: "16px" }}>
      {validEvents.length > 0 ? (
        <>
          <Calendar
            localizer={localizer}
            events={view === "month" ? [...validEvents].reverse() : validEvents}
            defaultView={view}
            views={["day", "week", "month"]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onView={(newView) => setView(newView)}
            onSelectEvent={(event) => setSelectedEvent(event)}
            eventPropGetter={() => ({
              style: {
                backgroundColor: "#D9F4DA",
                color: "black",
                borderRadius: "5px",
              },
            })}
            components={{
              event: EventComponent,
            }}
            min={new Date(0, 0, 0, 6, 0, 0)}
            max={new Date(0, 0, 0, 23, 59, 59)}
          />
          <EventModal 
            event={selectedEvent}
            open={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </>
      ) : (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: 600,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <Typography variant="h6" color="text.secondary">
            No events to display
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MyCalendar;