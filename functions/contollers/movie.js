const mongoose = require('../utils/dbConn');
const Movie = require('../models/movies/movies.model');

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    console.log(req.body)
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

    res.json(movie);
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
