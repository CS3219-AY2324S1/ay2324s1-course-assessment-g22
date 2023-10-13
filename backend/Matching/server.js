const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const amqp = require('amqplib/callback_api');
var queue = "match";

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // console.log(`Socket is ${socket.id}`);
  socket.on("matchUser", (data) => {
    const { user, difficulty, category } = data;
    const message = JSON.stringify({ user, difficulty, category });
    amqp.connect('amqp://localhost', function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent %s", data);
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    });
  })
})

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s.", queue);

    channel.consume(queue, function (msg) {
      const message = JSON.parse(msg.content.toString());
      console.log(`The user is ${message.user}`);
      console.log(`The difficulty is ${message.difficulty}`);
      console.log(`The category is ${message.category}`);
    }, {
      noAck: true
    });
  });
});

server.listen(5000, () => {
  console.log('listening on port 5000');
});