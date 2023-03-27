const mongoose = require('../../utils/dbConn');

const bookReviewsModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books',
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

module.exports = mongoose.model('bookReviews', bookReviewsModel);
