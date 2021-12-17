require("dotenv").config();
const Song = require("../models/song");

const RECOMMENDED = 8;
const CONTINUE = 8;

// get the items to display on the dashboard for the user
module.exports.getDeckItems = (_, res) => {
    Song.find({}, { "_id": 1, "name": 1, "poster": 1 }, (err, songs) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                msg: err
            });
        }

        // get recommend music ... for just return some random tracks from the db
        let recommend = [];
        for (let i = 0; i < RECOMMENDED && i < songs.length; i++) {
            const random = Math.floor(Math.random() * songs.length);
            // if added this item already, choose a new item
            if (recommend.indexOf(songs[random]) !== -1) {
                i--;
                continue;
            }
            recommend.push(songs[random]);
        }

        let continueListening = [];
        // get continue listening ... get the tracks the user started but not finished
        // for now just return some random tracks from the db as well
        for (let i = 0; i < CONTINUE && i < songs.length; i++) {
            const random = Math.floor(Math.random() * songs.length);
            // if added this item already, choose a new item
            if (continueListening.indexOf(songs[random]) !== -1) {
                i--;
                continue;
            }
            continueListening.push(songs[random]);
        }

        res.status(200).send({
            recommend,
            resume: continueListening
        });
    });
};
