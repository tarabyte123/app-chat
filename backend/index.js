const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const { v4: uuid } = require("uuid");

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const userName = socket.handshake.auth.username;
  if (!userName) {
    return next(new Error("Invalid username"));
  }
  socket.username = userName;
  socket.userId = uuid();
  next();
});

io.on("connection", async (socket) => {
  console.log("connection done");

  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userId: socket.userId,
      username: socket.username,
    });
  }

  socket.emit("users", users);

  socket.emit("session", {
    userId: socket.userId,
    username: socket.username,
  });

  socket.broadcast.emit("userconnected", {
    userId: socket.userId,
    username: socket.username,
  });

  socket.on("newmessage", (message) => {
    socket.broadcast.emit("newmessage", {
      userId: socket.userId,
      username: socket.username,
      message,
    });
  });
});

httpServer.listen(port, () => {
  console.log(`server running at ${port}`);
});
