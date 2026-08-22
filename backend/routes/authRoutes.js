const express = require('express');
const router = express.Router();
const { login, demoLogin, registerOrganizer, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/demo-organizer', demoLogin);
router.post('/register-organizer', registerOrganizer);
router.get('/me', protect, getMe);

module.exports = router;
