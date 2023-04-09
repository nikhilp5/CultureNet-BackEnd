const mongoose = require('../utils/dbConn');

const watchedModel = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  bookId: {
    type: [String],
    required: true,
    trim: true,
  },
  movieId: {
    type: [String],
    required: true,
    trim: true,
  },
  musicId: {
    type: [String],
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('watcheds', watchedModel);
