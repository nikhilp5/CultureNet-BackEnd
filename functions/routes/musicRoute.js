const express = require('express');

const router = express.Router();

const { verifyToken } = require('../contollers/user');
const { fetchAllMusic, fetchMusicById } = require('../contollers/music');

router.route('/music').get(verifyToken, fetchAllMusic);
router.route('/music/:id').get(verifyToken, fetchMusicById);

module.exports = router;
