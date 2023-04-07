const mongoose = require('../utils/dbConn');
const Book = require('../models/books/books.model');

// Get all Books
exports.getAllBooks = async (req, res) => {
    try {
        const { title, authors, genre } = req.query;
        const books = await Book.find();
        const filteredBooks = books;

        // if (title) {
        //     console.log("------------------------------------------");
        //     filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
        //     console.log("------------------------------------------");
        //     console.log("Filtered books after query: " + filteredBooks);
        // }
        
        // if (authors) {
        //     filteredBooks = filteredBooks.filter(book => {
        //       const bookAuthors = book.authors.map(author => author.toLowerCase());
        //       const queryAuthors = authors.toLowerCase().split(',');
        //       return queryAuthors.every(queryAuthor => bookAuthors.includes(queryAuthor));
        //     });
        //   }
        
        // if (genre) {
        //     filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
        // }
        
        res.json(filteredBooks);

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


