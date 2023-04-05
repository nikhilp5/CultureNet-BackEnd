const mongoose = require('../../utils/dbConn');

const musicReviewsModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  musicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'music',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('musicReviews', musicReviewsModel);
