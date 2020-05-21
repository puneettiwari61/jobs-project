var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");

var candidatesController = require("../../controllers/candidatesController");

//filter jobs
router.post("/jobs", candidatesController.filterJobs);

//add skills
router.post("/", auth.verifyToken, candidatesController.addSkills);

router.put("/delete", auth.verifyToken, candidatesController.deleteSkills);

// fetch all skills
router.get("/", candidatesController.getSkills);
module.exports = router;
