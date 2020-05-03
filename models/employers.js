var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

var employerSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String
      // required: true
    },
    lastName: {
      type: String
      // required: true
    },
    dob: {
      type: String
      // required:true
    },
    gender: {
      type: String
      // required: true
    },
    contactNumber: {
      type: Number
      // required: false
    },
    profileImage: {
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
    company: [
      {
        establishmentDate: {
          type: Date
          // required: false
        },
        companyName: {
          type: String
        },
        companyWebsiteUrl: {
          type: String
        },
        companyLogo: {
          type: String
          // required: true
        },
        founder: {
          type: String
        },
        foundersView: {
          type: String
        },
        aboutCompany: {
          type: String
        }
      }
    ],
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill"
      }
    ]
  },
  { timestamps: true }
);

employerSchema.pre("save", function(next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

// employerSchema.methods.verifyPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

employerSchema.virtual("verifyPassword").get(function() {
  return function(password) {
    return bcrypt.compareSync(password, this.password);
  };
});

employerSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model("Employer", employerSchema);
