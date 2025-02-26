const pool = require("../config/dbconfig");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM users";
    const [rows] = await pool.query(sqlQuery);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Insert new user
exports.createUser = async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res
      .status(400)
      .json({ error: "Missing required fields in the request body" });
  }

  try {
    const sqlInsert = "INSERT INTO users (username, email) VALUES (?, ?)";
    const values = [username, email];
    await pool.query(sqlInsert, values);

    res.json({
      message: "Data inserted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error executing insert query:", error);
    res.status(500).send("Internal Server Error");
  }
};
