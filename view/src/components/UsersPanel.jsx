import { useEffect } from "react";
import { socket } from "../socket";
import { useState } from "react";
import { Card, Container, Grid2 } from "@mui/material";

export default function UsersPanel() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("online_users", (users) => {
      setOnlineUsers(users);
      console.log(users);
    });
  }, []);

  return (
    <Grid2 item size={3}>
      <Card
        sx={{
          padding: 2,
        }}
      >
        <h2>Online users</h2>
        <ul style={{ listStyle: "none", paddingLeft: 10 }}>
          {onlineUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </Card>
    </Grid2>
  );
}
