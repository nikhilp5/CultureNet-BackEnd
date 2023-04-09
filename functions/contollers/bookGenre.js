const mongoose = require('../utils/dbConn');
const genres = require('../models/books/bookGenre.model');

// Get all Books Genres
exports.getAllBookGenres = async (req, res) => {
    try {
      const bookGenre_ = await genres.find();
      res.json(bookGenre_);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  // Get Book Genre by ID
exports.getBookGenreById = async (req, res) => {
    const { id } = req.params;
    try {
      const bookGenre_ = await genres.findById(id);
      res.json(bookGenre_);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };