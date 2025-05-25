const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Unit', unitSchema);
