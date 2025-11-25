const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  lastClicked: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

linkSchema.index({ code: 1 });
linkSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Link', linkSchema);