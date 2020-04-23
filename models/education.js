var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var educationSchema = new Schema({
    school: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    certifications: [{
        type: String,
        required: true
    }],


}, { timestamps: true })

module.exports = mongoose.model("Education", educationSchema);
