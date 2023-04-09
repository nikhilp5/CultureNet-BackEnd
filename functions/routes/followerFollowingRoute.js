const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const {verifyToken} = require('../contollers/user');

const { followUser, unfollowUser, getFollowCounts } = require('../contollers/followerFollowing');

// Follow a user
router.post('/user/:displayedUserId/follow',verifyToken, followUser);

// Unfollow a user
router.post('/user/:displayedUserId/unfollow', verifyToken, unfollowUser);


router.get('/follow-count', verifyToken, getFollowCounts);
module.exports = router;
