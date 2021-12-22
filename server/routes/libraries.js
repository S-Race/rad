var express = require("express");
var router = express.Router();
var controller = require("../controllers/Libraries");

router
    .get("/", controller.getLibraryItems);

module.exports = router;