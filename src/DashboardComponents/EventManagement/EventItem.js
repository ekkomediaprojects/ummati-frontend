"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || 'https://api.ummaticommunity.com';

const EventItem = ({ event, onEventDeleted }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/event-management/edit/${event._id}`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('=== Delete Click Debug ===');
    console.log('1. Event ID:', event._id);
    console.log('2. Event Name:', event.name);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    console.log('=== Delete Confirm Debug ===');
    console.log('1. Starting delete process');
    
    try {
      setDeleting(true);
      const token = localStorage.getItem('userToken');
      console.log('2. Token check:', {
        hasToken: !!token,
        tokenLength: token?.length,
        tokenStart: token?.substring(0, 20) + '...'
      });

      if (!token) {
        throw new Error('Please log in to delete event');
      }

      const requestUrl = `${API_URL}/admin/events/${event._id}`;
      console.log('3. Request details:', {
        url: requestUrl,
        method: 'DELETE',
        eventId: event._id,
        apiUrl: API_URL
      });

      const response = await RequestHandler(
        requestUrl,
        'DELETE',
        null,
        { 
          Authorization: `Bearer ${token}`
        }
      );

      console.log('4. Response received:', {
        success: response?.success,
        message: response?.message,
        data: response?.data,
        fullResponse: response
      });

      if (response.success) {
        console.log('5. Delete successful');
        toast.success('Event deleted successfully');
        if (onEventDeleted) {
          console.log('6. Calling onEventDeleted callback');
          onEventDeleted();
        }
      } else {
        console.error('5. Delete failed:', {
          message: response.message,
          success: response.success,
          data: response.data,
          fullResponse: response
        });
        throw new Error(response.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('6. Error caught:', {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        data: error.response?.data,
        fullError: error
      });
      
      // Extract error message from the response if available
      const errorMessage = error.response?.data?.message || error.message || 'Error deleting event';
      console.error('7. Error message to display:', errorMessage);
      toast.error(errorMessage);
    } finally {
      console.log('8. Cleanup');
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div
        className={`flex w-full gap-6 ${
          showDetails ? "rounded-t-lg" : "rounded-lg"
        } border px-3 py-3 cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {event.imageUrl ? (
              <img 
                src={event.imageUrl} 
                alt={event.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">
                {event.name.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="font-bold">{event.name}</div>
            <div className="mt-1 text-sm text-gray-600">
              {formatDate(event.start)}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Location</div>
          <div className="mt-1">{event.venue?.name || event.location || 'TBD'}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">City</div>
          <div className="mt-1">{event.venue?.city || event.city || 'Not specified'}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Price</div>
          <div className="mt-1">
            {event.price ? `$${event.price}` : 'Free'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outlined"
            size="small"
            onClick={handleEdit}
            className="rounded-full"
          >
            Edit
          </Button>
          <IconButton
            onClick={handleDeleteClick}
            size="small"
            className="text-red-500 hover:text-red-700"
          >
            <DeleteIcon />
          </IconButton>
        </div>
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

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden rounded-b-lg mb-1 ${
          showDetails
            ? "max-h-[500px] p-3 border-b border-l border-r"
            : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mt-4 font-bold">Description</div>
            <div className="mt-1 text-sm">{event.description || 'No description available'}</div>
          </div>
          <div>
            <div className="mt-4 font-bold">Quantity</div>
            <div className="mt-1">{event.quantity || 'Unlimited'}</div>
          </div>
          <div>
            <div className="mt-4 font-bold">Event Type</div>
            <div className="mt-1">{event.eventType || 'Not specified'}</div>
          </div>
          <div>
            <div className="mt-4 font-bold">Address</div>
            <div className="mt-1">
              {event.venue?.addressLine1 ? (
                <>
                  {event.venue.addressLine1}
                  {event.venue.addressLine2 && <br />}
                  {event.venue.addressLine2}
                  <br />
                  {event.venue.city}, {event.venue.state} {event.venue.postalCode}
                </>
              ) : (
                'No address available'
              )}
            </div>
          </div>
          {event.imageUrl && (
            <div className="col-span-2">
              <div className="mt-4 font-bold">Event Image</div>
              <div className="mt-1">
                <img 
                  src={event.imageUrl} 
                  alt={event.name}
                  className="w-full max-w-md rounded-lg object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventItem; 