const express = require('express');
const { register, login, getAllUsers } = require('../controllers/authController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get all users (admin only)
router.get('/', auth, adminAuth, getAllUsers);

module.exports = router;
