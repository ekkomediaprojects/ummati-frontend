"use client";
import React, { useEffect, useState } from "react";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MembershipUserItem = ({
  user,
  cancelMembership,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // setStartDate(
    //   formatDateOnly(user.Membership ? user.Membership.startDate : "")
    // );
    // setEndDate(formatDateOnly(user.Membership ? user.Membership.endDate : ""));
  }, []);

  if (user.Membership != null) {
    return (
      <div className="flex flex-col justify-center items-center p-5 shadow-xl border-primary border-[1px] relative">
        {!user.Membership.isCancelled &&
          new Date(user.Membership.endDate) > new Date() && (
            <Button
              type="button"
              onClick={() => {
                if (user.Membership) {
                  cancelMembership(user.id, user.Membership.id);
                }
              }}
              className="absolute right-0 top-0 !bg-white !text-red-600"
            >
              <DeleteIcon />
            </Button>
          )}
        <div className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <div className="flex">
          <div>{startDate}</div>
          <div>&nbsp; - &nbsp;</div>
          <div>{endDate}</div>
        </div>
        <div className="mt-10">
          <div>
            Status :{" "}
            {user.Membership.isCancelled ? (
              <span className="font-bold text-red-600">Cancelled</span>
            ) : (
              <span className="font-bold text-green-600">Active</span>
            )}
          </div>
          {user.Membership.isCancelled && (
            <div>
              Cancellation Reason :{" "}
              {user.Membership.cancelReason && user.Membership.cancelReason}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default MembershipUserItem;
