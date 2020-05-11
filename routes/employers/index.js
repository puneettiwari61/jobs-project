var express = require("express");
var router = express.Router();
var employers = require("../../controllers/employersController");
var employersController = require("../../controllers/employersController");
var auth = require("../../modules/auth");
var middlewares = require("../../modules/middlewares");

/* signup */
router.post("/signup", middlewares.validateEmployersSignup(), employers.signUp);

/* login User. */
router.post("/login", middlewares.validateLogin(), employers.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, employers.getCurrentUser);

// $ Required details onboarding process $

// //experience routes
router.post(
  "/companyDetails",
  auth.verifyToken,
  middlewares.validateCompany(),
  employersController.updateProfile
);

//jobs post route
router.post("/jobs", auth.verifyToken, employers.postJob);
//get all jobs
router.get("/jobs", auth.verifyToken, employers.getJobs);

module.exports = router;
