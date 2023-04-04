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
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('movies', moviesModel);
