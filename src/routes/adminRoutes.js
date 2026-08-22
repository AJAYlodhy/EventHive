const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin Dashboard
router.get('/dashboard', adminController.getDashboard);

// Admin Stats API (JSON)
router.get('/api/stats', adminController.getStatsAPI);

module.exports = router;
