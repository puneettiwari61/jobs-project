const { check, validationResult } = require("express-validator");

const Notification = require("../models/notifications");
var Candidate = require("../models/candidates");
var auth = require("../modules/auth");
var Skill = require("../models/skills");
var Job = require("../models/jobs");
var Applicant = require("../models/applicants");
const GlobalSocket = require("../globalSocket");
var Employer = require("../models/employers");
var Conversation = require("../models/conversations");
var Message = require("../models/messages");

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
        .populate("jobsApplied")
        .populate({
          path: "jobsApplied",
          // Get friends of friends - populate the 'friends' array for every friend
          populate: { path: "employer" }
        })
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
  addAbout: async (req, res) => {
    try {
      var candidate = await Candidate.findByIdAndUpdate(
        req.user.userId,
        { about: req.body.about },
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
  },
  jobApply: async (req, res) => {
    try {
      var isAlreadyApplied = await Candidate.findById(req.user.userId);
      isAlreadyApplied = isAlreadyApplied.jobsApplied.includes(req.body._id);
      console.log(isAlreadyApplied, "from true false applied jbs");

      if (isAlreadyApplied == false) {
        var candidate = await Candidate.findByIdAndUpdate(
          req.user.userId,
          {
            $addToSet: { jobsApplied: req.body._id }
          },
          { new: true }
        )
          .populate("jobsApplied")
          .select("-password");

        console.log(req.body, "from apply jobs ");

        var applicant = await Applicant.create({
          comment: req.body.comment,
          candidate: req.user.userId
        });

        var job = await Job.findByIdAndUpdate(
          req.body._id,
          {
            $addToSet: { applicants: applicant.id }
          },
          { new: true }
        );

        var msg = {
          message:
            candidate.firstName +
            " " +
            candidate.lastName +
            " applied for " +
            job.title +
            " job",
          employerId: job.employer
        };
        GlobalSocket.io.emit("message", msg);
        var notification = await Notification.create({
          notification: msg.message,
          userType: "employer",
          employer: job.employer
        });
        console.log(GlobalSocket.io, "from socket id");
        var employer = await Employer.findByIdAndUpdate(
          job.employer,
          { $push: { notifications: notification._id } },
          { new: true }
        );
        console.log(notification, employer, "from disneyworld");
        res.json({ success: true, candidate });
      } else if (isAlreadyApplied == true) {
        return res.json({ success: false, msg: "already applied!" });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  saveChat: async (req, res) => {
    try {
      var message = await Message.create({
        candidateId: req.params.senderid,
        employerId: req.params.receiverid,
        senderType: "candidate",
        senderId: req.params.senderid,
        receiverId: req.params.receiverId,
        message: req.body.message
      });
      var conversaton = await Conversaton.findOneAndUpdate(
        { candidateId: req.params.senderid, employerId: req.params.receiverid },
        {
          candidateId: req.params.senderid,
          employerId: req.params.receiverid,
          $push: { messages: message.id }
        },
        { new: true, upsert: true }
      ).populate("messages");
      console.log(conversaton, "from candidate convo");
      res.json({ success: true, conversaton });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getChat: async (req, res) => {
    try {
      var conversation = await Conversation.findOne({
        candidateId: req.params.senderid,
        employerId: req.params.receiverid
      }).populate("messages");
      res.json({ success: true, conversation });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
