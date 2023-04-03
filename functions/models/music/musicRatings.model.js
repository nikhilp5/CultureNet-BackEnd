const mongoose = require('../../utils/dbConn');

const musicRatingsModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  musicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'music',
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

module.exports = mongoose.model('musicRatings', musicRatingsModel);
