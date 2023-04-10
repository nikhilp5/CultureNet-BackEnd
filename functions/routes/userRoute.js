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
  getUserProfileByID,
} = require('../contollers/user');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotPassword);
router.route('/verifycode').post(resetPassword);
router.route('/changepassword').put(verifyToken, changePassword);
router
  .route('/profile')
  .get(verifyToken, getUserProfile)
  .put(verifyToken, updateUserProfile);

router.route('/profile/:id').get(verifyToken, getUserProfileByID);

router.get('/', (req, res, next) => {
  res.send('Health OK');
});
router.get('/*', (req, res, next) => {
  res.send('<h1>Page Not Found</h1>');
});

module.exports = router;
