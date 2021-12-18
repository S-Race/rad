var express = require("express");
var router = express.Router();
var controller = require("../controllers/Library");

router
    .get("/", controller.getLibraries)
    .post("/", controller.addLibrary);

module.exports = router;