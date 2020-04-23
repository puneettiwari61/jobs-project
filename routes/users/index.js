var express = require("express");
var router = express.Router();
var users = require("../../controllers/usersController");
var auth = require("../auth");

/* Signup User. */
router.post("/signup", users.signUp);

/* login User. */
router.post("/login", users.login);

// Details of current logged in user
router.get("/current", auth.verifyToken, users.getUser);

module.exports = router;
