const express = require("express");
const { createServer } = require("http");
const path = require("path");
const { Server } = require("socket.io");
require("dotenv").config();
const { v4: uuid } = require("uuid");

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 4000;


const io = new Server(httpServer, {
  cors: {
    origin: "*",
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


const __dirname1 = path.resolve()

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    console.log("API running successfully");
  });
}

httpServer.listen(port, () => {
  console.log(`server running at ${port}`);
});
