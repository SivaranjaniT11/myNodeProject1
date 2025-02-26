const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');


// router.get('/', (req, res) => {
//     res.json({ message: "Data route working!" });
//     console.log("text");
    
//   });

// GET route to fetch all users
router.get('/data-get', userController.getUsers);

// POST route to insert new user
router.post('/data-post', userController.createUser);

module.exports = router;
