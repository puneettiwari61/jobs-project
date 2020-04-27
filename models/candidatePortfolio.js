var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var candidatePortfolioSchema = new Schema(
  {
    experience: {
      type: Schema.Types.ObjectId,
      ref: "Experience"
    },
    skills: [
      {
        type: String
        // required: true
      }
    ],
    image: {
      type: String,
      required: false
    },
    github: {
      type: String,
      required: false
    },
    spokenLanguages: [
      {
        type: String,
        required: false
      }
    ],
    resume: {
      type: String
    },
    education: {
      type: Schema.Types.ObjectId,
      ref: "Education"
    },
    ratings: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CandidatePortfolio", candidatePortfolioSchema);
