const mongoose = require('../../utils/dbConn');

const moviesModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  dateReleased: {
    type: Date,
  },
  image: {
    type: Buffer,
  },
  director: {
    type: String,
    required: true,
    trim: true
  },

  genre:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genres',
    required: true,
  }],
});

module.exports = mongoose.model('movies', moviesModel);
