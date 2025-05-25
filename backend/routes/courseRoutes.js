// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const Course = require('../models/course');

// @desc    Create new course
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({
      title,
      description,
      createdBy: req.user._id
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ @desc    Get all courses
router.get("/", protect, async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
