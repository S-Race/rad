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
    duration: Number,
    poster: String,
    tags: [String],
    categories: [String]
});

// songSchema.index({ name: "text", "name": "text" });
const Song = mongoose.model("Song", songSchema);

module.exports = Song;