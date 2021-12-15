const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    path: {
        type: String,
        require: true
    }
});

const MusicLibrary = mongoose.model("MusicLibrary", librarySchema);

module.exports = MusicLibrary;