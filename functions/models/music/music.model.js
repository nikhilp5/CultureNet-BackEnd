const mongoose = require('../../utils/dbConn');

const musicModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artists: {
    type: [String],
    required: true,
    trim: true,
  },
  album: {
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

module.exports = mongoose.model('music', musicModel);
