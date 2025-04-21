"use client";

import { useEffect, useState } from "react";
import {Button} from "@mui/material";
import axios from "axios";
// import { formatDateFull, getRefundsByBookingId } from "@/components/Helper/helperFunctions";
const BookingItem = ({ booking, session }) => {
  const [eventDate, setEventDate] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [refunds, setRefunds] = useState( []);
  const [isLocalRefunded, setIsLocalRefunded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    // setEventDate(formatDateFull(new Date(booking.event.eventDate)));
    // setBookingDate(formatDateFull(new Date(booking.createdAt)));
  }, [booking]);

  const getRefundsForThisBooking = async () => {
    const refundsData =  []
    // await getRefundsByBookingId(booking.id);
    setRefunds(refundsData);
  };

  useEffect(() => {
    getRefundsForThisBooking();
  }, [booking.id]);

  useEffect(() => {
    let pending = false;
    let refunded = false;
    let error = false;
    refunds.forEach((refundItem) => {
      if (refundItem.refundStatus === "PENDING") {
        pending = true;
      } else if (refundItem.refundStatus === "COMPLETED") {
        refunded = true;
      } else {
        error = true;
      }
    });
    setIsLocalRefunded(refunded);
    setIsPending(pending);
    setIsErrored(error);
  }, [refunds]);

  const handleRefund = async () => {
    // const response = await axios.post("/api/secure/refund/full", {
    //   data: {
    //     bookingId: booking.id,
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (response.status === 200) {
    //   console.log("Refunded with ", response.data);
    //   setTimeout(() => {
    //     setIsPending(true);
    //   }, 500);
    // }
  };

  return (
    <tr className="w-full border border-black text-center">
      <td className="py-5">
        {booking.user.firstName} {booking.user.lastName}
      </td>
      <td className="mt-1">{booking.event.name}</td>
      <td className="mt-1">{eventDate}</td>
      <td className="mt-1">{bookingDate}</td>
      {session.user.role === "ADMIN" && (
        <>
          {booking.isRefunded || isLocalRefunded ? (
            <td className="text-green-600 text-center">Refunded</td>
          ) : isPending ? (
            <td className="text-yellow-600">Pending</td>
          ) : isErrored ? (
            <td className="text-red-600">Error</td>
          ) : (
            <td>
              <Button type="button" onClick={handleRefund}>
                Refund
              </Button>
            </td>
          )}
        </>
      )}
    </tr>
  );
};

export default BookingItem;
