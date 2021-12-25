var express = require("express");
var router = express.Router();
var controller = require("../controllers/Song");

router
    .get("/:id", controller.getSong);

module.exports = router;