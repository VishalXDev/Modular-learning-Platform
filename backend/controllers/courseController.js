// controllers/courseController.js
const Course = require('../models/course');

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = new Course({
      title,
      description,
      createdBy: req.user._id,
    });

    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create course' });
  }
};
