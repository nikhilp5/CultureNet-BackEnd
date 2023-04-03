const mongoose = require('../../utils/dbConn');

const musicGenresModel = mongoose.Schema({
  musicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'music',
    required: true,
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genres',
    required: true,
  },
});

module.exports = mongoose.model('musicGenres', musicGenresModel);
