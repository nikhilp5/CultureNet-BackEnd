const getError = require("../utils/getError");
const movies = require("../models/movies/movies.model");
const users = require("../models/users.model");
const books = require("../models/books/books.model");
const watchlist = require("../models/watchlist.model");
const mongoose = require("../utils/dbConn");

const searchContent = async (req, res, next) => {
  try {
    const searchTerm = req.params.searchterm;
    let moviesResult = await movies
      .find({
        $or: [
          { title: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
          { description: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
          { director: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
        ],
      })
      .sort({ title: "ascending" });
    const usersResult = await users
      .find({
        $or: [
          { firstName: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
          { lastName: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
        ],
      })
      .sort({ firstName: "ascending" });
    let booksResult = await books
      .find({
        $or: [
          { title: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
          { description: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
        ],
      })
      .sort({ title: "ascending" });

    const watchlistResult = await watchlist.find({
      userId: "6424fbfd655f8005ee60191e",
    });
    let updatedMovieResults = moviesResult;
    let updatedBookResults = booksResult;
    if (watchlistResult[0].movieId.length > 0) {
      let movieWatchlistContent = watchlistResult[0].movieId;
      movieWatchlistContent.forEach((watchlistMovie) => {
        moviesResult.forEach((movieRes, index) => {
          if (watchlistMovie.toString() === movieRes._id.toString()) {
            let watchlist = true;
            movie = { ...movieRes.toObject(), watchlist };
            updatedMovieResults[index] = movie;
          }
        });
      });
    } else {
      moviesResult = moviesResult.map((item) => ({
        ...item.toObject(),
        watchlist: false,
      }));
    }
    if (watchlistResult[0].bookId.length > 0) {
      let bookWatchlistContent = watchlistResult[0].bookId;
      bookWatchlistContent.forEach((watchlistBook) => {
        booksResult.forEach((bookRes, index) => {
          if (watchlistBook.toString() === bookRes._id.toString()) {
            let watchlist = true;
            book = { ...bookRes.toObject(), watchlist };
            updatedBookResults[index] = book;
          }
        });
      });
    } else {
      booksResult = booksResult.map((item) => ({
        ...item.toObject(),
        watchlist: false,
      }));
    }
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

module.exports = {
  searchContent,
};
