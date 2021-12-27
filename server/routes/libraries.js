const express = require("express");
const router = express.Router();
const controller = require("../controllers/Libraries");

router
    .get("/", controller.getLibraryItems);

module.exports = router;