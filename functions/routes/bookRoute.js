const express = require('express');
const router = express.Router();

const { verifyToken } = require('../contollers/user');
const bookController = require('../contollers/book');

router.get('/books', verifyToken, bookController.getAllBooks);
router.get('/books/:id', verifyToken, bookController.getBookById);

module.exports = router;
