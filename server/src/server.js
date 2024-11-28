// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { handleSocket } = require('./socket');

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Initialize Socket.IO with the server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../../client/public')));

// Set EJS as the template engine and configure views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../client/views'));

// Route to render the chat page
app.get('/', (req, res) => {
    res.render('index');
});

// Initialize socket events
handleSocket(io);

// Start the server and listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
