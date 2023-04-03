const mongoose = require('../../utils/dbConn');

const bookRatingsModel = mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('bookRatings', bookRatingsModel);
