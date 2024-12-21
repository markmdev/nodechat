const { Server } = require("socket.io");
const { verifyUser, onMessage, onPrivateMessage } = require("./socket_util");
const { OnlineUsers } = require("./OnlineUsers");

exports.newSocket = (server) => {
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
    OnlineUsers.addNewUser(socket.user, socket);

    io.emit("online_users", OnlineUsers.getAllUsernames());

    socket.on("disconnect", () => {
      console.log(`${username} disconnected`);
      if (OnlineUsers.findUserByUsername(username)) {
        OnlineUsers.deleteUserByUsername(username);
      }

      io.emit("online_users", OnlineUsers.getAllUsernames());
    });

    socket.on("message", (message) => {
      onMessage(socket, io, message);
    });

    socket.on("private_message", (message, toId) => {
      onPrivateMessage(socket, message, toId);
    });
  });
};
