var Employer = require("../models/employers");
var auth = require("../modules/auth");
const { check, validationResult } = require("express-validator");

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
          password,
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
      var employer = await Employer.findOne({ email: req.body.email }).lean({
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
      var employer = await Employer.findById(req.user.userId).select(
        "-password"
      );
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
        { $push: { company: req.body } },
        {
          new: true
        }
      );
      console.log(employer, "from update profile");
      res.json({ success: true, employer });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
