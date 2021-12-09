var express = require("express");
var router = express.Router();
var controller = require("../controllers/Auth");

router
    .get("/:name", controller.getUser)
    .post("/:name", controller.createUser);

module.exports = router;