interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="message-list flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md">
      {messages.map((message, index) => (
        <div key={index} className="message-item mb-3 p-3 bg-blue-100 rounded-lg">
          <strong className="block text-blue-600 mb-1">{message.sender}</strong>
          <p className="text-gray-800"> {message.text} </p>
          <span className="message-timestamp text-xs text-gray-500 ml-2">{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
}
