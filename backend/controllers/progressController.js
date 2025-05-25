// backend/controllers/progressController.js
const UserProgress = require('../models/UserProgress');

exports.saveProgress = async (req, res) => {
  try {
    const { user, course, section, unit, chapter, completed, score } = req.body;

    const existing = await UserProgress.findOne({ user, chapter });

    if (existing) {
      existing.completed = completed ?? existing.completed;
      existing.score = score ?? existing.score;
      existing.updatedAt = Date.now();
      await existing.save();
      return res.status(200).json(existing);
    }

    const progress = new UserProgress({ user, course, section, unit, chapter, completed, score });
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Error saving progress', error: err.message });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progress = await UserProgress.find({ user: userId })
      .populate('course section unit chapter')
      .sort({ updatedAt: -1 });

    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching progress', error: err.message });
  }
};
