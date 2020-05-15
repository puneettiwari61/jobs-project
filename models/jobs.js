var mongoose = require("mongoose");
const slug = require("slug");
var Schema = mongoose.Schema;

var jobSchema = new Schema(
  {
    slug: {
      type: String
    },
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
    
    applicants: [{
      type: Schema.Types.ObjectId,
      ref: "Applicant"
    }]
  },
  { timestamps: true }
);

jobSchema.pre("save", function (next) {
  if (this.title && this.isModified("title")) {
    var slugged = slug(this.title, { lower: true });
    this.slug = slugged + "-" + this._id;
    next();
  } else {
    next();
  }
});

module.exports = mongoose.model("Job", jobSchema);
