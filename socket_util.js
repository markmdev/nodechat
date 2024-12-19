const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { dbMessages } = require("./model/messages");

exports.verifyUser = (socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  const token = cookies["token"];

  if (!token) {
    return next(new Error("Not authorized"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

exports.onMessage = async (socket, io, message) => {
  const { data, error } = await dbMessages.createMessage({
    userId: socket.user.id,
    message,
  });
  if (!error) {
    const message = data[0];
    message.users = { username: socket.user.username };
    io.emit("message", message);
  }
};

exports.getOnlineUsers = (onlineUsers, callback) => {
  callback(onlineUsers);
};
