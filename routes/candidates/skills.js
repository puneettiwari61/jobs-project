var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
var Candidate = require("../../models/candidates");
var Skill = require("../../models/skills");

//create portfolio
router.post("/", async (req, res) => {
  try {
    // req.body.skills.map(s => {
    // var s = Skill.find([])
    var findSkills = await Skill.find({ name: { $in: req.body.skills } });
    // var newSkills = await req.body.skills.filter(s => {
    //   return !findSkills.every(f => s.name !== f.name);
    // });

    var newSkills = await findSkills.reduce((acc, cv) => {
      return (acc = acc.concat(req.body.skills.filter(f => f !== cv.name)));
    }, []);
    // newSkills = await newSkills.map(s => {
    //   return { name: s };
    // });
    console.log(
      req.body.skills,
      newSkills,
      findSkills,
      "from skilssssssssssssssls"
    );
    // var createSkills = await Skill.insertMany(newSkills);
    res.json({ newSkills, findSkills });
    // console.log(createSkills, "from skills");

    // });
    // var skill = await Skill.create({ name: req.body.skills[0] });

    // var candidate = await Candidate.findByIdAndUpdate(
    //   req.user.userId,
    //   { $push: { experience: req.body } },
    //   { new: true }
    // );
    // console.log(candidate);
    // res.json({ success: true, createSkills });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
