const mongoose = require('mongoose');
const conn_string =
  'mongodb+srv://pranay:yanarp@culturenet.2dvyi76.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(conn_string)
  .then((db) => {
    console.info('MongoDB connected');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
