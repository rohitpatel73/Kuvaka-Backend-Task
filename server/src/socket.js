// Function to handle socket events
function handleSocket(io) {
    // Listen for client connections
    io.on('connection', (socket) => {
        console.log('User connected.');

        // Handle username setup
        socket.on('set username', (username) => {
            socket.username = username; // Store username for the session
            console.log(`${username} joined.`);
        });

        // Handle incoming messages
        socket.on('chat message', (msg) => {
            const fullMessage = `${socket.username || 'Anonymous'}: ${msg}`; // Include username or default to 'Anonymous'
            socket.broadcast.emit('chat message', fullMessage); // Broadcast to others
            socket.emit('chat message', `You: ${msg}`); // Confirm to sender
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log(`${socket.username || 'User'} disconnected.`);
        });
    });
}

// Export the function for external use
module.exports = { handleSocket };
