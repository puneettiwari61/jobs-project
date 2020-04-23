const mongoose = require('mongoose')
const Schema = mongoose.Schema


const experienceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  joiningDate: {
    type: String,
    required: true
  },
  leavingDate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Experience', experienceSchema)