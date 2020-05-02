var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var candidatesController = require("../../controllers/candidatesController");
var educationRouter = require("./education");
var experienceRouter = require("./experience");
var auth = require("../../modules/auth");
var skillsRouter = require("./skills");
var middlewares = require("../../modules/middlewares");

/* Signup User. */
router.post(
  "/signup",
  middlewares.validateCandidatesSignup(),
  candidatesController.signUp
);

/* login User. */
router.post("/login", middlewares.validateLogin(), candidatesController.login);

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
