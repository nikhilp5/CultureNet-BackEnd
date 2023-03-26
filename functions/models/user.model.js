const mongoose = require('../utils/dbConn');

const usersModel = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('users', usersModel);
