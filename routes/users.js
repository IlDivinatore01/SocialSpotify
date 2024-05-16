const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for viewing the user profile
router.get('/:userId', userController.getUserProfile);

// Route for modifying user preferences
router.put('/:userId', userController.modifyUserPreferences);

// Route for deleting the account
router.delete('/:userId', userController.deleteAccount);

module.exports = router;