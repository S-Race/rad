const express = require("express");
const router = express.Router();
const controller = require("../controllers/Audio");

router
    .get("/:id", controller.getAudio);

module.exports = router;