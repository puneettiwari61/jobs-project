const { check, validationResult } = require("express-validator");

exports.validateLogin = () => {
  return [check("email").isEmail(), check("password").isLength({ min: 6 })];
};

exports.validateCandidatesSignup = () => {
  return [
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("contactNumber").notEmpty(),
    check("gender").notEmpty(),
    check("dob").notEmpty(),
    check("zip").notEmpty()
  ];
};

exports.validateEmployersSignup = () => {
  return [
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("contactNumber").notEmpty(),
    check("gender").notEmpty(),
    check("dob").notEmpty()
  ];
};
