var Candidate = require("../models/candidates");
var auth = require("../routes/auth");
module.exports = {
  signUp: async (req, res) => {
    try {
      var candidate = await Candidate.create(req.body);
      var token = await auth.generateJWT(candidate);
      res.json({ success: true, candidate, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      var candidate = await Candidate.findOne({ email: req.body.email });
      if (!candidate)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!candidate.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(candidate);
      res.json({ success: true, candidate, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      console.log(req.user, "cc");
      var candidate = await Candidate.findById(req.user.userID);
      console.log(candidate);
      res.json({ success: true, candidate });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};