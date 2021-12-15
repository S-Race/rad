var express = require("express");
var router = express.Router();
var controller = require("../controllers/AddLibrary");

router
    .post("/", controller.addLibrary);

module.exports = router;