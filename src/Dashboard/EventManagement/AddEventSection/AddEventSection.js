"use client";
import React from "react";
import AddEventForm from "./AddEventForm";
import { useState } from "react";
const AddEventSection = ({
  eventTypes,
  cities,
  states,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className=" text-themeblack w-3/4">
      {/* <PageLoader isLoading={isLoading} /> */}
      <div className="flex justify-between">
        <div className="text-base font-medium">Add Event</div>
      </div>
      <hr className="mt-1" />
      <AddEventForm
        setIsLoading={setIsLoading}
        eventTypes={eventTypes}
        cities={cities}
        states={states}
      />
    </div>
  );
};
export default AddEventSection;
