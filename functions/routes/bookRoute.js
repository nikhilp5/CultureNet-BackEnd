const express = require('express');
const router = express.Router();

const { verifyToken } = require('../contollers/user');
const bookController = require('../contollers/book');
const bookGenreController = require('../contollers/bookGenre')

router.get('/books', verifyToken, bookController.getAllBooks);
router.get('/books/:id', verifyToken, bookController.getBookById);

router.get('/bookgenre', verifyToken, bookGenreController.getAllBookGenres);
router.get('/bookgenre/:id', verifyToken, bookGenreController.getBookGenreById);

module.exports = router;
