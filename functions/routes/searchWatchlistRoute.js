//Author-Nikhil Panikkassery (B00934514)

const express = require("express");
const bodyParser = require("body-parser");

const searchWatchlistRoute = express.Router();
const jsonParser = bodyParser.json();

const { searchContent } = require("../contollers/search");
const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  addToWatched,
  removeFromWatched,
  getWatched,
} = require("../contollers/watchlist");
const { verifyToken } = require("../contollers/user");

searchWatchlistRoute.route("/search/:searchterm").get(verifyToken,searchContent);
searchWatchlistRoute.route("/addToWatchlist").post(verifyToken,addToWatchlist);
searchWatchlistRoute.route("/removeFromWatchlist").post(verifyToken,removeFromWatchlist);
searchWatchlistRoute.route("/getWatchlist").get(verifyToken,getWatchlist);
searchWatchlistRoute.route("/addToWatched").post(verifyToken,addToWatched);
searchWatchlistRoute.route("/removeFromWatched").post(verifyToken,removeFromWatched);
searchWatchlistRoute.route("/getWatched").get(verifyToken,getWatched);

module.exports = searchWatchlistRoute;
