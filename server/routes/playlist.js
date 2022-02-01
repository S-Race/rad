const express = require("express");
const router = express.Router();
const controller = require("../controllers/Playlist");

router
    .get("/:id", controller.getPlaylist)
    .post("/", controller.addPlaylist)
    .patch("/:playlist_id/:song_id", controller.addItemToPlaylist)
    .delete("/:playlist_id", controller.deletePlaylist)
    .delete("/:playlist_id/:song_id", controller.deletePlaylistItem);

module.exports = router;