var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jobSchema = new Schema(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employer"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],
    isRemote: {
      type: Boolean,
      required: true
    },
    salary: { type: Number },
    currency: { type: String },
    applicants: [{ type: Schema.Types.ObjectId, ref: "Candidate" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
