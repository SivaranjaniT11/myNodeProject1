// Load environment variables from .env file (only in development)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Load from .env
}

const mysql = require('mysql2');

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',       // Hostname
    user: process.env.DB_USER || 'root',          // MySQL username
    password: process.env.DB_PASS || 'Ammu123@', // MySQL password
    database: process.env.DB_NAME || 'cruddb',  // Database name
    port: process.env.DB_PORT || 3306,              // MySQL port
    waitForConnections: true,
    connectionLimit: 10,                            // Max number of connections
    queueLimit: 0                                   // Limit the connection queue (0 = unlimited)
});
pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL database:", err);
    } else {
      console.log("Connected to MySQL database");
      connection.release();
    }
  });

// Enable promises for async/await support
module.exports = pool.promise();
