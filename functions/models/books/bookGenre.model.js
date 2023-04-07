const mongoose = require('../../utils/dbConn');

const bookgenreModel = mongoose.Schema({
  genre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('bookgenre', bookgenreModel);
