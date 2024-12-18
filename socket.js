const { Server } = require("socket.io");

exports.newSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${reason}`);
    });
  });
};
