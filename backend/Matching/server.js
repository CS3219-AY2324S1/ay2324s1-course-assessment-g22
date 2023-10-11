const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // console.log(`Socket is ${socket.id}`);
  socket.on("matchUser", (data) => {
    const {user, difficulty, category} = data;
    console.log(`The user is ${user}`);
    console.log(`The difficulty is ${difficulty}`);
    console.log(`The category is ${category}`);
  })
})

server.listen(5000, () => {
    console.log('listening on port 5000');
  });