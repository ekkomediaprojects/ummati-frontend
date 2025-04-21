import React, { useEffect, useState } from "react";
import BookingItem from "./BookingItem";
// import { getAllBookings, searchBookings } from "@/components/Helper/bookingFunctions";
import {Button} from "@mui/material"
// import { exportDataAsCSV } from "@/components/Helper/csvExportFuctions";
import moment from "moment";

const BookingsSection = ({ session, eventbookings }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState(eventbookings);
  const [bookings, setBookings] = useState(eventbookings);
  const [exportData, setExportData] = useState(eventbookings);

  useEffect(() => {
    const newExportData = bookings.map((booking) => {
      return {
        ...booking,
        sessionData: "",
        user: {
          ...booking.user,
          avatar: window.location.origin + booking.user.avatar,
          password: "",
        },
        event: {
          ...booking.event,
          imageUrl: window.location.origin + booking.event.imageUrl,
        },
      };
    });
    setExportData(newExportData);
  }, [bookings]);

  useEffect(() => {
    let newFilteredList = [];
    switch (filter) {
      case "ALL":
        newFilteredList = bookings;
        break;
      case "PAST":
        bookings.map((bookingItem) => {
          if (moment(bookingItem.event.eventDate) < moment(new Date())) {
            newFilteredList.push(bookingItem);
          }
        });
        break;
      case "UPCOMING":
        bookings.map((bookingItem) => {
          if (moment(bookingItem.event.eventDate) > moment(new Date())) {
            newFilteredList.push(bookingItem);
          }
        });
        break;
      default:
        newFilteredList = bookings;
        break;
    }
    setFilteredBookings(newFilteredList);
  }, [bookings, filter]);

  useEffect(() => {
    filterBookings();
  }, [searchQuery]);

  const filterBookings = async () => {
    if (searchQuery !== "") {
      // const bookings = await searchBookings(searchQuery);
      // setBookings(bookings);
    } else {
      // const bookings = await getAllBookings();
      // setBookings(bookings);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      filterBookings();
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval
    };
  }, []);

  return (
    <div className="text-themeblack w-full">
      <div className="flex justify-between">
        <div className="text-base flex font-medium justify-between w-full">
          {session.user.role === "ADMIN" ? (
            <>
              <span>All Bookings</span>
              <div className="flex gap-4">
                <select
                  name="listfilter"
                  value={filter}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                >
                  {/* {listFilterOptionsText.map(
                    (option) =>
                      option.key !== "DRAFT" && (
                        <option key={option.key} value={option.key}>
                          {option.value}
                        </option>
                      )
                  )} */}
                </select>
                <Button
                  type="button"
                  className="rounded-full"
                  // onClick={() =>
                  //   // exportDataAsCSV(
                  //   //   exportData,
                  //   //   `Bookings_${new Date().toUTCString().replace(" ", "_")}`
                  //   // )
                  // }
                >
                  Export
                </Button>
              </div>
            </>
          ) : (
            <>
              <span>My Bookings</span>
              <div>
                <select
                  name="listfilter"
                  value={filter}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                >
                  {/* {listFilterOptionsText.map(
                    (option) =>
                      option.key !== "DRAFT" && (
                        <option key={option.key} value={option.key}>
                          {option.value}
                        </option>
                      )
                  )} */}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a booking"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-black">
            <th className="py-5">User Name</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Booking Date</th>
            {session.user.role === "ADMIN" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                session={session}
              />
            ))
          ) : (
            <tr className="w-full text-center text-xs mt-2 font-poppins uppercase">
              <td colSpan={5} className="text-lg py-4">
                No Bookings Yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsSection;
