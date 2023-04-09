//Author - Rishi Vasa (B00902815)

const getError = require("../utils/getError");
const mongoose = require("../utils/dbConn");
const Book = require("../models/books/books.model")

const addBook = async (req, res, next) => {
    try {
        console.log("Request received to addBook: " + JSON.stringify(req.body));

        if (req.body && req.body.title && req.body.description && req.body.dateReleased ) {

            const { title, description, authors, dateReleased, genre, publisher, isbn, summary } = req.body;

            const newBook = new Book({
                title,
                description,
                authors,
                dateReleased,
                genre,
                publisher,
                isbn,
                summary
            });

            if (req.file) {
                const imageBuffer = req.file.buffer;
                newBook.image = imageBuffer;
            }

            await newBook.save();

            res.status(200).json({
                success: true,
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Mandatory Fields Not Found"
            })
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const { bookID } = req.params;
        console.log("Request received to updateBook " + bookID);

        const title = req.body.title;
        const description = req.body.description;
        const dateReleased = req.body.dateReleased;
        const authors = req.body.authors;
        const publisher = req.body.publisher;
        const isbn = req.body.isbn;
        const summary = req.body.summary;
        const genre = req.body.genre;

        const updatedBook = {
            title,
            description,
            dateReleased,
            authors,
            publisher,
            isbn,
            summary,
            genre
        };

        if (req.file) {
            const imageBuffer = req.file.buffer;
            updatedBook.image = imageBuffer;
        } else if (req.body.image) {
            updatedBook.image = req.body.image
        } else {
            updatedBook.image = null;
        }

        const book = await Book.findOneAndUpdate(
            { _id: bookID },
            { $set: updatedBook },
            { new: true, upsert: false }
        );
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({
            success: true,
            book
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({ success: false, message: err.message });
        }
        console.log(err);
        next(err);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { bookID } = req.params;
        console.log("Request received to deleteBook " + bookID);

        const book = await Book.findOneAndDelete({ _id: bookID });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = {
    addBook,
    updateBook,
    deleteBook
};
