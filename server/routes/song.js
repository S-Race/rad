const express = require("express");
const router = express.Router();
const controller = require("../controllers/Song");

router
    .get("/:id", controller.getSong);

module.exports = router;