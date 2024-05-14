const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Route per la creazione di una nuova playlist
router.post('/', playlistController.createPlaylist);

// Altre route per la modifica, la cancellazione e la visualizzazione delle playlist possono essere aggiunte qui

module.exports = router;
