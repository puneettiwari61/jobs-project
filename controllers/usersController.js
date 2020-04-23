var User = require("../models/users");
var auth = require("../routes/auth");
module.exports = {
  signUp: async (req, res) => {
    try {
      var user = await User.create(req.body);
      var token = await auth.generateJWT(user);
      res.json({ success: true, user, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!user.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(user);
      res.json({ success: true, user, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getUser: async (req, res) => {
    try {
      var user = await User.findById(req.user.userID);
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
