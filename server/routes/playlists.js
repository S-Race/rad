const express = require("express");
const router = express.Router();
const controller = require("../controllers/Playlist");

router
    .get("/:owner", controller.getPlaylists);

module.exports = router;