//Author-Nikhil Panikkassery (B00934514)

const getError = require("../utils/getError");
const movies = require("../models/movies/movies.model");
const users = require("../models/users.model");
const books = require("../models/books/books.model");
const watchlist = require("../models/watchlist.model");
const mongoose = require("../utils/dbConn");
const watched = require("../models/watched.model");
const music = require("../models/music/music.model");

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

const addToWatchlist = async (req, res, next) => {
  try {
    if (req.body && req.body.type && req.body.content && req.body.userid) {
      const currentUserId = req.data.user._id;
      let watchlistResult = await watchlist.find({
        userId: currentUserId,
      });
      if (watchlistResult.length == 0) {
        await addInitialEmptyWatchlist(currentUserId);
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
      }
      if (req.body.type === "books") {
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
      if (req.body.type === "music") {
        let oldMusicArray = watchlistResult[0].musicId;
        oldMusicArray.push(req.body.content._id);
        const updateResult = await watchlist.findOneAndUpdate(
          { userId: currentUserId },
          { musicId: oldMusicArray }
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
      const currentUserId = req.data.user._id;
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
      }
      if (req.body.type === "books") {
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
      if (req.body.type === "music") {
        let oldMusicArray = watchlistResult[0].musicId;
        oldMusicArray.remove(req.body.content._id);
        const updateResult = await watchlist.findOneAndUpdate(
          { userId: currentUserId },
          { musicId: oldMusicArray }
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
    const currentUserId = req.data.user._id;
    let watchlistResult = await watchlist.find({
      userId: currentUserId,
    });
    if (watchlistResult.length == 0) {
      await addInitialEmptyWatchlist(currentUserId);
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
    let musicResult = await music.find({
      _id: {
        $in: watchlistResult[0].musicId,
      },
    });
    let updatedMovieResults = moviesResult;
    let updatedBookResults = booksResult;
    let updatedMusicResults = musicResult;

    moviesResult.forEach((movieRes, index) => {
      let bufferImg=movieRes.image;
        let watchlist = true;
        let movie = { ...movieRes.toObject(), watchlist };
        updatedMovieResults[index] = movie;
        updatedMovieResults[index]["image"]=bufferImg;
    });
    booksResult.forEach((bookRes, index) => {
      let bufferImg=bookRes.image;
        let watchlist = true;
        let book = { ...bookRes.toObject(), watchlist };
        updatedBookResults[index] = book;
        updatedBookResults[index]["image"]=bufferImg;
    });
    musicResult.forEach((musicRes, index) => {
      let bufferImg=musicRes.image;
        let watchlist = true;
        let music = { ...musicRes.toObject(), watchlist };
        updatedMusicResults[index] = music;
        updatedMusicResults[index]["image"]=bufferImg;
    });
    const finalResult = {
      movies: updatedMovieResults,
      books: updatedBookResults,
      music: updatedMusicResults,
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

const addToWatched = async (req, res, next) => {
  try {
    if (req.body && req.body.type && req.body.content && req.body.userid) {
      const currentUserId = req.data.user._id;
      let watchedResult = await watched.find({
        userId: currentUserId,
      });
      if (watchedResult.length == 0) {
        await addInitialEmptyWatched(currentUserId);
        watchedResult = await watched.find({
          userId: currentUserId,
        });
      }
      if (req.body.type === "movies") {
        let oldMovieArray = watchedResult[0].movieId;
        oldMovieArray.push(req.body.content._id);
        const updateResult = await watched.findOneAndUpdate(
          { userId: currentUserId },
          { movieId: oldMovieArray }
        );
        res.status(200).json({
          success: true,
        });
      }
      if (req.body.type === "books") {
        let oldBookArray = watchedResult[0].bookId;
        oldBookArray.push(req.body.content._id);
        const updateResult = await watched.findOneAndUpdate(
          { userId: currentUserId },
          { bookId: oldBookArray }
        );
        res.status(200).json({
          success: true,
        });
      }
      if (req.body.type === "music") {
        let oldMusicArray = watchedResult[0].musicId;
        oldMusicArray.push(req.body.content._id);
        const updateResult = await watched.findOneAndUpdate(
          { userId: currentUserId },
          { musicId: oldMusicArray }
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

const removeFromWatched = async (req, res, next) => {
  try {
    if (req.body && req.body.type && req.body.content && req.body.userid) {
      const currentUserId = req.data.user._id;
      const watchedResult = await watched.find({
        userId: currentUserId,
      });
      if (req.body.type === "movies") {
        let oldMovieArray = watchedResult[0].movieId;
        oldMovieArray.remove(req.body.content._id);
        const updateResult = await watched.findOneAndUpdate(
          { userId: currentUserId },
          { movieId: oldMovieArray }
        );
        res.status(200).json({
          success: true,
        });
      }
      if (req.body.type === "books") {
        let oldBookArray = watchedResult[0].bookId;
        oldBookArray.remove(req.body.content._id);
        const updateResult = await watched.findOneAndUpdate(
          { userId: currentUserId },
          { bookId: oldBookArray }
        );
        res.status(200).json({
          success: true,
        });
      }
      if (req.body.type === "music") {
        let oldMusicArray = watchedResult[0].musicId;
        oldMusicArray.remove(req.body.content._id);
        const updateResult = await watched.findOneAndUpdate(
          { userId: currentUserId },
          { musicId: oldMusicArray }
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

const getWatched = async (req, res, next) => {
  try {
    const currentUserId = req.data.user._id;
    let watchedResult = await watched.find({
      userId: currentUserId,
    });
    if (watchedResult.length == 0) {
      await addInitialEmptyWatched(currentUserId);
      watchedResult = await watched.find({
        userId: currentUserId,
      });
    }
    let moviesResult = await movies.find({
      _id: {
        $in: watchedResult[0].movieId,
      },
    });
    let booksResult = await books.find({
      _id: {
        $in: watchedResult[0].bookId,
      },
    });
    let musicResult = await music.find({
      _id: {
        $in: watchedResult[0].musicId,
      },
    });
    let updatedMovieResults = moviesResult;
    let updatedBookResults = booksResult;
    let updatedMusicResults = musicResult;

    moviesResult.forEach((movieRes, index) => {
      let bufferImg=movieRes.image;
        let watched = true;
        let movie = { ...movieRes.toObject(), watched };
        updatedMovieResults[index] = movie;
        updatedMovieResults[index]["image"]=bufferImg;
    });
    booksResult.forEach((bookRes, index) => {
      let bufferImg=bookRes.image;
        let watched = true;
        let book = { ...bookRes.toObject(), watched };
        updatedBookResults[index] = book;
        updatedBookResults[index]["image"]=bufferImg;
    });
    musicResult.forEach((musicRes, index) => {
      let bufferImg=musicRes.image;
        let watched = true;
        let music = { ...musicRes.toObject(), watched };
        updatedMusicResults[index] = music;
        updatedMusicResults[index]["image"]=bufferImg;
    });
    const finalResult = {
      movies: updatedMovieResults,
      books: updatedBookResults,
      music: updatedMusicResults,
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
  addToWatched,
  removeFromWatched,
  getWatched,
};
