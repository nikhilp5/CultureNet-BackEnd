const Music = require('../models/music/music.model');
const watchlist = require('../models/watchlist.model');
const watched = require('../models/watched.model');

const fetchAllMusic = async (req, res, next) => {
  try {
    res.json({
      message: 'Music fetched',
      success: true,
      music: await Music.find(),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const fetchMusicById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const music = await Music.findById(id);
    const userId = req.data.user._id;

    let updatedMusic = music;
    let watchlistResult = await watchlist.find({
      userId,
    });

    let watchedResult = await watched.find({
      userId,
    });

    if (watchlistResult.length == 0) {
      await addInitialEmptyWatchlist(userId);
      watchlistResult = await watchlist.find({
        userId,
      });
    }

    if (watchedResult.length == 0) {
      await addInitialEmptyWatched(userId);
      watchedResult = await watched.find({
        userId,
      });
    }

    let musicWatchlistContent = watchlistResult[0].musicId;
    let bufferImg=music.image;
    musicWatchlistContent.forEach((watchlistBook) => {
      if (watchlistBook.toString() === music._id.toString()) {
        let watchlist = true;
        updatedMusic = { ...music.toObject(), watchlist };
      }
    });

    let musicWatchedContent = watchedResult[0].musicId;
    musicWatchedContent.forEach((watchedBook) => {
      if (watchedBook.toString() === music._id.toString()) {
        let watched = true;
        updatedMusic = { ...music.toObject(), watched };
      }
    });
    updatedMusic["image"]=bufferImg;
    res.json(updatedMusic);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addInitialEmptyWatchlist = async (userId) => {
  try {
    let initialEmptyWatchlist = {
      userId,
      musicId: [],
      movieId: [],
      bookId: [],
    };
    await watchlist.insertMany(initialEmptyWatchlist);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addInitialEmptyWatched = async (userId) => {
  try {
    let initialEmptyWatched = {
      userId,
      musicId: [],
      movieId: [],
      bookId: [],
    };
    await watched.insertMany(initialEmptyWatched);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  fetchAllMusic,
  fetchMusicById,
};
