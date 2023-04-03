const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
require("dotenv").config();

const searchWatchlistRoute = require("./routes/searchWatchlistRoute");
const errorHandler = require("./utils/errorHandler");

app.use(cors());
app.use("/.netlify/functions/api", searchWatchlistRoute);
app.use("/.netlify/functions/api", errorHandler);

module.exports = app;
module.exports.handler = serverless(app);
