var express = require("express");
var router = express.Router();
var controller = require("../controllers/Deck");

router
    .get("/", controller.getDeckItems);

module.exports = router;