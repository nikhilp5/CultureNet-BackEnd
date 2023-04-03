const express = require('express');
const serverless = require('serverless-http');
const app = express();
require('dotenv').config();

const routes = require('./routes/route');
const errorHandler = require('./utils/errorHandler');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

app.use('/.netlify/functions/api', routes);
app.use('/.netlify/functions/api', errorHandler);

module.exports = app;
module.exports.handler = serverless(app);
