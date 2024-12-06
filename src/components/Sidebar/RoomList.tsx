interface RoomListProps {
  onSelectRoom: (room: string) => void;
}

export default function RoomList({ onSelectRoom }: RoomListProps) {
  const rooms = ["General", "Sports", "Technology", "Music", "Movies"];

  return (
    <div className="room-list bg-gray-200 p-4 w-64 shadow-md rounded-lg">
      <h3 className="font-bold text-gray-700 mb-4">Rooms</h3>
      <ul>
        {rooms.map((room) => (
          <li key={room}>
            <button
              className="w-full text-left p-2 bg-white hover:bg-gray-300 rounded-md mb-2"
              onClick={() => onSelectRoom(room)}
            >
              {room}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
