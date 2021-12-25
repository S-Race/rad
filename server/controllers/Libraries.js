const Song = require("../models/song");

module.exports.getLibraryItems = async (_, res) => {
    Song.find({}, { _id: 1, name: 1, poster: 1, categories: 1, tags: 1 }, (err, songs) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }
        if (!songs)
            res.status(200).send([]);
        else res.status(200).send(songs);
    });
};