var Employer = require("../models/employers");
var auth = require("../modules/auth");

module.exports = {
  signUp: async (req, res) => {
    // TODO: Proper validation.
    try {
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
  }
};
