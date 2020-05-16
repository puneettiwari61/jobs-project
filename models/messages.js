var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  employerId: {
    type: Schema.Types.ObjectId,
    ref: "Employer"
  },
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: "Candidate"
  },
  senderType: {
    type: String
  },
  senderId: {
    type: String
  },
  receiverId: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  isSeen: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Message", messageSchema);
