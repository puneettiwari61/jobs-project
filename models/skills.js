var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillsSchema = new Schema(
	{
		name: { type: String },
		candidates: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
		],
		employers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Employer',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Skill', skillsSchema);
