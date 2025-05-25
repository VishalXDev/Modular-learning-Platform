// backend/models/UserProgress.js
const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

userProgressSchema.index({ user: 1, chapter: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
