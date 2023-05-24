const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  interview_date: {
    type: String,
    default: Date,
    required: true
  },
  result: {
    type: String,
    enum: ['PASS', 'FAIL', 'On Hold', "Didn't Attempt"],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
}, {
  timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;