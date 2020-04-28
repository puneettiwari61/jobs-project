var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidatePortfolioSchema = new Schema(
	{
		nodejs: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
		],
		react: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    javascript: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    html: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    css: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    express: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    mongodb: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    angular: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    vue: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Candidate',
			},
    ],
    
	},
	{ timestamps: true }
);

module.exports = mongoose.model('candidateSkills', candidatePortfolioSchema);
