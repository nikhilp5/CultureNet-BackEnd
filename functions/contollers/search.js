//Author-Nikhil Panikkassery (B00934514)

const getError = require("../utils/getError");
const movies = require("../models/movies/movies.model");
const users = require("../models/users.model");
const books = require("../models/books/books.model");
const watchlist = require("../models/watchlist.model");
const mongoose = require("../utils/dbConn");
const watched = require("../models/watched.model");

const searchContent = async (req, res, next) => {
  try {
    const searchTerm = req.params.searchterm;
    const currentUserId = req.params.userid.toString();
    let moviesResult = await movies
      .find({
        $or: [{ title: { $regex: ".*" + searchTerm + ".*", $options: "i" } }],
      })
      .sort({ title: "ascending" });
    let usersResult = await users
      .find({
        $or: [
          { firstName: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
          { lastName: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
        ],
      })
      .sort({ firstName: "ascending" });
    let booksResult = await books
      .find({
        $or: [{ title: { $regex: ".*" + searchTerm + ".*", $options: "i" } }],
      })
      .sort({ title: "ascending" });

    if (
      searchTerm.trim() === "" ||
      searchTerm.trim() === "null" ||
      searchTerm === null
    ) {
      moviesResult = await movies.find().sort({ title: "ascending" });
      usersResult = await users.find().sort({ firstName: "ascending" });
      booksResult = await books.find().sort({ title: "ascending" });
    }

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
    let updatedMovieResults = moviesResult;
    let updatedBookResults = booksResult;

    let movieWatchlistContent = watchlistResult[0].movieId;
    movieWatchlistContent.forEach((watchlistMovie) => {
      moviesResult.forEach((movieRes, index) => {
        if (watchlistMovie.toString() === movieRes._id.toString()) {
          let watchlist = true;
          let movie = { ...movieRes.toObject(), watchlist };
          updatedMovieResults[index] = movie;
        }
      });
    });

    let bookWatchlistContent = watchlistResult[0].bookId;
    bookWatchlistContent.forEach((watchlistBook) => {
      booksResult.forEach((bookRes, index) => {
        if (watchlistBook.toString() === bookRes._id.toString()) {
          let watchlist = true;
          let book = { ...bookRes.toObject(), watchlist };
          updatedBookResults[index] = book;
        }
      });
    });

    let movieWatchedContent = watchedResult[0].movieId;
    movieWatchedContent.forEach((watchedMovie) => {
      moviesResult.forEach((movieRes, index) => {
        if (watchedMovie.toString() === movieRes._id.toString()) {
          let watched = true;
          let movie = { ...movieRes.toObject(), watched };
          updatedMovieResults[index] = movie;
        }
      });
    });

    let bookWatchedContent = watchedResult[0].bookId;
    bookWatchedContent.forEach((watchedBook) => {
      booksResult.forEach((bookRes, index) => {
        if (watchedBook.toString() === bookRes._id.toString()) {
          let watched = true;
          let book = { ...bookRes.toObject(), watched };
          updatedBookResults[index] = book;
        }
      });
    });

    const finalResult = {
      movies: updatedMovieResults,
      books: updatedBookResults,
      users: usersResult,
    };
    res.status(200).json({
      success: true,
      result: finalResult,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const addInitialEmptyWatchlist = async (currentUserId) => {
  let initialEmptyWatchlist = {
    userId: currentUserId,
    bookId: [],
    movieId: [],
  };
  await watchlist.insertMany(initialEmptyWatchlist);
};

const addInitialEmptyWatched = async (currentUserId) => {
  let initialEmptyWatched = {
    userId: currentUserId,
    bookId: [],
    movieId: [],
  };
  await watched.insertMany(initialEmptyWatched);
};
module.exports = {
  searchContent,
};
