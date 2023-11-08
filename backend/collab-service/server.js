const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.js");
const axios = require("axios");
const Redis = require("ioredis");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/api/collab/socket.io",
  cors: {
    origin: `${config.services.frontend.URL}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

// Instantiate Redis service with environmental variables
const client = new Redis(6379, config.services.redis.host);
// Key: room:${room_id}, Value: code

async function saveCodePersistent(room_id, code) {
  try {
    if (client.status === "ready") {
      client.set(`room:${room_id}`, code);
    }
    const historyData = {
      roomid: room_id,
      code: code,
    };
    await axios.put(`${config.services.history.URL}/api/history`, historyData);
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
        return;
      }

      const historyData = {
        roomid: room_id,
        code: code,
      };
      await axios.put(
        `${config.services.history.URL}/api/history`,
        historyData
      );
      console.log("Saved from Redis to Collab DB");
    }
  } catch (error) {
    console.error("Error saving from Redis to Collab DB:", error);
  }
}

async function saveEndTime(roomId) {
  try {
    await axios.put(`${config.services.history.URL}/api/history/endtime`, {
      roomid: roomId,
    });
    console.log("Successfully updated end time of collab");
  } catch (error) {
    console.error("Error saving end time of collab:", error);
  }
}

// Try to get from Redis first, if not found, query from DB and update Redis
async function getCode(room_id) {
  try {
    const result =
      client.status === "ready" ? await client.get(`room:${room_id}`) : null;
    if (result) {
      return { code: result };
    } else {
      const result = await axios.get(
        `${config.services.history.URL}/api/history/${room_id}`
      );
      if (result.data.length === 0) {
        return { code: "" };
      }
      if (client.status === "ready") {
        client.set(`room:${room_id}`, result.data[0].code);
      }
      return result.data[0];
    }
  } catch (error) {
    console.error("Error querying for code for room:", error);
    return [];
  }
}

async function getLanguage(room_id) {
  try {
    const result = await axios.get(
      `${config.services.history.URL}/api/history/language/${room_id}`
    );
    if (result.data.length === 0) {
      return { language: "" };
    }
    return result.data[0];
  } catch (error) {
    console.error("Error querying for language for room:", error);
    return [];
  }
}

async function saveLanguage(room_id, language) {
  try {
    const historyData = {
      roomid: room_id,
      language_used: language,
    };
    await axios.put(
      `${config.services.history.URL}/api/history/language`,
      historyData
    );
    console.log("Successfully updated language of collab");
  } catch (error) {
    console.error("Error updating language of collab:", error);
  }
}

// Remove entry from Redis
async function deleteRedis(room_id) {
  if (client.status === "ready") {
    client.del(`room:${room_id}`, (err) => {
      if (err) {
        console.error("Error deleting saved code from Redis:", err);
      }
    });
  }
}

io.on("connection", (socket) => {
  socket.on("join_room", async (roomId) => {
    const room = io.sockets.adapter.rooms.get(`${roomId}`);
    socket.join(`${roomId}`);
    socket.roomId = roomId;
    const result = await getCode(roomId);
    const result2 = await getLanguage(roomId);
    console.log(`Sending saved code: ${result.code}`);
    console.log(`Sending saved language: ${result2.language_used}`);
    socket.to(`${roomId}`).emit("join_room");
    socket.emit("join_success", result.code, result2.language_used);
  });

  socket.on("change_language", (roomId, lang) => {
    saveLanguage(roomId, lang.name);
    socket.to(`${roomId}`).emit("change_language", lang);
  });

  socket.on("code", async (roomId, code) => {
    // Double code receive from both user code updates
    // to confirm updates
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
    await saveRedisToDB(roomId);
    await saveEndTime(roomId);
    await deleteRedis(roomId);
  });

  socket.on("disconnect", async () => {
    socket.to(socket.roomId).emit("leave_room");
  });
});

server.listen(5001, () => {
  console.log("Collab service listening on port 5001");
});
