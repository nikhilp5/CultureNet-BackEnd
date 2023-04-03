const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const { fetchUserById, addUser } = require('../contollers/user');
const { searchContent } = require('../contollers/search');
const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require('../contollers/watchlist');

router.route('/user/:id').get(fetchUserById);
router.route('/add').post(jsonParser, addUser);
router.route('/search/:searchterm').get(searchContent);
router.route('/addToWatchlist').post(jsonParser, addToWatchlist);
router.route('/removeFromWatchlist').post(jsonParser, removeFromWatchlist);
router.route('/getWatchlist').get(getWatchlist);
router.get('/', (req, res, next) => {
  res.send(
    '<h1>Boilerplate</h1>GET /user/:id<br/><br/>POST /add<br/> &nbsp; body data: {email: “xyz@xyz.ca”, firstName: “XYZ”}',
  );
});
router.get('/*', (req, res, next) => {
  res.send('<h1>Page Not Found</h1>');
});

module.exports = router;
