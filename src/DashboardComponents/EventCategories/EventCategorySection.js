"use client";
import React from "react";
import EventCategoryList from "./EventCategoryList";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import AddEventType from "./AddEventType";

const EventCategorySection = () => {
  const [eventTypes, setEventTypes] = useState([]);
  const refreshEventTypeList = async () => {
    // const eventTypes = await getAllEventTypes();

    // setEventTypes(eventTypes);
  };
  useEffect(() => {
    refreshEventTypeList();
  }, []);

  return (
    <div className=" text-themeblack md:w-3/4">
      <div className="flex justify-between">
        <div className="text-base font-medium">Event Categories</div>
        <AddEventType refreshEventTypeList={refreshEventTypeList} />
      </div>
      <hr className="mt-1" />
      {/* <AccountDetailsForm session={session} /> */}

      <EventCategoryList
        eventTypes={eventTypes}
        refreshEventTypeList={refreshEventTypeList}
      />
    </div>
  );
};
export default EventCategorySection;
