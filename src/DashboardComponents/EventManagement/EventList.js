"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  CircularProgress
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const EventList = ({
  events,
  refreshEventList,
}) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (eventId) => {
    navigate(`/dashboard/event-management/edit/${eventId}`);
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to delete event');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}events/${selectedEvent.id}`,
        'DELETE',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        toast.success('Event deleted successfully');
        refreshEventList();
      } else {
        throw new Error(response?.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.message || 'Error deleting event');
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleView = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt={event.name}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'cover',
                          borderRadius: 4
                        }}
                      />
                    )}
                    <Typography variant="body2">{event.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{formatDate(event.eventDate)}</TableCell>
                <TableCell>{event.city?.name || 'N/A'}</TableCell>
                <TableCell>${event.price}</TableCell>
                <TableCell>
                  <Chip
                    label={event.isActive ? 'Active' : 'Inactive'}
                    color={event.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleView(event.id)}
                    title="View Event"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(event.id)}
                    title="Edit Event"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedEvent(event);
                      setDeleteDialogOpen(true);
                    }}
                    title="Delete Event"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the event "{selectedEvent?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventList;
