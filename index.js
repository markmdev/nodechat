const express = require("express");
const { createServer } = require("node:http");
const { newSocket } = require("./socket_server/socket");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8000;

newSocket(server);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/chat", chatRouter);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
