//Author - Rishi Vasa (B00902815)

const getError = require("../utils/getError");
const mongoose = require("../utils/dbConn");
const Music = require("../models/music/music.model")

const addMusic = async (req, res, next) => {
    try {
        console.log("Request received to addMusic: " + JSON.stringify(req.body));

        if (req.body && req.body.title && req.body.artists && req.body.dateReleased ) {

            const { title, artists, album, dateReleased } = req.body;

            const newMusic = new Music({
                title,
                artists,
                album,
                dateReleased,
            });

            await newMusic.save();

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

const updateMusic = async (req, res, next) => {
    try {
        const { musicID } = req.params;
        console.log("Request received to updateMusic " + musicID);

        const title = req.body.title;
        const album = req.body.album;
        const artists = req.body.artists;
        const dateReleased = req.body.dateReleased;

        const updatedMusic = {
            title,
            artists,
            album,
            dateReleased
        };

        const music = await Music.findOneAndUpdate(
            { _id: musicID },
            { $set: updatedMusic },
            { new: true, upsert: false }
        );
        if (!music) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }
        res.status(200).json({
            success: true,
            music
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({ success: false, message: err.message });
        }
        console.log(err);
        next(err);
    }
};

const deleteMusic = async (req, res, next) => {
    try {
        const { musicID } = req.params;
        console.log("Request received to deleteMusic " + musicID);

        const music = await Music.findOneAndDelete({ _id: musicID });
        if (!music) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Song deleted successfully'
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = {
    addMusic,
    updateMusic,
    deleteMusic
};
