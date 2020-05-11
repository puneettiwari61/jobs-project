const { check, validationResult } = require('express-validator');

exports.validateLogin = () => {
	return [check('email').isEmail(), check('password').isLength({ min: 6 })];
};

exports.validateCandidatesSignup = () => {
	return [
		check('email').isEmail(),
		check('password').isLength({ min: 6 }),
		check('firstName').notEmpty(),
		check('lastName').notEmpty(),
		check('contactNumber').notEmpty(),
		check('gender').notEmpty(),
		check('dob').notEmpty(),
		check('zip').notEmpty(),
	];
};

exports.validateEmployersSignup = () => {
<<<<<<< HEAD
	return [
		check('email').isEmail(),
		check('password').isLength({ min: 6 }),
		check('firstName').notEmpty(),
		check('lastName').notEmpty(),
		check('contactNumber').notEmpty(),
		check('gender').notEmpty(),
	];
=======
  return [
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("contactNumber").notEmpty(),
    check("gender").notEmpty()
  ];
>>>>>>> 98bc2356c4a7698de81a219df040c850efa2b107
};

exports.validateCandidatesProfileUpdate = () => {
	return [
		check('image').notEmpty(),
		check('spokenLanguages').isArray(),
		check('github').notEmpty(),
		check('githubImage').notEmpty(),
		check('resume').notEmpty(),
	];
};

exports.validateCandidatesEducation = () => {
	return [
		check('schoolOrCollege').notEmpty(),
		check('classOrDegree').notEmpty(),
		check('grade').notEmpty(),
		check('from').notEmpty(),
		check('to').notEmpty(),
	];
};

exports.validateCandidatesExperience = () => {
	return [
		check('companyName').notEmpty(),
		check('designation').notEmpty(),
		check('location').notEmpty(),
		check('joiningDate').notEmpty(),
		check('leavingDate').notEmpty(),
	];
};

exports.validateCompany = () => {
	return [
		check('establishmentDate').notEmpty(),
		check('companyName').notEmpty(),
		check('companyWebsiteUrl').notEmpty(),
		check('companyLogo').notEmpty(),
		check('founder').notEmpty(),
		check('foundersView').notEmpty(),
		check('aboutCompany').notEmpty(),
	];
};
