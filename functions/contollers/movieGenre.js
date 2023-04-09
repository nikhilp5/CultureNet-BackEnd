const mongoose = require('../utils/dbConn');
const Genre = require('../models/movies/Genre.model');

// Get all genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single genre by ID
exports.getGenreById = async (req, res) => {
  try {
    const { genreId } = req.params;
    const genre = await Genre.findById(genreId);
    // if (!genre) {
    //   return res.status(404).json({ message: 'Genre not found' });
    // }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new genre
exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = new Genre({ name });
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing genre by ID
exports.updateGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (!updatedGenre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json(updatedGenre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a genre by ID
exports.deleteGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGenre = await Genre.findByIdAndDelete(id);
    if (!deletedGenre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json({ message: 'Genre deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGenresByIds = async (req, res) => {
  try {
    const genreIds = req.params.genreIds.split(',');
    const genres = await Genre.find({
      _id: {
        $in: genreIds.map((id) =>
          mongoose.Types.ObjectId.createFromHexString(id),
        ),
      },
    });
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
