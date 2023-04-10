const mongoose = require('../utils/dbConn');

const reviewModel = mongoose.Schema({
  contentId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRating: {
    type: Number,
    default: 5
  },
  comment: {
    type: String,
    text: true,
    trim: true
  },
  category: {
    type: String,
    default: false,
  },
  createdTS: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('reviews', reviewModel);
