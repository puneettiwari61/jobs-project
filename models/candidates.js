var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var candidateSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    // required: true
  },
  lastname: {
    type: String,
    // required: true
  },
  dob: {
    type: Date,
    // required:true
  },
  gender: {
    type: String,
    // required: true
  },
  contactnumber: {
    type: String,
    required: false
  },
  city: {
    type: String,
    // required: true
  },
  zip: {
    type: Number,
    // required: true
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: 'Candidateportfolio'
  }
}, { timestamps: true });

candidateSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

candidateSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Candidates", candidateSchema);
