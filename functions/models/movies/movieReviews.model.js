const mongoose = require('../../utils/dbConn');

const movieReviewsModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies',
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

module.exports = mongoose.model('movieReviews', movieReviewsModel);
