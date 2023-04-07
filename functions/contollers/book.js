const mongoose = require('../utils/dbConn');
const Book = require('../models/books/books.model');

// Get all Books
exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  // Get Book by ID
exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findById(id);
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };