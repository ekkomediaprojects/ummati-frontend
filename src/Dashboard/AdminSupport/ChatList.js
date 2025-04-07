import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = ({ allChatUsers, alreadySelected }) => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(alreadySelected || "");

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setUserID(selectedId);
    if (selectedId !== "") {
      navigate(`/dashboard/adminsupport/${selectedId}`);
    }
  };

  return (
    <div className="rounded-lg flex items-center gap-2">
      <div className="w-fit break-keep whitespace-nowrap font-semibold text-sm">
        Select a Chat:
      </div>
      <select
        className="cursor-pointer border border-gray-300 rounded-md px-2 py-1 text-sm"
        value={userID}
        onChange={handleChange}
      >
        <option value="">Select A Chat</option>
        {allChatUsers.map((user, index) => (
          <option key={index} value={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChatList;
