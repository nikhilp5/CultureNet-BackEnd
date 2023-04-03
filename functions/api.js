const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const errorHandler = require('./utils/errorHandler');
const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);
app.use('/.netlify/functions/api', userRoute);
app.use('/.netlify/functions/api', errorHandler);

module.exports = app;
module.exports.handler = serverless(app);
