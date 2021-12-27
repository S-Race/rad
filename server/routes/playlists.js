const express = require("express");
const router = express.Router();
const controller = require("../controllers/Playlist");

router
    .get("/", controller.getPlaylists);

module.exports = router;