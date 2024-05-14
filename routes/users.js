const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route per la visualizzazione del profilo utente
router.get('/:userId', userController.getUserProfile);

// Altre route per la modifica delle preferenze utente, la cancellazione dell'account, ecc., possono essere aggiunte qui

module.exports = router;
