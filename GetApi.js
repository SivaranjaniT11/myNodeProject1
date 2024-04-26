const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 5000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Ammu123@",
  database: "cruddb", // Replace with your actual database name
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");

    // Release the connection
    connection.release();
  }
});

app.get("/", (req, res) => {
  const sqlQuery = "SELECT * FROM users"; 

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    connection.query(sqlQuery, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(results);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
