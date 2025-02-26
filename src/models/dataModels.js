const pool = require('../config/dbconfig');

module.exports = {
  getAllUsers: () => {
    const sqlQuery = "SELECT * FROM users";
    return pool.query(sqlQuery).then(([rows]) => rows); // Destructure to get rows
  },

  createUser: (username, email) => {
    const sqlInsert = "INSERT INTO users (username, email) VALUES (?, ?)";
    return pool.query(sqlInsert, [username, email]);
  }
};
