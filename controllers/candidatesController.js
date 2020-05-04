var Candidate = require("../models/candidates");
var auth = require("../modules/auth");
var Skill = require("../models/skills");
const { check, validationResult } = require("express-validator");

module.exports = {
  signUp: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      var candidate = await Candidate.create(req.body);
      var token = await auth.generateJWT(candidate);
      let {
        email,
        firstName,
        lastName,
        contactNumber,
        city,
        zip,
        dob,
        gender
      } = candidate;
      res.json({
        success: true,
        candidate: {
          email,
          firstName,
          lastName,
          contactNumber,
          city,
          zip,
          dob,
          gender,
          spokenLanguages: []
        },
        token
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      var candidate = await Candidate.findOne({ email: req.body.email }).lean({
        virtuals: true
      });
      if (!candidate)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!candidate.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(candidate);
      delete candidate["password"];
      res.json({ success: true, candidate, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      var candidate = await Candidate.findById(req.user.userId).select(
        "-password"
      );
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  updateProfile: async (req, res) => {
    try {
      req.body.spokenLanguages = req.body.spokenLanguages.split(",");
      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        req.body,
        {
          new: true
        }
      ).select("-password");
      console.log(candidate, "from update profile");
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  addEducation: async (req, res) => {
    try {
      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        { $push: { education: req.body } },
        { new: true }
      ).select("-password");
      console.log(candidate);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  },
  addExperience: async (req, res) => {
    try {
      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        { $push: { experience: req.body } },
        { new: true }
      ).select("-password");
      console.log(candidate);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  },
  addSkills: async (req, res) => {
    try {
      var updateSkills = await Skill.updateMany(
        { name: { $in: req.body.skills } },
        { $addToSet: { candidates: req.user.userId } }
      );

      var findSkills = await Skill.find({
        name: { $in: req.body.skills }
      });
      findSkills.forEach(async s => {
        await Candidate.findByIdAndUpdate(req.user.userId, {
          $addToSet: { skills: s._id }
        });
      });
      res.json({ success: true, updateSkills });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
};
