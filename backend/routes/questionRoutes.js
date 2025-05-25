const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const Question = require('../models/question');

// Create new question
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const { chapterId, type, questionText, options, correctAnswer, media } = req.body;

    if (!chapterId || !type || !questionText || !correctAnswer) {
      return res.status(400).json({ message: 'chapterId, type, questionText, and correctAnswer are required' });
    }

    const question = new Question({
      chapter: chapterId,
      type,
      questionText,
      options: options || [],
      correctAnswer,
      media: media || { image: '', audio: '' },
    });

    await question.save();

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
