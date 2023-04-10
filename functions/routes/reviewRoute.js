const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const {verifyToken} = require('../contollers/user');
const reviewController = require('../contollers/review');

router.get('/reviews', verifyToken, reviewController.getAllReviews);
router.post('/reviews', verifyToken, jsonParser, reviewController.createReview);
router.put('/reviews/:id', verifyToken, jsonParser, reviewController.updateReview);
router.delete('/reviews/:id', verifyToken, reviewController.deleteReview);
router.get('/user_reviews', verifyToken, reviewController.getUserReviews);
router.get('/user_reviews/:id', verifyToken, reviewController.getUserReviews);

module.exports = router;
