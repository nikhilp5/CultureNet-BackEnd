const mongoose = require('../../utils/dbConn');

const bookGenresModel = mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books',
    required: true,
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookgenre',
    required: true,
  },
});

module.exports = mongoose.model('genreforbook', bookGenresModel);
