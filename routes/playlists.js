const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Route for creating a new playlist
router.post('/', playlistController.createPlaylist);

// Route for modifying a playlist
router.put('/:id', playlistController.modifyPlaylist);

// Route for deleting a playlist
router.delete('/:id', playlistController.deletePlaylist);

// Route for viewing a playlist
router.get('/:id', playlistController.viewPlaylist);

module.exports = router;