const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const searchWatchlistRoute = require('./routes/searchWatchlistRoute');
const userRoute = require('./routes/userRoute');
const movieRoute = require('./routes/movieRoute');
const musicRoute = require('./routes/musicRoute');
const reviewRoute = require('./routes/reviewRoute');
const bookRoute = require('./routes/bookRoute');
const adminRoute = require('./routes/adminRoute');
const errorHandler = require('./utils/errorHandler');
const jsonParser = bodyParser.json({limit: '5mb'});
const followRoute=require('./routes/followerFollowingRoute')

app.use(cors());
app.use(jsonParser);
app.use("/.netlify/functions/api", followRoute);
app.use('/.netlify/functions/api', searchWatchlistRoute);
app.use('/.netlify/functions/api', movieRoute);
app.use('/.netlify/functions/api', musicRoute);
app.use('/.netlify/functions/api', bookRoute);
app.use('/.netlify/functions/api', reviewRoute);
app.use('/.netlify/functions/api', userRoute);
app.use('/.netlify/functions/api', adminRoute);

app.use('/.netlify/functions/api', errorHandler);

module.exports = app;
module.exports.handler = serverless(app);
