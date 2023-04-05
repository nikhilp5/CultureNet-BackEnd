const mongoose = require('../utils/dbConn');

const genresModel = mongoose.Schema({
  genre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('genres', genresModel);
