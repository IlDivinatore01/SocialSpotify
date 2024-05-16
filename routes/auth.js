const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for registering a new user
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', authController.registerUser);

// Route for user login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.loginUser);

// Route for user logout
router.get('/logout', (req, res) => {
    req.logout();  // This logs the user out
    res.redirect('/login');  // This redirects the user to the login page
});

module.exports = router;