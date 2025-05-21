"use client";
import { useEffect, useState } from "react";
import EventList from "./EventList";
import { Link } from "@mui/material";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const EventMangementSection = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const refreshEventList = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to access events');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}events`,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        setEvents(response.data);
      } else {
        toast.error(response?.message || 'Error fetching events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Error fetching events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = () => {
    navigate("/dashboard/event-management/add");
  };

  useEffect(() => {
    refreshEventList();
  }, []);

  return (
    <div className="text-themeblack md:w-3/4">
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
            onClick={() => {
              // TODO: Implement export functionality
              toast.success('Export functionality coming soon!');
            }}
          >
            Export
          </Button>
        </div>
      </div>
      <hr className="mt-1" />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <EventList events={events} refreshEventList={refreshEventList} />
      )}
    </div>
  );
};

export default EventMangementSection;
