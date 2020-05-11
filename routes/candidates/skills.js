var express = require("express");
var router = express.Router();

var candidatesController = require("../../controllers/candidatesController");

//filter jobs
router.post("/jobs", candidatesController.filterJobs);

//add skills
router.post("/", candidatesController.addSkills);

router.put("/delete", candidatesController.deleteSkills);

// fetch all skills
router.get("/", candidatesController.getSkills);
module.exports = router;
