var express = require("express");
var router = express.Router();
var candidates = require("../../controllers/candidatesController");
var auth = require("../auth");

/* Signup User. */
router.post("/signup", candidates.signUp);

/* login User. */
router.post("/login", candidates.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, candidates.getCurrentUser);

module.exports = router;
