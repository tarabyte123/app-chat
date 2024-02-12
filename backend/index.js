const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config()


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const port = process.env.PORT

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(port,()=>{
    console.log(`server running at ${port}`)
});