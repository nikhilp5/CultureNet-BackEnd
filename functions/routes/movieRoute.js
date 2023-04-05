const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const {verifyToken} = require('../contollers/user');


const movieController = require('../contollers/movie');
const movieRatingController=require('../contollers/movieRating')
const genresController = require('../contollers/movieGenre');


router.get('/movies',verifyToken, movieController.getAllMovies);
router.get('/movies/:id',verifyToken, movieController.getMovieById);
router.post('/movies',jsonParser, movieController.createMovie);


router.put('/movies/:id',jsonParser, movieController.updateMovie);

router.delete('/movies/:id', movieController.deleteMovie);

router.post('/movie_ratings', jsonParser,movieRatingController.createMovieRating);

router.get('/movie_ratings/:id/ratings', movieRatingController.getMovieRating);

router.get('/movie_ratings/:userId/:movieId', movieRatingController.getUserMovieRating);



router.get('/movie_genre', genresController.getAllGenres);


router.get('/movie_genre/:genreId', genresController.getGenreById);

router.post('/movie_genre', jsonParser, genresController.createGenre);


router.put('/movie_genre/:genreId',jsonParser, genresController.updateGenreById);


router.delete('/movie_genre/:genreId', genresController.deleteGenreById);

router.get('/movie_genres/:genreIds', genresController.getGenresByIds);

module.exports = router;
