"use client";

import { useState } from "react";
import ChatWindow from "@/components/Chat/ChatWindow";
import RoomList from "@/components/Sidebar/RoomList";

export default function ChatPage() {
  const [currentRoom, setCurrentRoom] = useState("General");

  return (
    <main className="chat-container flex min-h-[90vh]">
      {/* <div className="room-list w-64 bg-gray-200 p-4"> */}
      <RoomList onSelectRoom={(room) => setCurrentRoom(room)} />
      {/* </div> */}
      <div className="chat-window flex-1 bg-white p-2 shadow-lg rounded-lg max-h-[90vh]">
        <ChatWindow room={currentRoom} />
      </div>
    </main>
  );
}
