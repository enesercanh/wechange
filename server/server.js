const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Send previous messages to the new user
    socket.emit('loadMessages', messages);

    // Listen for new messages
    socket.on('sendMessage', (message) => {
        messages.push(message);
        io.emit('newMessage', message);  // Broadcast new message to all users
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
