var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
var Candidate = require("../../models/candidates");

//create portfolio
router.post("/", async (req, res) => {
  try {
    var candidate = await Candidate.findByIdAndUpdate(
      req.user.userId,
      { $push: { education: req.body } },
      { new: true }
    );
    console.log(candidate);
    res.json({ success: true, candidate });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
