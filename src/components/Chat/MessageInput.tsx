import { useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="message-input flex items-center p-2 border-t">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 p-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Send
      </button>
    </div>
  );
}
