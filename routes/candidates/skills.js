var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
var Candidate = require("../../models/candidates");
var Skill = require("../../models/skills");

//create portfolio
router.post("/", async (req, res) => {
  try {
    var updateSkills = await Skill.updateMany(
      { name: { $in: req.body.skills } },
      { $addToSet: { candidates: req.user.userId } }
    );
    res.json({ success: true, updateSkills });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

// var updateSkills = Skill.updateMany(
//   { name: req.body.skills },
//   { new: true }
// );
// console.log(updateSkills);
// res.json({ success: true, updateSkills });
// req.body.skills.map(s => {
// var s = Skill.find([])
// var findSkills = await Skill.find({ name: { $in: req.body.skills } });
// var newSkills = [];
// req.body.skills.forEach(a => {
//   findSkills.forEach(b => {
//     if (a != b.name) {
//       newSkills.push({ name: a });
//     }
//   });
// });

// console.log(
//   req.body.skills,
//   newSkills,
//   findSkills,
//   "from skilssssssssssssssls"
// );

// var newFindSkills = findSkills.map(s => s.name);
// var newSkillsUpdate = findSkills.map(s => s.name);

// var createSkills = await Skill.insertMany(newSkills);
// var updateNewSkills = await Skill.updateMany(
//   { name: { $in: req.body.skills } },
//   { $push: { candidates: req.user.userId } }
// );
// res.json({ success: true, findSkills, newSkills });
// console.log(createSkills, "from skills");

// });
// var skill = await Skill.create({ name: req.body.skills[0] });

// var candidate = await Candidate.findByIdAndUpdate(
//   req.user.userId,
//   { $push: { experience: req.body } },
//   { new: true }
// );
// console.log(candidate);
// res.json({ success: true, skill });

module.exports = router;
