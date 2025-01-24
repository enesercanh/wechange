const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an express app
const app = express();

// Create the server
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = socketIo(server);

// Serve static files (HTML, JS, CSS, etc.)
app.use(express.static('public'));  // Make sure your public files are in a folder named 'public'

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for messages from the client and emit them back to all clients
    socket.on('sendMessage', (message) => {
        io.emit('newMessage', message); // Send the message to all connected clients
    });

    // Handle socket disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
