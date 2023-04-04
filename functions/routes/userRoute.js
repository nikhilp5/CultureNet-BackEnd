const express = require('express');

const router = express.Router();

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

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotPassword);
router.route('/changepassword').put(verifyToken, changePassword);
router.route('/profile').post(verifyToken, getUserProfile);
router.route('/resetpassword').post(resetPassword);
router.route('/updateprofile').put(verifyToken, updateUserProfile);
router.get('/', (req, res, next) => {
  res.send(
    '<h1>Boilerplate</h1>GET /user/:id<br/><br/>POST /add<br/> &nbsp; body data: {email: “xyz@xyz.ca”, firstName: “XYZ”}',
  );
});
router.get('/*', (req, res, next) => {
  res.send('<h1>Page Not Found</h1>');
});

module.exports = router;
