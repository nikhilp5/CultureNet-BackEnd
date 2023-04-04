const express = require("express");
const bodyParser = require("body-parser");

const searchWatchlistRoute = express.Router();
const jsonParser = bodyParser.json();

const { searchContent } = require("../contollers/search");
const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../contollers/watchlist");
const { verifyToken } = require("../contollers/user");

searchWatchlistRoute.route("/search/:searchterm/:userid").get(verifyToken, searchContent);
searchWatchlistRoute.route("/addToWatchlist").post(verifyToken, addToWatchlist);
searchWatchlistRoute
  .route("/removeFromWatchlist")
  .post(verifyToken, removeFromWatchlist);
searchWatchlistRoute.route("/getWatchlist/:userid").get(verifyToken, getWatchlist);

module.exports = searchWatchlistRoute;
