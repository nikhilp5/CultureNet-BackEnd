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
    type: Buffer
  }, 
  publisher: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    text: true,
    trim: true
  },
  isbn: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  reviewers: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model('books', booksModel);
