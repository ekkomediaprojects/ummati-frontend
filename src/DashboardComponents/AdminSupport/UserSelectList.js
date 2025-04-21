import React from "react";
import { Link } from "react-router-dom";

const UserSelectList = ({ users }) => {
  return (
    <div className="flex flex-col">
      <div className="font-bold text-lg">Chat List</div>
      <div className="mt-5 grid md:grid-cols-3 gap-3 text-xs">
        {users.map((user, index) => {
          let unreadCount = 0;

          if (user.chats && user.chats.chatMessages) {
            user.chats.chatMessages.forEach((message) => {
              if (message.seen === false) {
                unreadCount++;
              }
            });
          }

          return (
            <Link
              key={index}
              to={`/dashboard/adminsupport/${user.id}`}
              className="bg-blue-200 rounded-lg p-3 flex justify-between items-center gap-2"
            >
              <div>
                {user.email} - {user.firstName} {user.lastName}
              </div>
              {unreadCount > 0 && (
                <div className="bg-red-600 rounded-full text-white px-2 py-1 text-xs">
                  {unreadCount}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserSelectList;
