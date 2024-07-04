// const express = require("express");
// require("dotenv").config();
// const mysql = require("mysql2");

// const app = express();
// const port = 3000;

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// app.use(express.json());

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to MySQL database:", err);
//   } else {
//     console.log("Connected to MySQL database");

//     // Release the connection
//     connection.release();
//   }
// });

// // GET endpoint to fetch data
// app.get("/data-get", (req, res) => {
//   const sqlQuery = "SELECT * FROM users";

//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("Error getting connection from pool:", err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     connection.query(sqlQuery, (error, results) => {
//       connection.release();

//       if (error) {
//         console.error("Error executing query:", error);
//         res.status(500).send("Internal Server Error");
//         return;
//       }

//       res.json(results);
//     });
//   });
// });

// // POST endpoint to insert new data
// app.post("/data-post", (req, res) => {
//   const { username, email} = req.body;

//   if (!username || !email ) {
//     res
//       .status(400)
//       .json({ error: "Missing required fields in the request body" });
//     return; 
//   }

//   const sqlInsert = "INSERT INTO users (username, email) VALUES (?, ?)";
//   const values = [username, email];

//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("Error getting connection from pool:", err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     connection.query(sqlInsert, values, (error, results) => {
//       connection.release();

//       if (error) {
//         console.error("Error executing insert query:", error);
//         res.status(500).send("Internal Server Error");
//         return;
//       }
//     //  const statusCode = res.status;
// console.log("result",results);

//       res.json({
//         message: "Data inserted successfully",
//         // statusCode: statusCode,'
//         // affectedRows: results.affectedRows,
//         status: 200,
//         // status:results.
//       });
//     });
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// // CORS configuration
// const corsOptions = {
//   origin: 'http://localhost:3001', // Allow only this origin
//   optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// };

// // Use CORS middleware
// app.use(cors(corsOptions));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(express.json());

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");

    // Release the connection
    connection.release();
  }
});

// GET endpoint to fetch data
app.get("/data-get", (req, res) => {
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

// POST endpoint to insert new data
app.post("/data-post", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res
      .status(400)
      .json({ error: "Missing required fields in the request body" });
    return; 
  }

  const sqlInsert = "INSERT INTO users (username, email) VALUES (?, ?)";
  const values = [username, email];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    connection.query(sqlInsert, values, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error executing insert query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json({
        message: "Data inserted successfully",
        status: 200,
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
