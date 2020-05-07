var skillsData = require("./modules/skillsData.json");
var Skill = require("./models/skills");

module.exports.seedSkills = err => {
  if (!err) {
    var skillsArray = skillsData.skills.map(s => {
      return { name: s };
    });
    Skill.find({}, (err, findSkills) => {
      if (err) return console.log(err);
      if (findSkills.length === 0) {
        Skill.insertMany(skillsArray, (error, skills) => {
          if (error) return console.log(error);
          console.log(skills);
        });
      }
    });
  }
};