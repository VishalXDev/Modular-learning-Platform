const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const Unit = require('../models/unit');

// Create new unit
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const { sectionId, title } = req.body;
    if (!sectionId || !title) {
      return res.status(400).json({ message: 'Section ID and title are required' });
    }

    const unit = new Unit({
      title,
      section: sectionId,
    });

    await unit.save();

    res.status(201).json(unit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
