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
router.get("/jobs/:slug", employersController.getSingleJob);
//get all jobs
router.get("/jobs", employersController.getJobs);
// delete job
router.delete("/jobs/:id", auth.verifyToken, employersController.deleteJob);

// notifications
router.put(
  "/notifications",
  auth.verifyToken,
  employersController.updateNotifications
);

router.post(
  "/hired/jobs/candidates",
  auth.verifyToken,
  employersController.hireCandidates
);

//get all conversations
router.get(
  "/chats/conversations",
  auth.verifyToken,
  employersController.getConversations
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

// filter candidates
router.post(
  "/skills/jobs/candidates",
  auth.verifyToken,
  employersController.filterCandidates
);

// employer public profile
router.get("/:id/profile", employersController.getEmployerProfile);

module.exports = router;
