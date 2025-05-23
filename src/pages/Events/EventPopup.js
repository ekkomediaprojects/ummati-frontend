import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';

const EventPopup = ({ event, open, onClose }) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  if (!event) return null;

  const handleLinkClick = () => {
    const availableLinks = [];
    if (event.externalUrls?.eventbrite) {
      availableLinks.push({ name: 'Eventbrite', url: event.externalUrls.eventbrite });
    }
    if (event.externalUrls?.zeffy) {
      availableLinks.push({ name: 'Zeffy', url: event.externalUrls.zeffy });
    }
    if (event.externalUrls?.meetup) {
      availableLinks.push({ name: 'Meetup', url: event.externalUrls.meetup });
    }
    if (event.externalUrls?.other) {
      availableLinks.push({ name: 'Other', url: event.externalUrls.other });
    }

    if (availableLinks.length === 1) {
      window.open(availableLinks[0].url, '_blank', 'noopener,noreferrer');
    } else if (availableLinks.length > 1) {
      setLinkDialogOpen(true);
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

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            backgroundColor: '#F7F5EF',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogContent sx={{ padding: 0, position: 'relative' }}>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#5A4283',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Event Image */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '200px', sm: '300px' },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={event.image || 'default-placeholder.png'}
              alt={event.title || event.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Event Content */}
          <Box sx={{ padding: { xs: 2, sm: 3 } }}>
            {/* Title */}
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Quicksand',
                fontWeight: 700,
                color: '#5A4283',
                marginBottom: 2,
              }}
            >
              {event.title || event.name}
            </Typography>

            {/* Date and Time */}
            <Grid container spacing={2} sx={{ marginBottom: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon sx={{ color: '#78B27B' }} />
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#545454',
                      fontSize: '1rem',
                    }}
                  >
                    {moment(event.start).format('MMMM D, YYYY')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon sx={{ color: '#78B27B' }} />
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#545454',
                      fontSize: '1rem',
                    }}
                  >
                    {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Location */}
            {event.venue && (
              <Box sx={{ marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#78B27B', marginTop: 0.5 }} />
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        color: '#5A4283',
                        fontSize: '1.1rem',
                      }}
                    >
                      {event.venue.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Poppins',
                        color: '#545454',
                        fontSize: '0.9rem',
                      }}
                    >
                      {event.venue.addressLine1}
                      {event.venue.city && `, ${event.venue.city}`}
                      {event.venue.state && `, ${event.venue.state}`}
                      {event.venue.postalCode && ` ${event.venue.postalCode}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Description */}
            {event.description && (
              <Box sx={{ marginBottom: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    color: '#545454',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                  }}
                >
                  {event.description}
                </Typography>
              </Box>
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                marginTop: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  fontFamily: 'Quicksand',
                  fontWeight: 600,
                  color: '#5A4283',
                  borderColor: '#5A4283',
                  '&:hover': {
                    borderColor: '#5A4283',
                    backgroundColor: 'rgba(90, 66, 131, 0.04)',
                  },
                }}
              >
                Close
              </Button>
              {hasAnyLinks && (
                <Button
                  variant="contained"
                  onClick={handleLinkClick}
                  sx={{
                    fontFamily: 'Quicksand',
                    fontWeight: 600,
                    backgroundColor: '#78B27B',
                    '&:hover': {
                      backgroundColor: '#6A9F6D',
                    },
                  }}
                >
                  Buy Tickets
                </Button>
              )}
            </Box>
          </Box>
        </DialogContent>
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

export default EventPopup; 