const express = require("express");
const router = express.Router();
const controller = require("../controllers/Library");

router
    .get("/", controller.getLibraries)
    .post("/", controller.addLibrary);

module.exports = router;