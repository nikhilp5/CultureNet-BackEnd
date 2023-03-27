const mongoose = require('../utils/dbConn');

const activityModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  logMessage: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('activity', activityModel);
