const mongoose = require('../utils/dbConn');
const Review = require('../models/review.model');

// Create a new Content review
exports.createReview = async (req, res) => {
    try {
        const userId = req.data.user._id;
        req.body['userId'] = userId;

        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    
        } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing review by User
exports.updateReview = async (req, res) => {
    const { id } = req.params;

    const userId = req.data.user._id;
    req.body['userId'] = userId;

    const query = { _id: id, userId: userId };

    try {
        const review = await Review.findByIdAndUpdate(query, req.body, { new: true });
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a review by User for a Content
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    const query  = { _id: id, userId: req.data.user._id };

    try {
        await Review.findByIdAndDelete(query);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all reviews
exports.getAllReviews = async (req, res, next) => {
    try {
    const userId = req.data.user._id;
    console.log("user id is: " + userId );
    const { contentId } = req.query

    if (contentId)
    {
        const filteredReviews = await Review.find({ contentId: contentId });
        
        filteredReviews.sort((a, b) => {
            if (a.userId === userId) {
                return -1; 
            } else if (b.userId === userId) {
                return 1; 
            } else {
                return 0;
            }
        });
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
