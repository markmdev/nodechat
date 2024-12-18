import { useEffect } from "react";
import { socket } from "../socket";

export default function Chat({ user }) {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return <p>Chat</p>;
}
