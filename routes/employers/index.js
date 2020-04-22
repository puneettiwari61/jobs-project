var express = require("express");
var router = express.Router();
var employers = require("../../controllers/employersController");

/* GET home page. */
router.get("/signup", employers.signUp);

module.exports = router;
