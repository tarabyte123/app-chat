const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on("connection", (socket) => {
  console.log("connected...");
  socket.on("setup", ({ userId }) => {
    socket.join(userId);
    socket.emit("connected");
    console.log("joined room");
  });
});

httpServer.listen(port, () => {
  console.log(`server running at ${port}`);
});
