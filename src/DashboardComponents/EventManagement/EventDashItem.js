"use client";
import React from "react";
import { Link, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";
import RequestHandler from "../../../utils/RequestHandler";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || 'https://api.ummaticommunity.com';

const EventDashItem = ({ event, onEventDeleted }) => {
  const [date, setDate] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // setDate(new Date(event.eventDate));
  }, []);

  const handleDeleteClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Please log in to delete event');
      }

      const response = await RequestHandler(
        `${API_URL}/admin/events/${event._id}`,
        'DELETE',
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (response.success) {
        toast.success('Event deleted successfully');
        if (onEventDeleted) {
          onEventDeleted(event._id);
        }
      } else {
        throw new Error(response.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Delete event error:', error);
      toast.error(error.message || 'Error deleting event');
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="relative shadow-lg rounded-lg flex flex-col justify-center items-center text-center py-5 px-5">
    <Link
          onClick={() => navigate("/dashboard/eventmanagement/single/" + event.id)}
          className="w-full h-full"
    >
      <img
        className="rounded-lg"
        alt="Event Image"
        width={300}
        height={300}
        src={event.imageUrl}
      />
      <div>{event.name}</div>
      <div>{date}</div>
    </Link>
        <IconButton
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{event.name}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventDashItem;
