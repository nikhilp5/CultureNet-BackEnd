const mongoose = require('../../utils/dbConn');

const booksModel = mongoose.Schema({
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
  authors: {
    type: [String],
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

module.exports = mongoose.model('books', booksModel);
