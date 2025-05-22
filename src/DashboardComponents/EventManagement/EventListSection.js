"use client";
import { useEffect, useState } from "react";
import EventList from "./EventList";
import { Button, CircularProgress, Alert } from "@mui/material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const API_URL = "http://api.ummaticommunity.com/";

const EventListSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchEvents = async (page = 1, search = "") => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        throw new Error('Please log in to view events');
      }

      const url = `${API_URL}admin/events?page=${page}&limit=${pagination.limit}${search ? `&search=${search}` : ''}`;
      console.log('Fetching events with params:', {
        page,
        limit: pagination.limit,
        search,
        url,
        token: token ? 'Present' : 'Missing'
      });

      const response = await RequestHandler(
        url,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log('API Response:', response);

      if (!response) {
        throw new Error('No response received from server');
      }

      if (response.success) {
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response format: missing events data');
        }
        console.log('Setting events:', response.data);
        setEventList(response.data);
        setPagination({
          page: response.pagination.page,
          limit: response.pagination.limit,
          total: response.pagination.total,
          totalPages: response.pagination.totalPages
        });
      } else {
        throw new Error(response.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      setError(error.message || 'Error fetching events');
      toast.error(error.message || 'Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('EventListSection mounted, fetching events...');
    fetchEvents(pagination.page, searchQuery);
  }, [pagination.page, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="text-themeblack md:w-3/4 mb-5">
      <div className="flex justify-between items-center">
        <div className="text-base font-medium">Events</div>
        <Button
          type="button"
          className="rounded-full"
          onClick={() => window.location.href = '/dashboard/event-management/add-event'}
        >
          Add Event
        </Button>
      </div>
      <hr className="my-2" />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div className="mb-4">
        <input
          type="text"
          name="search"
          autoComplete="new-password"
          autoCorrect="off"
          placeholder="Search for an event"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <>
          <EventList eventList={eventList} />
          
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </Button>
              <span className="py-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventListSection; 