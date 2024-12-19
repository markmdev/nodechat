const { Server } = require("socket.io");
const { verifyUser, onMessage, getOnlineUsers } = require("./socket_util");

exports.newSocket = (server) => {
  const onlineUsers = new Set();
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(verifyUser);
  io.on("connection", (socket) => {
    const username = socket.user.username;
    console.log(`${username} connected!`);
    onlineUsers.add(username);
    io.emit("online_users", [...onlineUsers]);

    socket.on("disconnect", () => {
      console.log(`${username} disconnected`);
      if (onlineUsers.has(username)) {
        onlineUsers.delete(username);
      }
      io.emit("online_users", [...onlineUsers]);
    });

    socket.on("message", (message) => {
      onMessage(socket, io, message);
    });
  });
};
