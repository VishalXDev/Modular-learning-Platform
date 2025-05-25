const express = require('express');
const router = express.Router();
const { saveProgress, getUserProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware'); // ✅ FIXED: use correct import name

// ✅ Use 'protect' instead of 'authenticateToken'
router.post('/', protect, saveProgress); // Save or update progress
router.get('/:userId', protect, getUserProgress); // Get progress for a user

module.exports = router;
