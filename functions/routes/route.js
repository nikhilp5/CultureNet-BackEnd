const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const {
  register,
  login,
  forgotPassword,
  changePassword,
  getUserProfile,
  updateUserProfile,
  verifyToken,
  resetPassword,
} = require('../contollers/user');

router.route('/register').post(jsonParser, register);
router.route('/login').post(jsonParser, login);
router.route('/forgotpassword').post(jsonParser, forgotPassword);
router.route('/changepassword').put(jsonParser, changePassword);
router.route('/profile').post(jsonParser, getUserProfile);
router.route('/resetpassword').post(jsonParser, resetPassword);
router.route('/token').get(jsonParser, verifyToken);
router.route('/updateprofile').put(jsonParser, updateUserProfile);
router.get('/', (req, res, next) => {
  res.send(
    '<h1>Boilerplate</h1>GET /user/:id<br/><br/>POST /add<br/> &nbsp; body data: {email: “xyz@xyz.ca”, firstName: “XYZ”}',
  );
});
router.get('/*', (req, res, next) => {
  res.send('<h1>Page Not Found</h1>');
});

module.exports = router;
