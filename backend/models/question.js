const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true,
  },
  type: {
    type: String,
    enum: ['mcq', 'truefalse', 'shortanswer'], // add more types if needed
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  media: {
    image: {
      type: String,
      default: '',
    },
    audio: {
      type: String,
      default: '',
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Question', questionSchema);
