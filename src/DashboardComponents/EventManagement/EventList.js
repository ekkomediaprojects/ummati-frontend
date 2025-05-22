"use client";
import React from "react";
import EventItem from "./EventItem";

const EventList = ({ eventList }) => {
  if (!eventList || eventList.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No events found
      </div>
    );
  }

  return (
    <div>
      <div className="px-2 py-1 text-sm text-gray-600">
        {eventList.length} {eventList.length === 1 ? 'Event' : 'Events'}
      </div>
      <div className="flex flex-col gap-2">
        {eventList.map((event) => (
          <EventItem key={event._id} event={event} />
      ))}
      </div>
    </div>
  );
};

export default EventList;
