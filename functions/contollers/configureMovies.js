//Author - Rishi Vasa (B00902815)

const getError = require("../utils/getError");
const mongoose = require("../utils/dbConn");
const Movie = require("../models/movies/movies.model")

const addMovie = async (req, res, next) => {
    try {
        console.log("Request received to addMovie: " + JSON.stringify(req.body));

        if (req.body && req.body.title && req.body.description && req.body.dateReleased && req.body.director) {

            const { title, description, dateReleased, director } = req.body;

            const newMovie = new Movie({
                title,
                description,
                dateReleased,
                director,
            });

            if (req.file) {
                const imageBuffer = req.file.buffer;
                newMovie.image = imageBuffer;
            }

            if (req.body.genres) {
                newMovie.genre = req.body.genres
            }

            await newMovie.save();

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

const updateMovie = async (req, res, next) => {
    try {
        const { movieID } = req.params;
        console.log("Request received to updateMovie " + movieID);

        const title = req.body.title;
        const description = req.body.description;
        const dateReleased = req.body.dateReleased;
        const director = req.body.director;

        const updatedMovie = {
            title,
            description,
            dateReleased,
            director,
        };

        if (req.file) {
            const imageBuffer = req.file.buffer;
            updatedMovie.image = imageBuffer;
        } else if (req.body.image) {
            updatedMovie.image = req.body.image
        } else {
            updatedMovie.image = null;
        }

        if (req.body.genres) {
            updatedMovie.genre = req.body.genres
        } else {
            updatedMovie.genre = null;
        }

        const movie = await Movie.findOneAndUpdate(
            { _id: movieID },
            { $set: updatedMovie },
            { new: true, upsert: false }
        );
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({
            success: true,
            movie
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({ success: false, message: err.message });
        }
        console.log(err);
        next(err);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const { movieID } = req.params;
        console.log("Request received to deleteMovie " + movieID);

        const movie = await Movie.findOneAndDelete({ _id: movieID });
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Movie deleted successfully'
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = {
    addMovie,
    updateMovie,
    deleteMovie
};
