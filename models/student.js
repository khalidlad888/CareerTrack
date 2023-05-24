const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  batch: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Placed', 'Not_placed'],
    required: true
  },
  dsa_score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  webd_score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  react_score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview'
    }
  ]
},
  {
    timestamps: true
  });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
