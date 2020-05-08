var express = require("express");
var router = express.Router();

var candidatesController = require("../../controllers/candidatesController");

//add skills
router.post("/", candidatesController.addSkills);

// fetch all skills
router.get("/", candidatesController.getSkills);

router.put("/delete", candidatesController.deleteSkills);

module.exports = router;
