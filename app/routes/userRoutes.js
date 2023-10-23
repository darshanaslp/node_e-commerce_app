const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get user profile (requires authentication)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile (requires authentication)
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Implement routes for managing GDPR requests and account deletion
router.get('/gdpr-data', authMiddleware, userController.getGDPRData);

router.delete('/delete-account', authMiddleware, userController.deleteAccount);


module.exports = router;