var express = require("express");
var router = express.Router();
var users = require("../../controllers/usersController");

/* Signup User. */
router.post("/signup", users.signUp);

/* login User. */
router.post("/login", users.login);

module.exports = router;
