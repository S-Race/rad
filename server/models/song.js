const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    poster: String,
    tags: [String],
    categories: [String]
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;