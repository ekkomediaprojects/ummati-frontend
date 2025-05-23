"use client";
import React from "react";
import EditEventForm from "./EditEventForm";

const EditEventSection = ({
  eventLocations,
  eventTypes,
  event,
  cities,
  states,
}) => {
  return (
    <div className=" text-themeblack w-full md:w-3/4 p-1">
      <div className="flex justify-between">
        <div className="text-base font-medium">{event ? "Edit Event" : "Add Event"}</div>
      </div>
      <hr className="mt-1" />
      <EditEventForm
        eventData={event}
        eventLocations={eventLocations}
        eventTypes={eventTypes}
        cities={cities}
        states={states}
      />
    </div>
  );
};
export default EditEventSection;
