//Author-Nikhil Panikkassery (B00934514)

const getError = require("../utils/getError");
const movies = require("../models/movies/movies.model");
const users = require("../models/users.model");
const books = require("../models/books/books.model");
const watchlist = require("../models/watchlist.model");
const mongoose = require("../utils/dbConn");
const watched = require("../models/watched.model");
const music = require("../models/music/music.model");

const searchContent = async (req, res, next) => {
  try {
    let searchTerm = req.params.searchterm;
    searchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');
    const currentUserId = req.data.user._id;
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
    let musicResult = await music
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
      musicResult = await music.find().sort({ title: "ascending" });
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
    let updatedMusicResults = musicResult;

    let movieWatchlistContent = watchlistResult[0].movieId;
    movieWatchlistContent.forEach((watchlistMovie) => {
      moviesResult.forEach((movieRes, index) => {
        let bufferImg=movieRes.image;
        if (watchlistMovie.toString() === movieRes._id.toString()) {
          let watchlist = true;
          let movie = { ...movieRes.toObject(), watchlist };
          updatedMovieResults[index] = movie;
          updatedMovieResults[index]["image"]=bufferImg;
        }
      });
    });

    let bookWatchlistContent = watchlistResult[0].bookId;
    bookWatchlistContent.forEach((watchlistBook) => {
      booksResult.forEach((bookRes, index) => {
        let bufferImg=bookRes.image;
        if (watchlistBook.toString() === bookRes._id.toString()) {
          let watchlist = true;
          let book = { ...bookRes.toObject(), watchlist };
          updatedBookResults[index] = book;
          updatedBookResults[index]["image"]=bufferImg;
        }
      });
    });

    let musicWatchlistContent = watchlistResult[0].musicId;
    musicWatchlistContent.forEach((watchlistMusic) => {
      musicResult.forEach((musicRes, index) => {
        let bufferImg=musicRes.image;
        if (watchlistMusic.toString() === musicRes._id.toString()) {
          let watchlist = true;
          let music = { ...musicRes.toObject(), watchlist };
          updatedMusicResults[index] = music;
          updatedMusicResults[index]["image"]=bufferImg;
        }
      });
    });

    let movieWatchedContent = watchedResult[0].movieId;
    movieWatchedContent.forEach((watchedMovie) => {
      moviesResult.forEach((movieRes, index) => {
        let bufferImg=movieRes.image;
        if (watchedMovie.toString() === movieRes._id.toString()) {
          let watched = true;
          let movie = { ...movieRes.toObject(), watched };
          updatedMovieResults[index] = movie;
          updatedMovieResults[index]["image"]=bufferImg;
        }
      });
    });

    let bookWatchedContent = watchedResult[0].bookId;
    bookWatchedContent.forEach((watchedBook) => {
      booksResult.forEach((bookRes, index) => {
        let bufferImg=bookRes.image;
        if (watchedBook.toString() === bookRes._id.toString()) {
          let watched = true;
          let book = { ...bookRes.toObject(), watched };
          updatedBookResults[index] = book;
          updatedBookResults[index]["image"]=bufferImg;
        }
      });
    });

    let musicWatchedContent = watchedResult[0].musicId;
    musicWatchedContent.forEach((watchedMusic) => {
      musicResult.forEach((musicRes, index) => {
        let bufferImg=musicRes.image;
        if (watchedMusic.toString() === musicRes._id.toString()) {
          let watched = true;
          let music = { ...musicRes.toObject(), watched };
          updatedMusicResults[index] = music;
          updatedMusicResults[index]["image"]=bufferImg;
        }
      });
    });

    const finalResult = {
      movies: updatedMovieResults,
      books: updatedBookResults,
      users: usersResult,
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
module.exports = {
  searchContent,
};
