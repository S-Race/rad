const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: { // name of the playlist
        type: String,
        require: true
    },
    owner: { // user who creates / owns the playlist
        type: mongoose.ObjectId,
        require: true
    },
    items: { // array of song ids
        type: [mongoose.ObjectId],
        required: true,
        ref: "Song"
    },
    poster: String
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;