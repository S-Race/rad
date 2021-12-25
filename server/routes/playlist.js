var express = require("express");
var router = express.Router();
var controller = require("../controllers/Playlist");

router
    .get("/:id", controller.getPlaylist)
    .post("/", controller.addPlaylist)
    .patch("/:playlist_id/:song_id", controller.addItemToPlaylist);

module.exports = router;