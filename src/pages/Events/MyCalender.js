import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Box, Typography } from "@mui/material";

// Create a localizer for moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const [view, setView] = useState("week");

  // Custom Event component
  const EventComponent = ({ event }) => {
    // Styles for different views
    const getEventStyle = () => {
      switch (view) {
        case "day":
          return {
            backgroundColor: "#D9F4DA",
            borderRadius: "5px",
            width: "200px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "black",
            minHeight: "80px",
          };
        case "week":
          return {
            backgroundColor: "#D9F4DA",
            borderRadius: "5px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "black",
            minHeight: "60px",
          };
        case "month":
          return {
            backgroundColor: "#D9F4DA",
            borderRadius: "5px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "black",
            minHeight: "40px",
          };
        default:
          return {};
      }
    };

    // Event Title Component
    const EventTitle = () => (
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {event.title}
      </Typography>
    );

    // Event Time Component
    const EventTime = () => (
      <Typography
        variant="body2"
        sx={{
          marginTop: "8px",
          fontFamily: "Inter",
          color: "#444",
        }}
      >
        {moment(event.start).format("h:mm a")} -{" "}
        {moment(event.end).format("h:mm a")}
      </Typography>
    );

    // Render Event based on view type
    return (
      <Box sx={getEventStyle()}>
        {/* Image in Day and Week View */}
        {(view === "day" || view === "week") && event.image && (
          <Box sx={{ marginTop: "8px" }}>
            <img
              src={event.image}
              alt={event.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "5px",
              }}
            />
          </Box>
        )}

        {/* Render Title */}
        <EventTitle />

        {/* Render Description in Day View Only */}
        {(view === "day" || view === "week") && event.description && (
          <Typography
            variant="body2"
            sx={{
              marginTop: "4px",
              gap: "4px",
              fontFamily: "Inter",
              color: "#444",
            }}
          >
            {event.description}
          </Typography>
        )}
        <EventTime />
      </Box>
    );
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={view}
        views={["day", "week", "month"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onView={(newView) => setView(newView)}
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#D9F4DA",
            color: "black",
            borderRadius: "5px",
          },
        })}
        components={{
          event: EventComponent,
        }}
      />
    </Box>
  );
};

export default MyCalendar;
