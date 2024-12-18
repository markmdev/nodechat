const cookie = require("cookie");
const jwt = require("jsonwebtoken");

exports.verifyUser = (socket, next) => {
  console.log("Verifying");
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

exports.onConnection = (socket) => {
  const username = socket.user.username;
  console.log(`${username} connected!`);
};
