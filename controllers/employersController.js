var Employer = require("../models/employers");
var auth = require("../modules/auth");

module.exports = {
  signUp: async (req, res) => {
    // TODO: Proper validation.
    // console.log(req.body)
    try {
      var employer = await Employer.create(req.body);
      var token = await auth.generateJWT(employer);
      res.json({ success: true, employer, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      var employer = await Employer.findOne({ email: req.body.email });
      if (!employer)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!employer.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(employer);
      res.json({ success: true, employer, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      var employer = await Employer.findById(req.user.userId);
      res.json({ success: true, employer });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
