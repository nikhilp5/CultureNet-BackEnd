const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const {verifyToken} = require('../contollers/user');

const { fetchFollowStatus, followUser, unfollowUser, getFollowCounts, getFollowCountsByID, getAllFollowers, getAllFollowing } = require('../contollers/followerFollowing');

// Follow a user
router.get('/user/:displayedUserId/fetchFollowStatus',verifyToken, fetchFollowStatus);
router.post('/user/:displayedUserId/follow',verifyToken, followUser);

// Unfollow a user
router.post('/user/:displayedUserId/unfollow', verifyToken, unfollowUser);


router.get('/follow-count', verifyToken, getFollowCounts);

router.get('/follow-count/:id', verifyToken, getFollowCountsByID);

// Route to get all followers for a user
router.get('/user/followers', verifyToken, getAllFollowers);

// Route to get all following for a user
router.get('/user/following', verifyToken, getAllFollowing);
module.exports = router;
