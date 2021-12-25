var express = require("express");
var router = express.Router();
var controller = require("../controllers/Playlist");

router
    .get("/:owner", controller.getPlaylists);

module.exports = router;