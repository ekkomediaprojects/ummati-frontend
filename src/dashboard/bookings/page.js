import React from "react";
import BookingsSection from "../../Dashboard/Bookings/BookingsSection";

const session = {
  user: {
    id: "user123",
    name: "Jane Doe",
    role: "ADMIN", // or "USER"
    email: "jane@example.com",
  },
};

const eventbookings = [
  {
    id: "booking1",
    userId: "user123",
    eventId: "event1",
    createdAt: "2025-04-07T12:00:00Z",
    user: {
      id: "user123",
      name: "Jane Doe",
      email: "jane@example.com",
    },
    event: {
      id: "event1",
      title: "React Workshop",
      date: "2025-04-15T10:00:00Z",
    },
  },
  {
    id: "booking2",
    userId: "user456",
    eventId: "event2",
    createdAt: "2025-04-08T09:30:00Z",
    user: {
      id: "user456",
      name: "John Smith",
      email: "john@example.com",
    },
    event: {
      id: "event2",
      title: "Next.js Bootcamp",
      date: "2025-04-20T14:00:00Z",
    },
  },
];

export default function Bookings() {
  return (
    session && (
      <div className="text-themeblack md:w-3/4 px-4 py-6">
        <BookingsSection eventbookings={eventbookings} session={session} />
      </div>
    )
  );
}
