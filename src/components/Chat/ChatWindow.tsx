"use client";

import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  room: string;
}

export default function ChatWindow({ room }: ChatWindowProps) {
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: string }[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendMessage = (text: string) => {
    if (isClient) {
      const newMessage = {
        sender: "You",
        text,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <div className="chat-window bg-white flex flex-col p-4 h-full shadow-lg rounded-lg">
      <h2 className="chat-room-title text-xl font-bold text-gray-800 mb-4">{room}</h2>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
