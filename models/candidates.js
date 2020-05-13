var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
const mongooseLeanGetters = require("mongoose-lean-getters");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

var candidateSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    dob: {
      type: String
      // required:true
    },
    gender: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: false
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
    ratings: {
      type: Number
    },
    education: [
      {
        schoolOrCollege: {
          type: String,
          required: true
        },
        classOrDegree: {
          type: String,
          required: true
        },
        branch: {
          type: String
        },
        grade: {
          type: String
        },
        from: {
          type: String
          // required: true
        },
        to: {
          type: String
        }
      }
    ],
    experience: [
      {
        companyName: String,
        designation: String,
        location: String,
        joiningDate: String,
        leavingDate: String,
        description: String
      }
    ],
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],
    jobsApplied: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job"
      }
    ]
  },
  { timestamps: true }
);

candidateSchema.pre("save", function(next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

// candidateSchema.methods.verifyPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

candidateSchema.virtual("verifyPassword").get(function() {
  return function(password) {
    return bcrypt.compareSync(password, this.password);
  };
});

candidateSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model("Candidate", candidateSchema);
