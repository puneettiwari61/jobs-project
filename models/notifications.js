var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificationSchema = new Schema(
  {
    notification: {
      type: String
    },
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "Candidate"
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employer"
    },
    userType: {
      type: String
    },
    hasRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
