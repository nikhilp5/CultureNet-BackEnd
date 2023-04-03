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

searchWatchlistRoute.route("/search/:searchterm/:userid").get(searchContent);
searchWatchlistRoute.route("/addToWatchlist").post(jsonParser, addToWatchlist);
searchWatchlistRoute
  .route("/removeFromWatchlist")
  .post(jsonParser, removeFromWatchlist);
searchWatchlistRoute.route("/getWatchlist/:userid").get(getWatchlist);

module.exports = searchWatchlistRoute;
