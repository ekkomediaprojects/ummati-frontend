"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EventItem = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
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
        <div className="flex items-center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleEdit}
            className="rounded-full"
          >
            Edit
          </Button>
        </div>
      </div>
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