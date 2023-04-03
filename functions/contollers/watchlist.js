const getError = require("../utils/getError");
const movies = require("../models/movies/movies.model");
const users = require("../models/users.model");
const books = require("../models/books/books.model");
const watchlist = require("../models/watchlist.model");
const mongoose = require("../utils/dbConn");

const addInitialEmptyWatchlist = (currentUserId) => {
  let initialEmptyWatchlist = {
    userId: currentUserId,
    bookId: [],
    movieId: [],
  };
  watchlist.insertMany(initialEmptyWatchlist);
};

const addToWatchlist = async (req, res, next) => {
  try {
    if (req.body && req.body.type && req.body.content && req.body.userid) {
      const currentUserId = req.body.userid.toString();
      let watchlistResult = await watchlist.find({
        userId: currentUserId,
      });
      if (watchlistResult.length == 0) {
        addInitialEmptyWatchlist(currentUserId);
        watchlistResult = await watchlist.find({
          userId: currentUserId,
        });
      }
      if (req.body.type === "movies") {
        let oldMovieArray = watchlistResult[0].movieId;
        oldMovieArray.push(req.body.content._id);
        const updateResult = await watchlist.findOneAndUpdate(
          { userId: currentUserId },
          { movieId: oldMovieArray }
        );
        res.status(200).json({
          success: true,
        });
      } else {
        let oldBookArray = watchlistResult[0].bookId;
        oldBookArray.push(req.body.content._id);
        const updateResult = await watchlist.findOneAndUpdate(
          { userId: currentUserId },
          { bookId: oldBookArray }
        );
        res.status(200).json({
          success: true,
        });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const removeFromWatchlist = async (req, res, next) => {
  try {
    if (req.body && req.body.type && req.body.content && req.body.userid) {
      const currentUserId = req.body.userid.toString();
      const watchlistResult = await watchlist.find({
        userId: currentUserId,
      });
      if (req.body.type === "movies") {
        let oldMovieArray = watchlistResult[0].movieId;
        oldMovieArray.remove(req.body.content._id);
        const updateResult = await watchlist.findOneAndUpdate(
          { userId: currentUserId },
          { movieId: oldMovieArray }
        );
        res.status(200).json({
          success: true,
        });
      } else {
        let oldBookArray = watchlistResult[0].bookId;
        oldBookArray.remove(req.body.content._id);
        const updateResult = await watchlist.findOneAndUpdate(
          { userId: currentUserId },
          { bookId: oldBookArray }
        );
        res.status(200).json({
          success: true,
        });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getWatchlist = async (req, res, next) => {
  try {
    const currentUserId = req.params.userid.toString();
    let watchlistResult = await watchlist.find({
      userId: currentUserId,
    });
    if (watchlistResult.length == 0) {
      addInitialEmptyWatchlist(currentUserId);
      watchlistResult = await watchlist.find({
        userId: currentUserId,
      });
    }
    let moviesResult = await movies.find({
      _id: {
        $in: watchlistResult[0].movieId,
      },
    });
    let booksResult = await books.find({
      _id: {
        $in: watchlistResult[0].bookId,
      },
    });
    moviesResult = moviesResult.map((item) => ({
      ...item.toObject(),
      watchlist: true,
    }));
    booksResult = booksResult.map((item) => ({
      ...item.toObject(),
      watchlist: true,
    }));
    const finalResult = {
      movies: moviesResult,
      books: booksResult,
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
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
};
