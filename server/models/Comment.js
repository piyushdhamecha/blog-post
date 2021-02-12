const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comment = {
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}

const CommentSchema = new Schema(comment, { timestamps: true })

module.exports = mongoose.model('comments', CommentSchema)
