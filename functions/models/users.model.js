const mongoose = require('../utils/dbConn');

const usersModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    default: '',
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
  },
  bio: {
    type: String,
    trim: true,
    default: '',
  },
  nsfw: {
    type: Boolean,
    default: false,
  },
  code: {
    type: Number,
  },
  codeExpiry: {
    type: Date,
  },
});

module.exports = mongoose.model('users', usersModel);
