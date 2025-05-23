"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const UserItem = ({ user, onDeleteUser }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the click from triggering the details toggle
    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      onDeleteUser(user.id);
    }
  };

  return (
    <>
      <div
        className={`flex w-full gap-6 ${
          showDetails ? "rounded-t-lg" : "rounded-lg"
        } border px-3 py-3 cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out relative`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={`${user.firstName}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="font-bold">Name</div>
            <div className="mt-1">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Joined {formatDate(user.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Email</div>
          <div className="mt-1">{user.email}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Role</div>
          <div className="mt-1">
            <span className={`px-2 py-1 rounded-full text-sm ${
              user.role === 'admin' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {user.role}
            </span>
          </div>
        </div>
        <IconButton
          onClick={handleDelete}
          className="absolute right-2 top-2 !text-red-600 hover:!bg-red-50"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden rounded-b-lg mb-1 ${
          showDetails
            ? "max-h-[500px] p-3 border-b border-l border-r"
            : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mt-4 font-bold">User ID</div>
            <div className="mt-1 text-sm font-mono bg-gray-50 p-2 rounded">
              {user.id}
            </div>
          </div>
          <div>
            <div className="mt-4 font-bold">Account Created</div>
            <div className="mt-1">{formatDate(user.createdAt)}</div>
          </div>
          <div>
            <div className="mt-4 font-bold">Email</div>
            <div className="mt-1 text-sm">{user.email}</div>
          </div>
          <div>
            <div className="mt-4 font-bold">Role</div>
            <div className="mt-1">
              <span className={`px-3 py-1 rounded-full text-sm ${
                user.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
          {user.profilePicture && (
            <div className="col-span-2">
              <div className="mt-4 font-bold">Profile Picture</div>
              <div className="mt-1">
                <img 
                  src={user.profilePicture} 
                  alt={`${user.firstName}'s profile`}
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserItem;