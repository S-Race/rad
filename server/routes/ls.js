const express = require("express");
const router = express.Router();
const controller = require("../controllers/Ls");

router
    .get("/", controller.getRootDirs)
    .post("/", controller.getDirs);

module.exports = router;