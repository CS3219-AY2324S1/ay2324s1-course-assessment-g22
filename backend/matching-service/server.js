const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { createHash } = require("node:crypto");
const amqp = require("amqplib/callback_api");
const axios = require("axios");
const config = require("./config.js");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
var channel;
const queue = "match";
const matchingRequests = new Map();
const connectedSockets = new Map();
const usersRequested = new Map();

const io = new Server(server, {
  path: "/api/match/socket.io",
  cors: {
    origin: config.services.frontend.URL,
    methods: ["GET", "POST", "DELETE"],
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

function clearUserRequest(user) {
  usersRequested.delete(user);
}

function notifyMatchedUsers(user1, user2, room_id) {
  connectedSockets.get(user1).emit("matched", room_id);
  connectedSockets.get(user2).emit("matched", room_id);
  console.log(`Notified ${user1} and ${user2} that they are matched`);

  clearUserRequest(user1);
  clearUserRequest(user2);
}

function notifyRequestTimeout(user) {
  connectedSockets.get(user).emit("timeout");
  console.log(`Request timed out for user: ${user}`);

  clearUserRequest(user);
}

function notifyNotFound(user) {
  connectedSockets.get(user).emit("not_found");
  console.log("No questions found");
}

function notifyActiveSession(user, room_id) {
  connectedSockets.get(user).emit("already_matched", room_id);
  console.log(`Notified ${user} that they have an active session`);
}

function notifyActiveRequest(user) {
  connectedSockets.get(user).emit("already_requested");
  console.log(`Notified ${user} that they have an active request`);
}

async function queryDB(user) {
  try {
    const query = "SELECT * FROM matched WHERE username = $1";
    const result = await pool.query(query, [user]);
    return result.rows;
  } catch (error) {
    console.error("Error querying Match DB:", error);
    return [];
  }
}

async function queryRoomId(room_id) {
  try {
    const query = "SELECT * FROM matched WHERE room_id = $1";
    const result = await pool.query(query, [room_id]);
    return result.rows;
  } catch (error) {
    console.error("Error querying Match DB:", error);
    return [];
  }
}

async function insertDB(user1, user2, room_id, question, difficulty) {
  try {
    const query =
      "INSERT INTO matched (username, room_id, question) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(query, [user1, room_id, question]);
    const result2 = await pool.query(query, [user2, room_id, question]);
    await createHistory(user1, user2, room_id, question, difficulty);
    notifyMatchedUsers(user1, user2, room_id);
  } catch (error) {
    console.error("Error inserting into Match DB and/or History DB:", error);
  }
}

async function deleteDB(room_id) {
  try {
    const query = "DELETE FROM matched WHERE room_id = $1";
    pool.query(query, [room_id]);
  } catch (error) {
    console.error("Error deleting from Match DB:", error);
  }
}

async function createHistory(user1, user2, room_id, question, difficulty) {
  try {
    const currentDateTime = new Date(Date.now()).toISOString();
    const historyData = {
      current_username: user1,
      other_username: user2,
      roomid: room_id,
      time_started: currentDateTime,
      time_ended: null,
      question: question,
      difficulty: difficulty,
      language_used: "JavaScript (Node.js 12.14.0)",
      code: "",
    };
    await axios.post(config.services.history.URL + "/api/history", historyData);
  } catch (error) {
    console.error("Error creating history of collab", error);
  }
}

async function isUserMatched(user) {
  const result = await queryDB(user);
  if (result.length > 0) {
    return result[0].room_id;
  }
  return null;
}

async function selectQuestion(m_category, m_difficulty, m_tag) {
  const response = await axios.get(
    `${config.services.question.URL}/api/questions/find`,
    {
      params: {
        category: m_category,
        complexity: m_difficulty,
        tag: m_tag,
      },
    }
  );

  const questions = await response.data.questions;
  if (questions.length == 0) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex]["title"];
}

async function checkQuestion(m_category, m_difficulty, m_tag) {
  const response = await axios.get(
    `${config.services.question.URL}/api/questions/find`,
    {
      params: {
        category: m_category,
        complexity: m_difficulty,
        tag: m_tag,
      },
    }
  );

  const questions = await response.data.questions;
  return questions.length > 0;
}

async function handleMatching(request) {
  const key = request.difficulty + request.category + request.tag;
  const user = request.user;
  const potentialMatch = matchingRequests.get(key);

  if (potentialMatch) {
    // Match found
    const [user1, user2] = [potentialMatch.user, user];
    matchingRequests.delete(key);
    console.log(
      "Removed from Queue | Successful Match | Matching Queue:",
      matchingRequests
    );

    const [sortedUser1, sortedUser2] = [user1, user2].sort();
    const hash = createHash("sha256");
    hash.update(sortedUser1 + sortedUser2);
    const room_id = hash.digest("hex");

    randomQuestion = await selectQuestion(
      request.category,
      request.difficulty,
      request.tag
    );

    await insertDB(
      sortedUser1,
      sortedUser2,
      room_id,
      randomQuestion,
      request.difficulty
    );
  } else {
    // No match found yet, add this request to matchingRequests
    matchingRequests.set(key, { user, requestTime: Date.now() });
    console.log(
      "Added to Queue | No Match Available in Queue | Matching Queue:",
      matchingRequests
    );

    // Set a timer to delete the request if no match is found
    setTimeout(() => {
      var check_val = matchingRequests.get(key);
      if (check_val != undefined && check_val.user === user) {
        matchingRequests.delete(key);
        console.log(
          "Removed from Queue | Timeout | Matching Queue:",
          matchingRequests
        );

        // Notify the user that their request timed out
        notifyRequestTimeout(user);
      }
    }, 30000); // 30 seconds timeout
  }
}

function setupRabbitMQ() {
  amqp.connect(config.services.rabbitmq.URL, function (error0, connection) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function (error1, ch) {
      if (error1) {
        throw error1;
      }

      channel = ch;
      channel.assertQueue(queue, {
        durable: false,
      });
      console.log(" [*] Waiting for messages in %s.", queue);
      console.log("Queue Created | Matching Queue:", matchingRequests);

      channel.consume(
        queue,
        function (msg) {
          const message = JSON.parse(msg.content.toString());

          if (usersRequested.has(message.user)) {
            notifyActiveRequest(message.user);
            return;
          } else {
            usersRequested.set(message.user, true);
          }

          handleMatching(message);
        },
        {
          noAck: true,
        }
      );
    });
  });
}

io.on("connection", (socket) => {
  socket.on("matchUser", async (data) => {
    const { user, difficulty, category, tag } = data;
    connectedSockets.set(user, socket);

    room_id = await isUserMatched(user);
    if (room_id != null) {
      notifyActiveSession(user, room_id);
      return;
    }

    if (!(await checkQuestion(category, difficulty, tag))) {
      notifyNotFound(user);
      return;
    }

    const message = JSON.stringify({ user, difficulty, category, tag });
    channel.sendToQueue(queue, Buffer.from(message));
  });

  socket.on("queryRoomId", (room_id, token) => {
    queryRoomId(room_id).then((result) => {
      let isValid = false;
      try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const currentTimeInSeconds = Date.now();
        // Check whether token is expired and if the user is one of the matched users
        isValid =
          decoded.exp &&
          currentTimeInSeconds <= decoded.exp &&
          (result[0].username === decoded.username ||
            result[1].username === decoded.username);
      } catch (error) {
        console.error("Error verifying token:", error);
      }
      if (isValid) {
        socket.emit("roominfo", result);
      } else {
        socket.emit("roominfo", []);
      }
    });
  });

  socket.on("deleteRoomId", (room_id) => {
    deleteDB(room_id);
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
  setupRabbitMQ();
});
