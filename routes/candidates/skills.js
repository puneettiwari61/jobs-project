var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
var Candidate = require("../../models/candidates");
var Skill = require("../../models/skills");
var candidatesController = require("../../controllers/candidatesController");

//add skills
router.post("/", candidatesController.addSkills);

module.exports = router;
