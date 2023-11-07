const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.js");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server, {
  path: "/api/chat/socket.io",
  cors: {
    origin: `${config.services.frontend.URL}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});
const connectedSockets = new Map();

const dbConfig = config.database;
const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

async function getChat(room_id) {
  try {
    const query =
      "SELECT username as user, message as text FROM messages WHERE room_id = $1 ORDER BY sent ASC";
    const result = await pool.query(query, [room_id]);
    return result.rows;
  } catch (error) {
    console.error("Error querying Chat DB:", error);
    return [];
  }
}

async function addChat(room_id, user, message) {
  try {
    const query =
      "INSERT INTO messages (room_id, username, message) VALUES ($1, $2, $3) RETURNING *";
    await pool.query(query, [room_id, user, message]);
  } catch (error) {
    console.error("Error inserting into Chat DB:", error);
  }
}

async function deleteChat(room_id) {
  try {
    const query = "DELETE FROM messages WHERE room_id = $1";
    await pool.query(query, [room_id]);
  } catch (error) {
    console.error("Error deleting from Chat DB:", error);
  }
}

function verifyJWT(user, token) {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const currentTimeInSeconds = Date.now();
    return (
      decoded.exp &&
      currentTimeInSeconds <= decoded.exp &&
      user === decoded.username
    );
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return false;
  }
}

ioServer.on("connection", (socket) => {
  socket.on("get_chat", async (user, room_id, token) => {
    console.log("Received get_chat:", user, room_id);
    if (verifyJWT(user, token)) {
      connectedSockets.set(user, socket);
      const chat = await getChat(room_id);
      socket.emit("get_chat", chat);
      console.log("Sent get_chat:", chat);
    }
  });

  socket.on("new_message", (otherUser, room_id, user, message, token) => {
    console.log("Received new_message:", otherUser, room_id, user, message);
    if (verifyJWT(user, token)) {
      addChat(room_id, user, message);
      if (connectedSockets.has(otherUser)) {
        connectedSockets
          .get(otherUser)
          .emit("new_message", { user: user, text: message });
      }
    }
  });

  socket.on("end_collab", (room_id) => {
    console.log("Delete Chat of room_id:", room_id, "from DB");
    deleteChat(room_id);
  });
});

server.listen(5002, () => {
  console.log("Chat service listening on port 5002");
});
