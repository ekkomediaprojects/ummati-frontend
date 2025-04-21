"use client";

import { useState } from "react";
import ChatItem from "./ChatItem"; // Create a simple ChatItem component
import Button from "@mui/material/Button";

const mockChatData = {
  id: 1,
  chatMessages: [
    { message: "Hi there!", self: true },
    { message: "Hello! How can I help you?", self: false },
    { message: "I have a question about my order.", self: true },
    { message: "Sure, please go ahead.", self: false },
  ],
};

const mockUser = {
  firstName: "John",
};

const ChatBlock = ({ isAdmin = false }) => {
  const [chatList, setChatList] = useState(mockChatData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refreshChat = (newMessage) => {
    const newChatMessages = [
      ...chatList.chatMessages,
      { message: newMessage, self: true },
    ];
    setChatList({ ...chatList, chatMessages: newChatMessages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setError("");
    refreshChat(message);
    setMessage("");
  };

  return (
    <div className="flex w-full flex-col">
      <div className="w-full min-h-[70vh] max-h-[70vh] bg-[#edeee7] p-3 relative overflow-y-scroll">
        <div className="text-center font-semibold text-lg uppercase">
          Chat with {mockUser.firstName}
        </div>
        <hr className="mt-2 border-gray-400" />
        <div className="px-4 space-y-3 mt-4">
          {chatList.chatMessages.map((chat, index) => {
            const isSender = chat.self && !isAdmin;
            const isReceiver = !chat.self && !isAdmin;
            const adminSender = chat.self && isAdmin;
            const adminReceiver = !chat.self && isAdmin;

            return (
              <ChatItem
                key={index}
                text={chat.message}
                className={
                  isSender || adminReceiver
                    ? "justify-end text-right"
                    : "justify-start"
                }
                green={isSender || adminReceiver}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full mt-2 px-4">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </form>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default ChatBlock;
