"use client";
import React from "react";
import EventDashItem from "./EventDashItem";

const EventList = ({
  events,
  refreshEventList,
}) => {
  return (
    <div className="grid md:grid-cols-3">
      {events.map((event, index) => (
        <EventDashItem key={index} event={event} />
      ))}
    </div>
  );
};
export default EventList;
