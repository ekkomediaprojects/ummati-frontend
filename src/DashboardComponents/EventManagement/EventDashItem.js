"use client";
import React from "react";
import {Link} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditEvent from "../../dashboard/eventmanagement/editevent/single/editeventpage";

const EventDashItem = ({ event }) => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // setDate(new Date(event.eventDate));
  }, []);

  return (
    <Link
      onClick={()=> navigate("/dashboard/eventmanagement/single/" + event.id)}
      className="shadow-lg rounded-lg flex flex-col justify-center items-center text-center py-5 px-5 cursor-pointer"
    >
      <img
        className="rounded-lg"
        alt="Event Image"
        width={300}
        height={300}
        src={event.imageUrl}
      />
      <div>{event.name}</div>
      <div>{date}</div>
    </Link>
  );
};
export default EventDashItem;
