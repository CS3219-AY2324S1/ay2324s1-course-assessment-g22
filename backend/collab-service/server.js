const clientUrl = require("./api/url");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.js");
const { Pool } = require("pg");
const Redis = require("ioredis");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${clientUrl}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

// Instantiate Redis service with environmental variables
const client = new Redis(6379, "collab-redis");
// Key: room:${room_id}, Value: code

const dbConfig = config.database;
const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

async function saveCodePersistent(room_id, code) {
  try {
    if (client.status === "ready") {
      client.set(`room:${room_id}`, code);
    }
    const query = `
      INSERT INTO collab (room_id, code)
      VALUES ($1, $2)
      ON CONFLICT (room_id)
      DO UPDATE SET code = $2
      RETURNING *
    `;
    const result = await pool.query(query, [room_id, code]);
    // console.log("Inserted or Updated in Collab DB:", result);
  } catch (error) {
    console.error("Error inserting or updating Redis and/or Collab DB:", error);
  }
}

// Intermediate save to local cache (Redis)
async function saveCodeInterval(room_id, code) {
  try {
    if (client.status === "ready") {
      client.set(`room:${room_id}`, code);
    }
  } catch (error) {
    console.error("Error inserting or updating Redis:", error);
  }
}

async function saveRedisToDB(room_id) {
  try {
    if (client.status === "ready") {
      const code = await client.get(`room:${room_id}`);
      if (code === null) {
        console.log("Code is null from Redis");
      }

      const query = `
        INSERT INTO collab (room_id, code)
        VALUES ($1, $2)
        ON CONFLICT (room_id)
        DO UPDATE SET code = $2
        RETURNING *
      `;
      const result = await pool.query(query, [room_id, code]);
      console.log("Inserted or updated from Redis to Collab DB");
    }
  } catch (error) {
    console.error(
      "Error inserting or updating from Redis to Collab DB:",
      error
    );
  }
}

// Try to get from Redis first, if not found, query from DB and update Redis
async function queryRoomId(room_id) {
  const query = "SELECT code FROM collab WHERE room_id = $1";
  try {
    const result =
      client.status === "ready" ? await client.get(`room:${room_id}`) : null;
    if (result) {
      return { code: result };
    } else {
      const result = await pool.query(query, [room_id]);
      if (result.rows.length === 0) {
        return { code: "" };
      }
      if (client.status === "ready") {
        client.set(`room:${room_id}`, result.rows[0].code);
      }
      return result.rows[0];
    }
  } catch (error) {
    console.error("Error querying for code for room:", error);
    return [];
  }
}

//Remove entry from Redis and DB
async function deleteSavedCode(room_id) {
  try {
    if (client.status === "ready") {
      client.del(`room:${room_id}`, (err, result) => {
        if (err) {
          console.error("Error deleting saved code from Redis:", err);
        }
      });
    }

    const query = `
      DELETE FROM collab WHERE room_id = $1
    `;
    const result = await pool.query(query, [room_id]);
    console.log("Deleted from Collab DB");
  } catch (error) {
    console.error("Error deleting saved code:", error);
  }
}

io.on("connection", (socket) => {
  // console.log("A user connected");

  socket.on("join_room", async (roomId, token) => {
    const room = io.sockets.adapter.rooms.get(`${roomId}`);
    socket.join(`${roomId}`);
    socket.roomId = roomId;
    const result = await queryRoomId(roomId);
    console.log(`Sending saved code: ${result.code}`);
    socket.emit("join_success", result.code);
  });

  socket.on("code", async (roomId, code) => {
    // Double code receive from both user code updates
    // to confirm updates
    // console.log(`Code received: ${code}`);
    await saveCodeInterval(roomId, code);
    socket.to(`${roomId}`).emit("code", code);
  });

  socket.on("save_code", async (roomId, code) => {
    // Save code to database
    await saveCodePersistent(roomId, code);
  });

  socket.on("leave_room", (roomId) => {
    socket.to(`${roomId}`).emit("leave_room");
  });

  socket.on("end_collab", async (roomId) => {
    socket.to(`${roomId}`).emit("end_collab");
  });

  socket.on("disconnect", async () => {
    socket.to(socket.roomId).emit("leave_room");
    const clients = io.sockets.adapter.rooms.get(`${socket.roomId}`);
    const numClients = clients ? clients.size : 0;
    if (numClients === 0) {
      await saveRedisToDB(socket.roomId);
      await deleteSavedCode(socket.roomId); // TODO do not delete if accessing room after collab is needed
    }
  });
});

server.listen(5001, () => {
  console.log("Collab service listening on port 5001");
});
