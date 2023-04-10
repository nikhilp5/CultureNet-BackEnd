const MovieRating = require('../models/movies/movieRatings.model');

const mongoose = require('../utils/dbConn');
// Create a new movie rating
exports.createMovieRating = async (req, res) => {
  try {
    const { userId, movieId, rating } = req.body;

    // Check if movie rating already exists
    const existingRating = await MovieRating.findOne({ userId, movieId });

    if (existingRating) {
      // Update existing movie rating
      existingRating.rating = rating;
      await existingRating.save();
      res.status(200).json(existingRating);
    } else {
      // Create new movie rating
      const movieRating = new MovieRating({
        userId,
        movieId,
        rating,
        dateCreated: Date.now(),
      });

      await movieRating.save();
      res.status(201).json(movieRating);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get the average rating for a particular movie

exports.getMovieRating = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieID = mongoose.Types.ObjectId.createFromHexString(movieId);

    const aggregateResult = await MovieRating.aggregate([
      {
        $match: {
          movieId: mongoose.Types.ObjectId.createFromHexString(movieId),
        },
      },
      {
        $group: {
          _id: '$movieId',
          averageRating: { $avg: '$rating' },
        },
      },
    ]);
    const rating = aggregateResult[0]?.averageRating ?? null;
    res.status(200).json({ rating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserMovieRating = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const user = '6424fbfd655f8005ee60191e';
    const movie = '64272f787aacbbd01b0e0339';

    if (
      !mongoose.Types.ObjectId.isValid(user) &&
      !mongoose.Types.ObjectId.isValid(movie)
    ) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const movieRating = await MovieRating.findOne({
      userId: mongoose.Types.ObjectId.createFromHexString(userId),
      movieId: mongoose.Types.ObjectId.createFromHexString(movieId),
    });

    const rating = movieRating ? movieRating.rating : 0;

    res.status(200).json({ rating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
