var express = require("express");
var router = express.Router();
var controller = require("../controllers/Audio");

router
    .get("/:id", controller.getAudio);

module.exports = router;