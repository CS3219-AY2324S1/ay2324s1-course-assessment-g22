const clientUrl = require("./api/url");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.js");
const { Pool } = require("pg");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${clientUrl}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

const dbConfig = config.database;
const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

async function updateDB(room_id, code) {
  try {
    const query = `
      INSERT INTO collab (room_id, code)
      VALUES ($1, $2)
      ON CONFLICT (room_id)
      DO UPDATE SET code = $2
      RETURNING *
    `;
    const result = await pool.query(query, [room_id, code]);
    console.log("Inserted or Updated in Collab DB:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting or updating Collab DB:", error);
  }
}

async function queryRoomId(room_id) {
  try {
    const query = "SELECT code FROM collab WHERE room_id = $1";
    const result = await pool.query(query, [room_id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error querying collab DB:", error);
    return [];
  }
}

io.on("connection", (socket) => {
  // console.log("A user connected");

  socket.on("join_room", async (roomId) => {
    const room = io.sockets.adapter.rooms.get(`${roomId}`);
    const numClients = room ? room.size : 0;
    if (numClients < 2) {
      socket.join(`${roomId}`);
      socket.roomId = roomId;
      const result = await queryRoomId(roomId);
      console.log(`Sending saved code: ${result.code}`);
      socket.emit("join_success", result.code);
    } else {
      socket.emit("full_room");
    }
  });

  socket.on("code", (roomId, code) => {
    // Double code receive from both user code updates
    // to confirm updates
    // console.log(`Code received: ${code}`);
    socket.to(`${roomId}`).emit("code", code);
  });

  socket.on("save_code", (roomId, code) => {
    // Save code to database
    updateDB(roomId, code);
  });

  socket.on("leave_room", (roomId) => {
    socket.to(`${roomId}`).emit("leave_room");
  });

  socket.on("disconnect", () => {
    socket.to(socket.roomId).emit("leave_room");
    // console.log("A user disconnected");
  });
});

server.listen(5001, () => {
  console.log("Collab service listening on port 5001");
});
