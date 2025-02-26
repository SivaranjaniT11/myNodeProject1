const User = require('../models/userModel');

// GET request to fetch data from users
exports.getData = (req, res) => {
  User.getAllUsers()
    .then((results) => res.json(results))
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).send("Internal Server Error");
    });
};

// POST request to insert new user data
exports.postData = (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400).json({ error: "Missing required fields in the request body" });
    return;
  }

  User.createUser(username, email)
    .then(() => res.json({ message: "Data inserted successfully", status: 200 }))
    .catch((err) => {
      console.error("Error inserting user data:", err);
      res.status(500).send("Internal Server Error");
    });
};
