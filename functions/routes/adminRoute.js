//Author - Rishi Vasa (B00902815)

const express = require("express");
const bodyParser = require("body-parser");

const adminRoute = express.Router();
const jsonParser = bodyParser.json();
const multer = require('multer');
const upload = multer();

const { addMovie, updateMovie, deleteMovie } = require("../contollers/configureMovies");
const { addBook, updateBook, deleteBook } = require("../contollers/configureBooks");
const { addMusic, updateMusic, deleteMusic } = require("../contollers/configureMusic");

const { verifyToken } = require("../contollers/user");

adminRoute.route("/addMovie").post(upload.single('image'), verifyToken, addMovie);
adminRoute.route("/updateMovie/:movieID").put(upload.single('image'), verifyToken, updateMovie);
adminRoute.route("/deleteMovie/:movieID").delete(verifyToken, deleteMovie);
adminRoute.route("/addBook").post(upload.single('image'), verifyToken, addBook);
adminRoute.route("/updateBook/:bookID").put(upload.single('image'), verifyToken, updateBook);
adminRoute.route("/deleteBook/:bookID").delete(verifyToken, deleteBook);
adminRoute.route("/addMusic").post(verifyToken, addMusic);
adminRoute.route("/updateMusic/:musicID").put(verifyToken, updateMusic);
adminRoute.route("/deleteMusic/:musicID").delete(verifyToken, deleteMusic);

module.exports = adminRoute;
 