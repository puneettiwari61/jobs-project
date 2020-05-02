const { check, validationResult } = require("express-validator");

exports.validateLogin = () => {
  return [check("email").isEmail(), check("password").isLength({ min: 6 })];
};

exports.validateCandidatesSignup = () => {
  return [check("email").isEmail(), check("password").isLength({ min: 6 })];
};
