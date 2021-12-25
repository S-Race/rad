const Song = require("../models/song");

module.exports.getLibraryItems = async (req, res) => {
    let options = {};
    if (req.query) {
        const { search } = req.query;
        if (search?.length > 0)
            options = {
                name: {
                    $regex: search,
                    $options: "i"
                }
            };
            // options = { $text: { $search: search } };
    }
    Song.find(options, { _id: 1, name: 1, poster: 1, categories: 1, tags: 1 }, (err, songs) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }
        if (!songs)
            res.status(200).send([]);
        else res.status(200).send(songs);
    });
};