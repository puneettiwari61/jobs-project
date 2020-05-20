const { check, validationResult } = require("express-validator");
var Job = require("../models/jobs");
var Employer = require("../models/employers");
var auth = require("../modules/auth");
const GlobalSocket = require("../globalSocket");
var Notification = require("../models/notifications");
var Conversation = require("../models/conversations");
var Message = require("../models/messages");
var socketId = require("./../socketId.json");
var Candidate = require("../models/candidates");

module.exports = {
  signUp: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      var employer = await Employer.create(req.body);
      var token = await auth.generateJWT(employer);
      let {
        email,
        password,
        firstName,
        lastName,
        contactNumber,
        profileImage,
        dob,
        gender
      } = employer;
      res.json({
        success: true,
        employer: {
          email,
          firstName,
          lastName,
          contactNumber,
          profileImage,
          dob,
          gender
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
      var employer = await Employer.findOne({ email: req.body.email })
        .populate({
          path: "jobs",
          // Get friends of friends - populate the 'friends' array for every friend
          populate: { path: "applicants" }
        })
        .populate({
          path: "notifications",
          options: { sort: { createdAt: -1 } }
        })
        .lean({
          virtuals: true
        });
      if (!employer)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!employer.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(employer);
      delete employer["password"];
      res.json({ success: true, employer, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      var employer = await Employer.findById(req.user.userId)
        .populate({
          path: "jobs",
          // Get friends of friends - populate the 'friends' array for every friend
          populate: { path: "applicants" }
        })
        .populate({
          path: "notifications",
          options: { sort: { createdAt: -1 } }
        })
        .select("-password");
      GlobalSocket.io.on("connection", function(socket) {
        socket.on("disconnect", function() {
          // GlobalSocket.io.emit("offline", { email: employer.email });
          console.log("client has disconnected from the chat." + socket.id);
          // for (let i in socketId) {
          //   if (socketId[i] == socket.id) {
          //     return delete socketId[i];
          //   }
          // }
        });
        socket.on("join", function(data) {
          socketId[data.id] = socket.id;
          console.log(socket.id, socketId, data, "from socket connection");
        });
      });
      res.json({ success: true, employer });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  updateProfile: async (req, res) => {
    try {
      var employer = await Employer.findByIdAndUpdate(
        req.user.userId,
        { company: req.body },
        {
          new: true
        }
      )
        .populate("notifications")
        .select("-password");
      console.log(employer, "from update profile");
      res.json({ success: true, employer });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  postJob: async (req, res) => {
    try {
      console.log(req.body);
      req.body.employer = req.user.userId;
      var job = await Job.create(req.body);
      var employer = await Employer.findByIdAndUpdate(
        req.user.userId,
        {
          $addToSet: { jobs: job._id }
        },
        { new: true }
      )
        .populate("jobs")
        .populate({
          path: "notifications",
          options: { sort: { createdAt: -1 } }
        })
        .select("-password");
      res.json({ success: true, employer });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getJobs: async (req, res) => {
    try {
      var jobs = await Job.find({})
        .populate("employer")
        .populate("company");
      res.json({ success: true, jobs });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getSingleJob: async (req, res) => {
    try {
      var job = await Job.findOne({ slug: req.params.slug })
        .populate("employer")
        .populate({
          path: "applicants",
          populate: { path: "candidate", populate: { path: "skills" } }
        });
      // var msg = {
      //   message: "hello sent from node from client"
      // };
      // GlobalSocket.io.emit("message", msg);
      res.json({ success: true, job });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },

  deleteJob: async (req, res) => {
    try {
      var job = await Job.findByIdAndRemove(req.params.id);
      // var jobs = await Job.find({})
      //   .populate("employer")
      //   .populate("company");
      var employer = await Employer.findById(req.user.userId)
        .populate("jobs")
        .select("-password");
      res.json({ success: true, employer });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  updateNotifications: async (req, res) => {
    try {
      var notification = await Notification.updateMany(
        { _id: { $in: req.body.notifications } },
        { hasRead: true }
      );
      res.json({ success: true, notification });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  saveChat: async (req, res) => {
    try {
      var message = await Message.create({
        employerId: req.params.senderid,
        candidateId: req.params.receiverid,
        senderType: "employer",
        senderId: req.params.senderid,
        receiverId: req.params.receiverId,
        message: req.body.message
      });
      var conversation = await Conversation.findOneAndUpdate(
        { employerId: req.params.senderid, candidateId: req.params.receiverid },
        {
          employerId: req.params.senderid,
          candidateId: req.params.receiverid,
          $push: { messages: message.id }
        },
        { new: true, upsert: true }
      )
        .populate({
          path: "messages",
          populate: { path: "candidateId" }
        })
        .populate({
          path: "messages",
          populate: { path: "employerId" },
          options: { sort: { createdAt: 1 } }
        });

      var msg = {
        conversation
      };

      await GlobalSocket.io
        .to(socketId[req.params.receiverid])
        .emit("chat", msg);

      res.json({ success: true, conversation });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getChat: async (req, res) => {
    try {
      var conversation = await Conversation.findOne({
        employerId: req.params.senderid,
        candidateId: req.params.receiverid
      })
        .populate({
          path: "messages",
          populate: { path: "candidateId" }
        })
        .populate({
          path: "messages",
          populate: { path: "employerId" },
          options: { sort: { createdAt: 1 } }
        });
      res.json({ success: true, conversation });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getConversations: async (req, res) => {
    try {
      var conversation = await Conversation.find({
        employerId: req.user.userId
      }).populate("candidateId");
      res.json({ success: true, conversation });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  filterCandidates: async (req, res) => {
    try {
      console.log(req.body, "req body from candidates filter");
      var candidates = await Candidate.find({
        _id: req.body.ids,
        skills: { $in: req.body.skills }
      }).populate("skills", "name");
      res.json({ success: true, candidates });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getEmployerProfile: async (req, res) => {
    try {
      var employer = await Employer.findById(req.params.id)
        .populate({
          path: "jobs"
        })
        .lean();
      delete employer["password"];
      res.json({ success: true, employer });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  hireCandidates: async (req, res) => {
    try {
      var job = await Job.findByIdAndUpdate(
        req.body.jobId,
        {
          $addToSet: { hiredCandidates: req.body._id }
        },
        { new: true }
      )
        .populate("employer")
        .populate({
          path: "applicants",
          populate: { path: "candidate", populate: { path: "skills" } }
        });

      var msg = {
        message: `You are selected for  ${job.title} `,
        candidateId: req.body._id
      };
      GlobalSocket.io.emit("message", msg);
      var notification = await Notification.create({
        notification: msg.message,
        userType: "candidate",
        candidate: req.body._id
      });
      var candidate = await Candidate.findByIdAndUpdate(
        req.body._id,
        { $push: { notifications: notification._id } },
        { new: true }
      );
      res.json({ success: true, job });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
