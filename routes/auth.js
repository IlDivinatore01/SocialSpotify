const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route per la registrazione di un nuovo utente
router.post('/register', authController.registerUser);

// Route per il login di un utente
router.post('/login', authController.loginUser);

// Route per il logout di un utente
router.get('/logout', authController.logoutUser);

module.exports = router;
