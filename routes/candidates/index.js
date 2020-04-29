var express = require("express");
var router = express.Router();
var candidatesController = require("../../controllers/candidatesController");
var educationRouter = require("./education");
var experienceRouter = require("./experience");
var auth = require("../../modules/auth");
var skillsRouter = require("./skills");

/* Signup User. */
router.post("/signup", candidatesController.signUp);

/* login User. */
router.post("/login", candidatesController.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, candidatesController.getCurrentUser);

// Required details onboarding process
router.post("/profile", auth.verifyToken, candidatesController.updateProfile);

//experience routes
router.use("/experience", auth.verifyToken, experienceRouter);

//skills route
router.use("/skills", auth.verifyToken, skillsRouter);

// education routes
router.use("/education", auth.verifyToken, educationRouter);

module.exports = router;
