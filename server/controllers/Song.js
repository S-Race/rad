const Song = require("../models/song");

module.exports.getSong = (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).send({ msg: "Invalid song id" });

    Song.findById(req.params.id, (err, song) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }

        if (!song)
            return res.status(404).send({ msg: "Song not found" });
        else return res.status(200).send({
            _id: song._id,
            name: song.name,
            poster: song.poster,
            categories: song.categories,
            tags: song.tags
        });
    });
};