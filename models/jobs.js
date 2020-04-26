var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jobSchema = new Schema(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employer"
    },
    companyDetails: {
      type: Schema.Types.ObjectId,
      ref: "EmployerPortfolio"
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
      type: address.schema,
      required: true
    },
    skills: {
      type: [String],
      required: true
    },
    isRemote: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
