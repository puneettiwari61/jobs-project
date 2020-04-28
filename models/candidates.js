var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var candidateSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			// required: true
		},
		lastName: {
			type: String,
			// required: true
		},
		dob: {
			type: String,
			// required:true
		},
		gender: {
			type: String,
			// required: true
		},
		contactNumber: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			// required: true
		},
		zip: {
			type: Number,
			// required: true
		},
		image: {
			type: String,
			required: false,
		},
		github: {
			type: String,
			required: false,
		},
		spokenLanguages: [
			{
				type: String,
				required: false,
			},
		],
		resume: {
			type: String,
		},
		ratings: {
			type: Number,
		},
		education: [
			{
				name: String,
				grade: String,
				description: String,
				certification: String,
			},
		],

		// degree: {
		//   type: String
		// },
		// grade: {
		//   type: String
		// },
		// description: {
		//   type: String
		// },
		// certifications: [
		//   {
		//     type: String
		//   }
		// ]
    experience: [
			{
				companyName: String,
				location: String,
				joiningDate: String,
				leavigDate: String,
			},
		],
		
		// company: {
		//   type: String,
		//   required: true
		// },
		// location: {
		//   type: String,
		//   required: true
		// },
		// description: {
		//   type: String,
		//   required: true
		// },
		// joiningDate: {
		//   type: String,
		//   required: true
		// },
		// leavingDate: {
		//   type: String,
		//   required: true
		// }
		skills: {
			type: Schema.Types.ObjectId,
			ref: 'candidateSkills',
		},
	},
	{ timestamps: true }
);

candidateSchema.pre('save', function (next) {
	if (this.password && this.isModified('password')) {
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
});

candidateSchema.methods.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Candidate', candidateSchema);
