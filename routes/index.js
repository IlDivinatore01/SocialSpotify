const express = require('express');
const router = express.Router();

// Route for the homepage
router.get('/', (req, res) => {
    res.send('Welcome to the Social Network for Music');
});

module.exports = router;