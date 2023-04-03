const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/route');
const errorHandler = require('./utils/errorHandler');

app.use(cors());

app.use('/.netlify/functions/api', routes);
app.use('/.netlify/functions/api', errorHandler);

module.exports = app;
module.exports.handler = serverless(app);
