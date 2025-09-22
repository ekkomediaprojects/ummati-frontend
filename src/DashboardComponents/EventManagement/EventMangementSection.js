"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Pagination, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";
import EventList from "./EventList";
import dayjs from "dayjs";
import { State, City } from "country-state-city";
import Autocomplete from "@mui/material/Autocomplete";
import {
  CalendarMonth,
  Title,
  Link as LinkIcon,
  LocationOn,
  Description,
  Image as ImageIcon,
  Home,
  Map,
  Public,
  Code,
  Close,
} from "@mui/icons-material";

const EventMangementSection = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  const [usStates, setUsStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    state: "",
    city: "",
    from: "",
    to: "",
  });

  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const navigate = useNavigate();

  // Load US states
  useEffect(() => {
    setUsStates(State.getStatesOfCountry("US"));
  }, []);

  // Update cities when state changes
  useEffect(() => {
    if (filters.state) {
      setFilteredCities(City.getCitiesOfState("US", filters.state));
      setFilters((prev) => ({ ...prev, city: "" }));
    } else {
      setFilteredCities([]);
      setFilters((prev) => ({ ...prev, city: "" }));
    }
  }, [filters.state]);

  const refreshEventList = async (page = 1, updatedFilters = filters) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Please log in to access events");

      const params = new URLSearchParams({
        page,
        limit: 10,
        ...updatedFilters,
      });

      const requestUrl = `${
        process.env.REACT_APP_API_URL
      }admin/events?${params.toString()}`;

      const response = await RequestHandler(
        requestUrl,
        "GET",
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response.success) {
        setEvents(response.data?.data || []);
        setTotalPages(response.data?.pagination?.totalPages || 1);
        setTotalEvents(response.data?.pagination?.total || 0);
      } else {
        toast.error(response.message || "Failed to fetch events");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching events");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    refreshEventList(value);
  };

  // Auto-refresh for search
  const handleSearchChange = (e) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    setCurrentPage(1);
    refreshEventList(1, newFilters);
  };

  // Apply only for dates
  const applyDateFilters = () => {
    const newFilters = {
      ...filters,
      from: from ? dayjs(from) : "",
      to: to ? dayjs(to) : "",
    };
    setFilters(newFilters);
    setCurrentPage(1);
    refreshEventList(1, newFilters);
  };

  const resetFilters = () => {
    const reset = {
      search: "",
      state: "",
      city: "",
      from: "",
      to: "",
    };
    setFilters(reset);
    setFrom(null);
    setTo(null);
    setCurrentPage(1);
    refreshEventList(1, reset);
  };

  useEffect(() => {
    refreshEventList(currentPage);
  }, []);

  return (
    <Box className="text-themeblack md:w-3/4 mb-5">
      {/* 🔍 Search + Filters */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <TextField
          name="search"
          label="Search"
          value={filters.search}
          onChange={handleSearchChange}
          size="small"
          sx={{ width: { xs: "100%", sm: 200 } }}
        />

        {/* State Autocomplete */}
        <Autocomplete
          size="small"
          options={usStates}
          getOptionLabel={(option) => option.name}
          value={usStates.find((s) => s.isoCode === filters.state) || null}
          onChange={(e, newValue) => {
            const newFilters = {
              ...filters,
              state: newValue ? newValue.isoCode : "",
              city: "",
            };
            setFilters(newFilters);
            setCurrentPage(1);
            refreshEventList(1, newFilters);
          }}
          renderInput={(params) => <TextField {...params} label="State" />}
          sx={{ width: { xs: "100%", sm: 200 } }}
        />

        {/* City Autocomplete */}
        <Autocomplete
          size="small"
          options={filteredCities}
          getOptionLabel={(option) => option.name}
          value={filteredCities.find((c) => c.name === filters.city) || null}
          onChange={(e, newValue) => {
            const newFilters = {
              ...filters,
              city: newValue ? newValue.name : "",
            };
            setFilters(newFilters);
            setCurrentPage(1);
            refreshEventList(1, newFilters);
          }}
          renderInput={(params) => <TextField {...params} label="City" />}
          disabled={!filters.state}
          sx={{ width: { xs: "100%", sm: 200 } }}
        />

        {/* 📅 Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="From"
            value={from}
            onChange={(newValue) => setFrom(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{ width: { xs: "100%", sm: 200 } }}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="To"
            value={to}
            onChange={(newValue) => setTo(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{ width: { xs: "100%", sm: 200 } }}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </LocalizationProvider>
        {/* Apply & Reset only for Date */}
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            disabled={!from || !to} // ✅ Correct disabled logic
            onClick={applyDateFilters}
            sx={{
              minWidth: 120,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Apply Date
          </Button>
          <Button
            variant="outlined"
            onClick={resetFilters}
            sx={{
              minWidth: 120,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Reset
          </Button>
        </Box>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-base font-medium">Events ({totalEvents})</div>
        <div className="flex gap-1">
          <button
            onClick={() => navigate("/dashboard/event-management/add-event")}
            className="py-2 px-4 border-black border-[1.5px] rounded-full"
          >
            Add
          </button>
          <Button
            type="button"
            className="rounded-full"
            onClick={() => toast.success("Export functionality coming soon!")}
          >
            Export
          </Button>
        </div>
      </div>
      <hr className="mt-1" />

      {/* Events List */}
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
