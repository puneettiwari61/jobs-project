var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var employerSchema = new Schema({
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
    type: Number,
    required: false
  },
  profile_image: {
    type: String,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: 'EmployerPortfolio'
  }
}, { timestamps: true });

employerSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

employerSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Employer", employerSchema);
