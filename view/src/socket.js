import { io } from "socket.io-client";

const URL = process.env.SOCKET_URL || "http://localhost:8000";

export const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
});
