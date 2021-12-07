var express = require("express");
var router = express.Router();
var controller = require("../controllers/User");

router
    .get("/:id", controller.getUser);

module.exports = router;