"use client";
import React from "react";
import Button from "../../components/Button";
import { IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { SketchPicker } from "react-color";
import EventCategoryItem from "./EventCategoryItem";

const EventCategoryList = ({
  eventTypes,
  refreshEventTypeList,
}) => {
  const [error, setError] = useState("");

  return (
    <div className="grid md:grid-cols-4 gap-2 mt-6 px-3 mb-3">
      {eventTypes.map((eventType, index) => (
        <EventCategoryItem
          eventType={eventType}
          key={index}
          setError={setError}
          refreshEventTypeList={refreshEventTypeList}
        />
      ))}
      {error != "" && <div className="text-red-600">{error}</div>}
    </div>
  );
};
export default EventCategoryList;
