const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const amqp = require('amqplib/callback_api');
const queue = "match";
const matchingRequests = new Map();
const connectedSockets = new Map();
var channel;

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

function notifyMatchedUsers(user1, user2) {
  connectedSockets.get(user1).emit("matched", user2);
  connectedSockets.get(user2).emit("matched", user1);
  console.log(`Notified ${user1} and ${user2} that they are matched`);
}

function notifyRequestTimeout(user) {
  connectedSockets.get(user).emit("timeout");
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
    notifyMatchedUsers(user1, user2);
    console.log(`Matched: ${user1} and ${user2}`);
    //
    // TODO: user_A, user_B = sort(user1, user2)
    // PGSQL: INSERT INTO matches (user, room_id) VALUES (user_A, user_A + user_B)
    // PGSQL: INSERT INTO matches (user, room_id) VALUES (user_B, user_A + user_B)
    // ADD API CALL TO RETRIEVE ROOM_ID
    //
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
  // console.log(`Socket is ${socket.id}`);
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