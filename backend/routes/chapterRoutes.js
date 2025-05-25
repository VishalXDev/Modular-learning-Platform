const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const Chapter = require('../models/chapter');

// Create new chapter
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const { unitId, title, content } = req.body;

    if (!unitId || !title || !content) {
      return res.status(400).json({ message: 'Unit ID, title, and content are required' });
    }

    const chapter = new Chapter({
      title,
      content,
      unit: unitId,
    });

    await chapter.save();

    res.status(201).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
