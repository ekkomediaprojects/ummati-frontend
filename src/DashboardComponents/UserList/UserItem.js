"use client";
import React, { useEffect, useState } from "react";

const UserItem = ({ user }) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    // setDate(new Date(user.createdAt));
  }, []);
  const [showDetails, setshowDetails] = useState(false);
  return (
    <>
      <div
        className={`flex w-full gap-6 ${
          showDetails ? "rounded-t-lg" : "rounded-lg"
        } border px-3 py-3 cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out`}
        onClick={() => setshowDetails(!showDetails)}
      >
        <div className="flex flex-col">
          <div className="font-bold">Name</div>
          <div className="mt-1">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">User Id</div>
          <div className="mt-1">{user.id}</div>
        </div>
      </div>
      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden  rounded-b-lg mb-1 ${
          showDetails
            ? "max-h-[500px] p-3 border-b border-l border-r"
            : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-2">
          <div>
            <div className="mt-4 font-bold">Email</div>
            <div className="mt-1">{user.email}</div>
          </div>
          <div>
            <div className="mt-4 font-bold">Account Created</div>
            <div className="mt-1">{date}</div>
          </div>
          <div>
            <div className="mt-4 font-bold">Role</div>
            <div className="mt-1">{user.role}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItem;
