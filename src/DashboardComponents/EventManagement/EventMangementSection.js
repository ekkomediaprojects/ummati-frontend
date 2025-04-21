"use client";
import { useEffect, useState } from "react";
import EventList from "./EventList";
import axios from "axios";
import {Link} from "@mui/material";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const EventMangementSection = ({ eventsData }) => {
  const [events, setEvents] = useState(eventsData);
  const [exportData, setexportData] = useState(eventsData);
  const navigate = useNavigate();
  const refreshEventList = async () => {
    // const events = await retriveAllEvents();
    // setEvents(events);
  };

  const handleNavigation = () => {
    navigate("/dashboard/eventmanagement/addevent");
  };
  useEffect(() => {
    refreshEventList();
  }, []);

  // useEffect(() => {
  //   const newExportData = events.map((event) => {
  //     return {
  //       ...event,
  //       imageUrl: window.location.origin + event.imageUrl,
  //     };
  //   });
  //   setexportData(newExportData);
  // }, [events]);

  return (
    <div className=" text-themeblack md:w-3/4">
      <div className="flex justify-between">
        <div className="text-base font-medium">Events</div>
        <div className="flex gap-1">
          <button
            onClick={handleNavigation}
            className="py-2 px-4 border-black border-[1.5px] rounded-full items-center text-center"
          >
            Add
          </button>
          <Button
            type="button"
            className="rounded-full"
            onClick={() =>"nice work"
              // exportDataAsCSV(
              //   exportData,
              //   `Events_${new Date().toUTCString().replace(" ", "_")}`
              // )
            }
          >
            Export
          </Button>
        </div>
      </div>
      <hr className="mt-1" />
      {/* <AccountDetailsForm session={session} /> */}

      <EventList events={events} refreshEventList={refreshEventList} />
    </div>
  );
};
export default EventMangementSection;
