const mongoose = require('../utils/dbConn');
const Book = require('../models/books/books.model');
const watchlist = require("../models/watchlist.model");
const watched = require("../models/watched.model");

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
      const currentUserId=req.data.user._id;
    //watchlist changes
    let updatedBook=book;
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

    let bookWatchlistContent = watchlistResult[0].bookId;
    let bufferImg=book.image;
    bookWatchlistContent.forEach((watchlistBook) => {
        if (watchlistBook.toString() === book._id.toString()) {
          let watchlist = true;
          updatedBook = { ...book.toObject(), watchlist };
        }
    });

    let bookWatchedContent = watchedResult[0].bookId;
    bookWatchedContent.forEach((watchedBook) => {
        if (watchedBook.toString() === book._id.toString()) {
          let watched = true;
          updatedBook = { ...book.toObject(), watched };
        }
    });
      updatedBook["image"]=bufferImg;
      res.json(updatedBook);
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

