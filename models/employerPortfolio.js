var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employerPortfolioSchema = new Schema({
    establishment_date: {
        type: Date,
        required: false
    },
    company_name: {
        type: String
    },
    company_website_url: {
        type: String,
    }, 
    profile_description: {
        type: String
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
        required: false
    },
    company_logo: {
        type: String,
        required: true
      },
      founder:{
          type: String
      }

}, { timestamps: true })

module.exports = mongoose.model("EmployerPortfolio", employerPortfolioSchema);
