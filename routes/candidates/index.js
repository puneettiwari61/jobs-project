var express = require("express");
var router = express.Router();
var candidates = require("../../controllers/candidatesController");
var auth = require("../../modules/auth");
var candidatesPortfolioRouter = require("./candidatesPortfolio");
var educationRouter = require("./education");

/* Signup User. */
router.post("/signup", candidates.signUp);

/* login User. */
router.post("/login", candidates.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, candidates.getCurrentUser);

// //portfolio routes
// router.use("/portfolio", auth.verifyToken, candidatesPortfolioRouter);

// //education routes
// router.use("/education", auth.verifyToken, educationRouter);

module.exports = router;
