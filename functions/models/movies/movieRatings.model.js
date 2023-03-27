const mongoose = require('../../utils/dbConn');

const movieRatingsModel = mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('movieRatings', movieRatingsModel);
