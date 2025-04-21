"use client";
import React from "react";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import EventCityList from "./EventCityList";
import AddCity from "./AddCity";

const EventLocationSection = ({
  states,
  cities,
}) => {
  const [cityList, setCityList] = useState([]);
  console.log("states EventLocationSection" , states)
  const refreshEventLocationsList = async () => {
    // const cityData = await getAllCities();

    // setCityList(cityData);
  };
  useEffect(() => {
    refreshEventLocationsList();
  }, []);

  return (
    <div className=" text-themeblack md:w-3/4">
      <div className="flex justify-between">
        <div className="text-base font-medium">Event Cities</div>
        <AddCity
          refreshEventLocationsList={refreshEventLocationsList}
          stateList={states}
        />
      </div>
      <hr className="mt-1" />
      {/* <AccountDetailsForm session={session} /> */}

      <EventCityList
        cityList={cityList}
        refreshEventLocationsList={refreshEventLocationsList}
        states={states}
      />
    </div>
  );
};
export default EventLocationSection;
