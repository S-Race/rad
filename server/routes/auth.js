const express = require("express");
const router = express.Router();
const controller = require("../controllers/Auth");

router
    .get("/token", controller.getToken) // after logging in, get token with cookie
    .post("/login", controller.login) // login to get login cookie
    .post("/signup", controller.createUser)
    .get("/logout", controller.logout);

module.exports = router;