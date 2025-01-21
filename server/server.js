const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = {}; // Store connected users

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Store user details
    socket.on('user-login', (userId) => {
        users[userId] = socket.id;
    });

    // Handle message sending
    socket.on('send-message', ({ senderId, receiverId, message }) => {
        const receiverSocket = users[receiverId];
        if (receiverSocket) {
            io.to(receiverSocket).emit('receive-message', { senderId, message });
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        Object.keys(users).forEach((key) => {
            if (users[key] === socket.id) delete users[key];
        });
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
