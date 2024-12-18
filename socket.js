const { Server } = require("socket.io");
const { verifyUser, onConnection } = require("./socket_util");

exports.newSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(verifyUser);
  io.on("connection", onConnection);
};
