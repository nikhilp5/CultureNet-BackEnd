const mongoose = require('../utils/dbConn');
const Movie = require('../models/movies/movies.model');
const watchlist = require("../models/watchlist.model");
const watched = require("../models/watched.model");

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing movie by ID
exports.updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndDelete(id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View a movie by ID
exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    const currentUserId=req.data.user._id;
    //watchlist changes
    let updatedMovie=movie;
    let watchlistResult = await watchlist.find({
      userId: currentUserId,
    });

    let watchedResult = await watched.find({
      userId: currentUserId,
    });

    if (watchlistResult.length == 0) {
      await addInitialEmptyWatchlist(currentUserId);
      watchlistResult = await watchlist.find({
        userId: currentUserId,
      });
    }

    if (watchedResult.length == 0) {
      await addInitialEmptyWatched(currentUserId);
      watchedResult = await watched.find({
        userId: currentUserId,
      });
    }

    let movieWatchlistContent = watchlistResult[0].movieId;
    let bufferImg=movie.image;
    movieWatchlistContent.forEach((watchlistMovie) => {
        if (watchlistMovie.toString() === movie._id.toString()) {
          let watchlist = true;
          updatedMovie = { ...movie.toObject(), watchlist };
        }
    });

    let movieWatchedContent = watchedResult[0].movieId;
    movieWatchedContent.forEach((watchedMovie) => {
        if (watchedMovie.toString() === movie._id.toString()) {
          let watched = true;
          updatedMovie = { ...movie.toObject(), watched };
        }
    });
    updatedMovie["image"]=bufferImg;
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//watchlist changes
const addInitialEmptyWatchlist = async (currentUserId) => {
  let initialEmptyWatchlist = {
    userId: currentUserId,
    bookId: [],
    movieId: [],
    musicId: [],
  };
  await watchlist.insertMany(initialEmptyWatchlist);
};

const addInitialEmptyWatched = async (currentUserId) => {
  let initialEmptyWatched = {
    userId: currentUserId,
    bookId: [],
    movieId: [],
    musicId: [],
  };
  await watched.insertMany(initialEmptyWatched);
};
