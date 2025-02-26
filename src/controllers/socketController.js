const Socket = require('../models/socketModels');

// Handle new socket connection
exports.handleConnection = (socket) => {
  const socket_id = socket.id;
  const client_id = 1; // Example client ID

  Socket.insertConnection(socket_id, client_id)
    .then(() => console.log(`Inserted connection for socket ID: ${socket_id}`))
    .catch((err) => console.error("Error inserting connection into DB:", err));
};

// Handle socket disconnection
exports.handleDisconnection = (socket) => {
  Socket.deleteConnection(socket.id)
    .then((result) => {
      if (result.affectedRows === 0) {
        console.log(`No rows found for socket ID: ${socket.id}`);
      } else {
        console.log(`Deleted connection for socket ID: ${socket.id}`);
      }
    })
    .catch((err) => console.error("Error deleting connection from DB:", err));
};
