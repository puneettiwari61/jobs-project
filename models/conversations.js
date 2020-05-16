var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer'
    },
    candidateId: {
        type: Schema.Types.ObjectId;
        ref: 'Candidate'
    },
    message: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },

}, { timestamps: true })

module.exports = mongoose.model("Conversation",conversationSchema);