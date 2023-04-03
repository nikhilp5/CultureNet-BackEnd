const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const { fetchUserById, addUser } = require('../contollers/user');
const movieController = require('../contollers/movie');
const movieRatingController=require('../contollers/movieRating')
const genresController = require('../contollers/movieGenre');

router.route('/user/:id').get(fetchUserById);
router.route('/add').post(jsonParser, addUser);
router.get('/', (req, res, next) => {
  res.send(
    '<h1>Boilerplate</h1>GET /user/:id<br/><br/>POST /add<br/> &nbsp; body data: {email: “xyz@xyz.ca”, firstName: “XYZ”}',
  );
});
router.get('/movies', movieController.getAllMovies);





// Get all movies


// Get movie by ID
router.get('/movies/:id', movieController.getMovieById);

// Create a new movie
router.post('/movies',jsonParser, movieController.createMovie);

// Create movieRating

// Update an existing movie
router.put('/movies/:id',jsonParser, movieController.updateMovie);

// Delete a movie by ID
router.delete('/movies/:id', movieController.deleteMovie);

router.post('/movie_ratings', jsonParser,movieRatingController.createMovieRating);

router.get('/movie_ratings/:id/ratings', movieRatingController.getMovieRating);

router.get('/movie_ratings/:userId/:movieId', movieRatingController.getUserMovieRating);


// GET /api/genres
router.get('/movie_genre', genresController.getAllGenres);

// GET /api/genres/:genreId
router.get('/movie_genre/:genreId', genresController.getGenreById);

// POST /api/genres
router.post('/movie_genre', jsonParser, genresController.createGenre);

// PUT /api/genres/:genreId
router.put('/movie_genre/:genreId',jsonParser, genresController.updateGenreById);

// DELETE /api/genres/:genreId
router.delete('/movie_genre/:genreId', genresController.deleteGenreById);

router.get('/movie_genres/:genreIds', genresController.getGenresByIds);
router.get('/*', (req, res, next) => {
  res.send('<h1>Page Not Found</h1>');
});
module.exports = router;
