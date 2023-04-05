const mongoose = require('../../utils/dbConn');

const movieGenresModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movies',
    },
  ]
});

module.exports = mongoose.model('Genre', movieGenresModel);
