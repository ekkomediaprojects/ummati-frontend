"use client";
import React from "react";
import UserItem from "./UserItem";

const UserList = ({ userList, onDeleteUser }) => {
  if (!userList || userList.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No users found
      </div>
    );
  }

  return (
    <div>
      <div className="px-2 py-1 text-sm text-gray-600">
        {userList.length} {userList.length === 1 ? 'User' : 'Users'}
      </div>
      <div className="flex flex-col gap-2">
        {userList.map((user) => (
          <UserItem key={user.id} user={user} onDeleteUser={onDeleteUser} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
