var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
var Candidate = require("../../models/candidates");
var candidatesController = require("../../controllers/candidatesController");

//add experience
router.post("/", candidatesController.addExperience);
router.post("/delete", candidatesController.deleteExperience);

module.exports = router;
