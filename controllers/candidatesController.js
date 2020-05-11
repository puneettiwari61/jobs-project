const { check, validationResult } = require("express-validator");

var Candidate = require("../models/candidates");
var auth = require("../modules/auth");
var Skill = require("../models/skills");
var Job = require("../models/jobs");

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
      var candidate = await Candidate.findById(req.user.userId)
        .populate("skills", "name")
        .select("-password");
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
      )
        .populate("skills", "name")
        .select("-password");
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
      )
        .populate("skills", "name")
        .select("-password");
      console.log(candidate);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  },
  deleteExperience: async (req, res) => {
    try {
      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        { $pull: { experience: req.body } },
        { new: true }
      ).select("-password");
      console.log(candidate);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  },
  deleteEducation: async (req, res) => {
    try {
      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        { $pull: { education: req.body } },
        { new: true }
      ).select("-password");
      console.log(candidate);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  },
  deleteSkills: async (req, res) => {
    try {
      var skills = await Skill.findByIdAndUpdate(
        req.body._id,
        { $pull: { candidates: req.user.userId } },
        { new: true }
      );
      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        { $pull: { skills: req.body._id } },
        { new: true }
      ).select("-password");
      console.log(candidate, skills);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  },
  addSkills: async (req, res) => {
    try {
      var updateSkills = await Skill.updateMany(
        { _id: { $in: req.body.skills } },
        { $addToSet: { candidates: req.user.userId } }
      );

      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        {
          $addToSet: { skills: { $each: req.body.skills } }
        },
        { new: true }
      )
        .populate("skills", "name")
        .select("-password");
      console.log(candidate);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  },
  getSkills: async (req, res) => {
    try {
      var skills = await Skill.find({}).lean();
      res.json({ success: true, skills });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  filterJobs: async (req, res) => {
    try {
      console.log(req.body, "req body from filter");
      var jobs = await Job.find({ skills: { $in: req.body.skills } });
      res.json({ success: true, jobs });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
