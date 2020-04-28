// var express = require("express");
// var router = express.Router();
// var auth = require("../../modules/auth");
// var Experience = require("../../models/experience");
// var Educattion = require("../../models/education");
// var CandidatesPortfolio = require("../../models/candidatePortfolio");
// var Candidate = require("../../models/candidates");
// //create portfolio
// router.post("/", async (req, res) => {
//   try {
//     var candidatesPortfolio = await CandidatesPortfolio.create(req.body);
//     var candidate = await Candidate.findByIdAndUpdate(req.user.userId, {
//       portfolio: candidatesPortfolio._id
//     });
//     res.json({ success: true, candidatesPortfolio });
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false });
//   }
// });

// module.exports = router;
