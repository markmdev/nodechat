import { useEffect } from "react";
import { socket } from "../socket";
import { useState } from "react";

export default function UsersPanel() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("online_users", (users) => {
      setOnlineUsers(users);
      console.log(users);
    });
  }, []);

  return (
    <div>
      <h2>Online users</h2>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
