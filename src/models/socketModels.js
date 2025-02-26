const pool = require('../config/dbconfig');

module.exports = {
  insertConnection: (socket_id, client_id) => {
    const sqlInsert = "INSERT INTO admin_connection (socket_id, client_id) VALUES (?, ?)";
    return pool.query(sqlInsert, [socket_id, client_id]);
  },

  deleteConnection: (socket_id) => {
    const sqlDelete = "DELETE FROM admin_connection WHERE socket_id = ?";
    return pool.query(sqlDelete, [socket_id]);
  }
};
