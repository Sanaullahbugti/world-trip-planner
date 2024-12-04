const express = require('express');
const { createTripEntry, getTripsByUser } = require('../controllers/tripController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new trip (requires authentication)
router.post('/create', authMiddleware, createTripEntry);

// Fetch trips for the logged-in user (requires authentication)
router.get('/all', authMiddleware, getTripsByUser);

module.exports = router;
