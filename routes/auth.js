const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for registering a new user
router.post('/register', authController.registerUser);

// Route for user login
router.post('/login', authController.loginUser);

// Route for user logout
router.get('/logout', authController.logoutUser);

module.exports = router;