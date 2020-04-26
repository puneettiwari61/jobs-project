var express = require("express");
var router = express.Router();
var employers = require("../../controllers/employersController");
var auth = require("../../modules/auth");

/* signup */
router.post("/signup", employers.signUp);

/* login User. */
router.post("/login", employers.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, employers.getCurrentUser);

module.exports = router;
