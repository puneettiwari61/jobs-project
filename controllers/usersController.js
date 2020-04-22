var User = require("../models/users");
var auth = require("../routes/auth");
module.exports = {
  signUp: async (req, res) => {
    try {
      console.log(req.body, "coming from users signup controller");
      var user = await User.create(req.body);
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body, "coming from users signup controller");
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
  }
};
