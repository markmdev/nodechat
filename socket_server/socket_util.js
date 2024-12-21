const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { dbMessages } = require("../model/messages");
const { OnlineUsers } = require("./OnlineUsers");

const saveMessageToDb = async (userId, message, toId = null) => {
  const { data, error } = await dbMessages.createMessage({
    userId,
    message,
    toId,
  });
  if (!error) {
    const message = data[0];
    return message;
  }
};

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
  const savedMessage = await saveMessageToDb(socket.user.id, message);
  io.emit("message", savedMessage);
};

exports.onPrivateMessage = async (socket, message, toId) => {
  const toUser = OnlineUsers.findUserById(toId);
  if (toUser) {
    const savedMessage = await saveMessageToDb(socket.user.id, message, toId);
    toUser.socket.emit("private_message", savedMessage);
  } else {
    console.log("No user");
    socket.emit("error_message", `No user with id ${toId}`);
  }
};
