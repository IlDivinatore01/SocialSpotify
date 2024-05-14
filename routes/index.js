const express = require('express');
const router = express.Router();

// Route per la homepage
router.get('/', (req, res) => {
    res.send('Benvenuto nel Social Network for Music');
});

module.exports = router;
