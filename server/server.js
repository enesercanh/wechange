const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and create the server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New client connected');

    // Send a welcome message to the connected user
    socket.emit('loadMessages', [
        { username: 'System', text: 'Welcome to the chat!', timestamp: new Date().toLocaleTimeString() },
    ]);

    // Listen for messages from the client
    socket.on('sendMessage', (message) => {
        console.log('Received message:', message);

        // Broadcast the message to all connected clients
        io.emit('newMessage', message);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Default route for invalid endpoints
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
