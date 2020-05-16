var express = require("express");
var router = express.Router();
// var employers = require("../../controllers/employersController");
var employersController = require("../../controllers/employersController");
var auth = require("../../modules/auth");
var middlewares = require("../../modules/middlewares");

/* signup */
router.post(
  "/signup",
  middlewares.validateEmployersSignup(),
  employersController.signUp
);

/* login User. */
router.post("/login", middlewares.validateLogin(), employersController.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, employersController.getCurrentUser);

// $ Required details onboarding process $

// //experience routes
router.post(
  "/companyDetails",
  auth.verifyToken,
  middlewares.validateCompany(),
  employersController.updateProfile
);

//jobs post route
router.post("/jobs", auth.verifyToken, employersController.postJob);
//get single job
router.get("/jobs/:slug", auth.verifyToken, employersController.getSingleJob);
//get all jobs
router.get("/jobs", auth.verifyToken, employersController.getJobs);
// delete job
router.delete("/jobs/:id", auth.verifyToken, employersController.deleteJob);

// notifications
router.put(
  "/notifications",
  auth.verifyToken,
  employersController.updateNotifications
);

//chat routes
router.post(
  "/chats/:senderid/messages/:receiverid",
  employersController.saveChat
);

//chat routes
router.get(
  "/chats/:senderid/messages/:receiverid",
  employersController.getChat
);
module.exports = router;
