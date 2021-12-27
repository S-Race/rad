const express = require("express");
const router = express.Router();
const controller = require("../controllers/Deck");

router
    .get("/", controller.getDeckItems);

module.exports = router;