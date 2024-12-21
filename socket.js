const { Server } = require("socket.io");
const { verifyUser, onMessage, getOnlineUsers } = require("./socket_util");

const OnlineUsers = {
  usersList: [],
  findUserByUsername(username) {
    const user = this.usersList.find(
      (userItem) => userItem.user.username === username
    );
    return user;
  },
  deleteUserByUsername(username) {
    this.usersList = this.usersList.filter(
      (userItem) => userItem.user.username !== username
    );
  },
  addNewUser(user, socket) {
    const newUser = {
      user,
      socket,
    };
    this.usersList.push(newUser);
  },
  getAllUsernames() {
    return this.usersList.map((user) => user.user.username);
  },
};

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
    const users = OnlineUsers.getAllUsernames();
    io.emit("online_users", users);

    socket.on("disconnect", () => {
      console.log(`${username} disconnected`);
      if (OnlineUsers.findUserByUsername(username)) {
        OnlineUsers.deleteUserByUsername(username);
      }
      const users = OnlineUsers.getAllUsernames();
      io.emit("online_users", users);
    });

    socket.on("message", (message) => {
      onMessage(socket, io, message);
    });
  });
};
