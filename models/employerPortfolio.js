var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employerPortfolioSchema = new Schema(
  {
    establishmentDate: {
      type: Date,
      required: false
    },
    companyName: {
      type: String
    },
    companyWebsiteUrl: {
      type: String
    },
    profileDescription: {
      type: String
    },
    city: {
      type: String
      // required: true
    },
    zip: {
      type: Number
      // required: true
    },
    image: {
      type: String,
      required: false
    },
    companyLogo: {
      type: String,
      required: true
    },
    founder: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployerPortfolio", employerPortfolioSchema);
