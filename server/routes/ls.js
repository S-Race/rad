var express = require("express");
var router = express.Router();
var controller = require("../controllers/Ls");

router
    .get("/", controller.getRootDirs)
    .post("/", controller.getDirs);

module.exports = router;