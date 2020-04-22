var express = require("express");
var router = express.Router();
var users = require("../../controllers/usersController");

/* GET users listing. */
router.get("/signup", users.signUp);

module.exports = router;
