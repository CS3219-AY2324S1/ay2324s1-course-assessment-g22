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
}

async function updateDB(user1, user2, room_id, m_category, m_difficulty) {
  const response = await axios.get(`http://localhost:4567/api/questions/find`, {
    params: {
      category: m_category,
      complexity: m_difficulty
    }
  });
  const questions = await response.data.questions;
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions.length == 0 ? "Error Title" : questions[randomIndex]['title'];

  try {
    const query =
      "INSERT INTO matched (username, room_id, question) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(query, [
      user1,
      room_id,
      randomQuestion,
    ]);
    const result2 = await pool.query(query, [
      user2,
      room_id,
      randomQuestion
    ])
    console.log("1 matched pair added to DB");
  } catch (error) {
    console.error("Error adding matched pair to DB:", error);
  }
}

function handleMatching(request) {
  const key = request.difficulty + request.category;
  const user = request.user;
  console.log(`Handling match request: ${key} for user: ${user}`);
  const potentialMatch = matchingRequests.get(key);

  if (potentialMatch) {
    // Match found
    const [user1, user2] = [potentialMatch.user, user];
    matchingRequests.delete(key);

    const [sortedUser1, sortedUser2] = [user1, user2].sort();
    const concatenatedString = sortedUser1 + sortedUser2;
    const hash = createHash('sha256');
    hash.update(concatenatedString);
    const room_id = hash.digest('hex');

    updateDB(sortedUser1, sortedUser2, room_id, request.category, request.difficulty);
    notifyMatchedUsers(user1, user2, room_id);
    console.log(`Matched: ${user1} and ${user2}`);
  } else {
    // No match found yet, add this request to matchingRequests
    matchingRequests.set(key, { user, requestTime: Date.now() });

    // Set a timer to delete the request if no match is found
    setTimeout(() => {
      console.log(`Checking if request timed out for user: ${user}`);
      var check_val = matchingRequests.get(key);
      if (check_val != undefined && check_val.user === user) {
        matchingRequests.delete(key);

        // Notify the user that their request timed out
        notifyRequestTimeout(user);
        console.log(`Request timed out for user: ${user}`);
      }
    }, 30000); // 30 seconds timeout
  }
}

function setupRabbitMQ() {
  amqp.connect('amqp://localhost', function (error0, connection) {
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
  socket.on("matchUser", (data) => {
    const { user, difficulty, category } = data;
    connectedSockets.set(user, socket);
    console.log(`Registered user socket: ${user}`);

    const message = JSON.stringify({ user, difficulty, category });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Received match request: ${message}`);
  })
})

server.listen(5000, () => {
  console.log('listening on port 5000');
  setupRabbitMQ();
});