const User = require('../models/users.model');
const mongoose = require('../utils/dbConn');
// Follow a user
exports.followUser = async (req, res) => {
  const { displayedUserId } = req.params;
//   console.log(displayedUserId)
  const loggedInUserId =  req.data.user._id;

  try {
    const displayedUser = await User.findById(displayedUserId);
    const loggedInUser = await User.findById(loggedInUserId);

    if (!displayedUser || !loggedInUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the logged-in user is already following the displayed user
    if (loggedInUser.following.includes(displayedUserId)) {
      return res.status(200).json({ 'isFollowing': true });
    }

    // Add displayed user to the following list of the logged-in user
    loggedInUser.following.push(displayedUserId);
    await loggedInUser.save();

    // Add logged-in user to the follower list of the displayed user
    displayedUser.followers.push(loggedInUserId);
    await displayedUser.save();

    res.json({ message: 'Followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.getFollowCounts = async (req, res) => {
  try {
    const userId = req.data.user._id;
    console.log(userId)
    const user = await User.findById(userId);
    console.log(user)
    const followerCount = user.followers.length;
    const followingCount = user.following.length;
    res.json({ followerCount, followingCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server  E error' });
  }
};



// Unfollow a user
exports.unfollowUser = async (req, res) => {
  const { displayedUserId } = req.params;
  const loggedInUserId = req.data.user._id;
  

  try {
    const displayedUser = await User.findById(displayedUserId);
    const loggedInUser = await User.findById(loggedInUserId);

    if (!displayedUser || !loggedInUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the logged-in user is not following the displayed user
    if (!loggedInUser.following.includes(displayedUserId)) {
      return res.status(200).json({ 'isFollowing': false });
    }
    // console.log('Before update', loggedInUser.following.toObject());
    // console.log('Before update', displayedUser.followers.toObject());
    // Remove displayed user from the following list of the logged-in user
    console.log(loggedInUser.following.toObject())
    loggedInUser.following = loggedInUser.following.filter(
      (id) => {
        id !== mongoose.Types.ObjectId.createFromHexString(displayedUserId)
    }
    );
    console.log(loggedInUser.following.toObject())
    await loggedInUser.save();
   
    // Remove logged-in user from the follower list of the displayed user
    displayedUser.followers = displayedUser.followers.filter(
      (id) => {
         id !== mongoose.Types.ObjectId.createFromHexString(loggedInUserId)
        }
    );
    await displayedUser.save();

    res.json({ message: 'Unfollowed successfully' });
    console.log('After update', loggedInUser.following);
    console.log('After update', displayedUser.followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
