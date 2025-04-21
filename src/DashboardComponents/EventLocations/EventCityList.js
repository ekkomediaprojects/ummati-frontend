"use client";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import CityItem from "./CityItem";

const EventCityList = ({
  cityList,
  refreshEventLocationsList,
  states,
}) => {
  const [error, setError] = useState("");
  const deleteCity = async (id) => {
    const response = await axios.post("/api/city/delete", {
      id: id,
    });
    switch (response.data.status) {
      case 200:
        setError("");
        setTimeout(() => {
          refreshEventLocationsList();
        }, 300);
        // refreshEventTypeList();
        return;
      case 402:
        setError("Invalid Event");
        return;
      case 401:
        setError("Invalid Event");
        return;
      default:
        setError("There was an error deleting the type");
        return;
    }
  };
  return (
    <div className="grid md:grid-cols-4 gap-2 mt-6 px-3 mb-5">
      {cityList.map((city, index) => (
        <CityItem
          city={city}
          refreshEventLocationsList={refreshEventLocationsList}
          deleteCity={deleteCity}
          states={states}
        />
      ))}
      {error != "" && <div className="text-red-600">{error}</div>}
    </div>
  );
};
export default EventCityList;
