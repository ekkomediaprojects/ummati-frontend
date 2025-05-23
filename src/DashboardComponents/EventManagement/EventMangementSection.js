"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";
import EventList from "./EventList";

const EventMangementSection = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const navigate = useNavigate();

  const refreshEventList = async (page = 1) => {
    console.log('=== refreshEventList Debug ===');
    console.log('1. Function started');
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem('userToken');
      
      console.log('2. Token check:', {
        hasToken: !!token,
        tokenLength: token?.length
      });
      
      if (!token) {
        throw new Error('Please log in to access events');
      }

      const requestUrl = `${process.env.REACT_APP_API_URL}admin/events?page=${page}&limit=10`;
      console.log('3. Request details:', {
        url: requestUrl,
        method: 'GET',
        headers: {
          Authorization: 'Bearer [REDACTED]'
        }
      });

      const response = await RequestHandler(
        requestUrl,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log('4. Raw API Response:', {
        type: typeof response,
        isObject: typeof response === 'object',
        keys: response ? Object.keys(response) : [],
        success: response?.success,
        hasData: !!response?.data,
        dataType: response?.data ? typeof response?.data : 'undefined',
        fullResponse: response
      });

      if (!response) {
        console.error('5. No response received');
        throw new Error('No response received from server');
      }

      if (response.success) {
        console.log('6. Success response structure:', {
          hasData: !!response.data,
          dataType: typeof response.data,
          hasEvents: !!response.data?.data,
          eventsIsArray: Array.isArray(response.data?.data),
          eventsLength: response.data?.data?.length,
          fullData: response.data
        });

        // Handle nested data structure
        const actualData = response.data?.data || response.data;
        const pagination = response.data?.pagination;
        
        console.log('7. Processed data:', {
          actualData,
          isArray: Array.isArray(actualData),
          length: actualData?.length,
          firstItem: actualData?.[0],
          pagination
        });

        if (!actualData || !Array.isArray(actualData)) {
          console.error('8. Invalid data format:', {
            hasData: !!actualData,
            dataType: typeof actualData,
            isArray: Array.isArray(actualData)
          });
          throw new Error('Invalid response format: missing events data');
        }

        console.log('9. Setting state with:', {
          eventsLength: actualData.length,
          firstEvent: actualData[0],
          pagination
        });

        setEvents(actualData);
        if (pagination) {
          setTotalPages(pagination.totalPages);
          setTotalEvents(pagination.total);
        }
      } else {
        console.error('10. Error response:', {
          message: response.message,
          success: response.success
        });
        throw new Error(response.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('11. Error caught:', {
        message: error.message,
        stack: error.stack,
        response: error.response,
        name: error.name
      });
      toast.error(error.message || 'Error fetching events');
    } finally {
      setIsLoading(false);
      console.log('12. Request completed');
    }
  };

  const handleNavigation = () => {
    navigate("/dashboard/event-management/add-event");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    refreshEventList(value);
  };

  useEffect(() => {
    console.log('=== useEffect Debug ===');
    console.log('1. Effect triggered');
    refreshEventList(currentPage);
  }, []);

  console.log('=== Render Debug ===');
  console.log('Current state:', {
    isLoading,
    eventsLength: events.length,
    firstEvent: events[0],
    currentPage,
    totalPages,
    totalEvents
  });

  return (
    <Box className="text-themeblack md:w-3/4 mb-5">
      <div className="flex justify-between items-center">
        <div className="text-base font-medium">Events ({totalEvents})</div>
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
      ) : events.length > 0 ? (
        <>
          <EventList eventList={events} refreshEventList={refreshEventList} />
          <div className="flex justify-center mt-4">
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        </>
      ) : (
        <div className="text-center py-8">No events found</div>
      )}
    </Box>
  );
};

export default EventMangementSection;
