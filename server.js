const express = require('express');
const app = express();
const port = 3000; // You can use any port number you prefer

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js and Express.js application!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
