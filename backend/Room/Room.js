const clientUrl = require("./api/url");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${clientUrl}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join_room", (roomId) => {
    const room = io.sockets.adapter.rooms.get(`${roomId}`);
    const numClients = room ? room.size : 0;
    if (numClients < 2) {
      socket.join(`${roomId}`);
      socket.emit("join_success", roomId);
    } else {
      socket.emit("full_room");
    }
  });

  socket.on("code", (roomId, code) => {
    // Double code receive from both user code updates
    // to confirm updates
    console.log(`Code received: ${code}`);
    socket.to(`${roomId}`).emit("code", code);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(5001, () => {
  console.log("Room server listening on port 5001");
});
