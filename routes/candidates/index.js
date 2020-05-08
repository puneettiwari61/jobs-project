var express = require("express");
var router = express.Router();

var candidatesController = require("../../controllers/candidatesController");
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
router.post(
  "/profile",
  auth.verifyToken,
  middlewares.validateCandidatesProfileUpdate(),
  candidatesController.updateProfile
);

//experience routes

router.post(
  "/experience/delete",
  auth.verifyToken,
  candidatesController.deleteExperience
);

router.post(
  "/experience",
  auth.verifyToken,
  middlewares.validateCandidatesExperience(),
  candidatesController.addExperience
);

// education routes

router.post(
  "/education/delete",
  auth.verifyToken,
  candidatesController.deleteEducation
);

router.post(
  "/education",
  auth.verifyToken,
  middlewares.validateCandidatesEducation(),
  candidatesController.addEducation
);

//skills route
router.use("/skills", auth.verifyToken, skillsRouter);

module.exports = router;
