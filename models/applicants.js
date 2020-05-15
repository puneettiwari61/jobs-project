var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var appliedCandidateSchema = new Schema(
{
    comment : {
        type: String,
        required : true
    },
    candidate:{
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("Applicant", appliedCandidateSchema);