const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createHash } = require('node:crypto');
const amqp = require('amqplib/callback_api');
const axios = require('axios');
const config = require("./config.js");
const { Pool } = require("pg");

const app = express();
const server = http.createServer(app);
var channel;
const queue = "match";
const matchingRequests = new Map();
const connectedSockets = new Map();

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
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

function notifyMatchedUsers(user1, user2, room_id) {
  connectedSockets.get(user1).emit("matched", room_id);
  connectedSockets.get(user2).emit("matched", room_id);
  console.log(`Notified ${user1} and ${user2} that they are matched`);
}

function notifyRequestTimeout(user) {
  connectedSockets.get(user).emit("timeout");
  console.log(`Request timed out for user: ${user}`);
}

function notifyNotFound(user1, user2, room_id) {
  connectedSockets.get(user1).emit("not_found");
  connectedSockets.get(user2).emit("not_found");
  console.log("No questions found");
}

function notifyActiveSession(user, room_id) {
  connectedSockets.get(user).emit("already_matched", room_id);
  console.log(`Notified ${user} that they have an active session`);
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

async function insertDB(user1, user2, room_id, question) {
  try {
    const query =
      "INSERT INTO matched (username, room_id, question) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(query, [
      user1,
      room_id,
      question,
    ]);
    const result2 = await pool.query(query, [
      user2,
      room_id,
      question
    ])
    notifyMatchedUsers(user1, user2, room_id);
  } catch (error) {
    console.error("Error inserting into Match DB:", error);
  }
}

async function isUserMatched(user) {
  const result = await queryDB(user);
  if (result.length > 0) {
    return result[0].room_id;
  }
  return null;
}

async function selectQuestion(m_category, m_difficulty) {
  var response;
  if (m_category == "Any") {
    response = await axios.get(`http://question-service:4567/api/questions/find_any`, {
      params: {
        complexity: m_difficulty
      }
    });
  } else {
    response = await axios.get(`http://question-service:4567/api/questions/find`, {
      params: {
        category: m_category,
        complexity: m_difficulty
      }
    });
  }

  const questions = await response.data.questions;
  if (questions.length == 0) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex]['title'];
}

async function handleMatching(request) {
  const key = request.difficulty + request.category;
  const user = request.user;
  const potentialMatch = matchingRequests.get(key);

  if (potentialMatch) {
    // Match found
    const [user1, user2] = [potentialMatch.user, user];
    matchingRequests.delete(key);

    const [sortedUser1, sortedUser2] = [user1, user2].sort();
    const hash = createHash('sha256');
    hash.update(sortedUser1 + sortedUser2);
    const room_id = hash.digest('hex');

    randomQuestion = await selectQuestion(request.category, request.difficulty);
    if (randomQuestion == "") {
      notifyNotFound(user1, user2, room_id);
      return;
    }

    await insertDB(sortedUser1, sortedUser2, room_id, randomQuestion);
  } else {
    // No match found yet, add this request to matchingRequests
    matchingRequests.set(key, { user, requestTime: Date.now() });

    // Set a timer to delete the request if no match is found
    setTimeout(() => {
      var check_val = matchingRequests.get(key);
      if (check_val != undefined && check_val.user === user) {
        matchingRequests.delete(key);

        // Notify the user that their request timed out
        notifyRequestTimeout(user);
      }
    }, 30000); // 30 seconds timeout
  }
}

function setupRabbitMQ() {
  amqp.connect('amqp://matching-rabbitmq', function (error0, connection) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function (error1, ch) {
      if (error1) {
        throw error1;
      }

      channel = ch;
      channel.assertQueue(queue, {
        durable: false
      });
      console.log(" [*] Waiting for messages in %s.", queue);

      channel.consume(queue, function (msg) {
        const message = JSON.parse(msg.content.toString());
        handleMatching(message);
      }, {
        noAck: true
      });
    });
  });
}

io.on('connection', (socket) => {
  socket.on("matchUser", async (data) =>{
    const { user, difficulty, category } = data;
    connectedSockets.set(user, socket);

    room_id = await isUserMatched(user);
    if (room_id != null) {
      notifyActiveSession(user, room_id);
      return;
    }

    const message = JSON.stringify({ user, difficulty, category });
    channel.sendToQueue(queue, Buffer.from(message));
  })
})

server.listen(5000, () => {
  console.log('listening on port 5000');
  setupRabbitMQ();
});