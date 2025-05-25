const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const Section = require('../models/Section');

// Create new section
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const { courseId, title } = req.body;
    if (!courseId || !title) {
      return res.status(400).json({ message: 'Course ID and title are required' });
    }

    const section = new Section({
      title,
      course: courseId,
    });

    await section.save();

    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
