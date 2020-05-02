var express = require("express");
var router = express.Router();
var employers = require("../../controllers/employersController");
var auth = require("../../modules/auth");
var middlewares = require("../../modules/middlewares");

/* signup */
router.post("/signup", employers.signUp);

/* login User. */
router.post("/login", middlewares.validateLogin(), employers.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, employers.getCurrentUser);

module.exports = router;
