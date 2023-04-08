const mongoose = require('../utils/dbConn');
const Review = require('../models/review.model');

// Create a new Content review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    console.log(req.body)
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing review by User
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const userInfo = req.user;
  console.log('user info are: ' + userInfo);

  try {
    const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review by User for a Content
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    await Review.findByIdAndDelete(id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all reviews
exports.getAllReviews = async (req, res, next) => {
  try {
    // const { email } = req.data.user;
    console.log("User request obj is email: " + req.data.email.email);

    // console.log('user info are: ' + userInfo);

    const { contentId } = req.query
    if (contentId)
    {
        const filteredReviews = await Review.find({ contentId: contentId });
        res.json(filteredReviews);
    }
    else {
        const reviews = await Review.find();
        res.json(reviews);
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
