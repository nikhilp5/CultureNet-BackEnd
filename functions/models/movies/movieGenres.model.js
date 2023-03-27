const mongoose = require('../../utils/dbConn');

const movieGenresModel = mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies',
    required: true,
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genres',
    required: true,
  },
});

module.exports = mongoose.model('movieGenres', movieGenresModel);
