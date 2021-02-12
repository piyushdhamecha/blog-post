const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post = {
  title: {
    type: String,
    required: true,
  },
  body: {
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
  likes: [{ type: Schema.Types.ObjectId, ref: 'users', unique: true }],
  images: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments', unique: true }],
}

const PostSchema = new Schema(post, { timestamps: true })

module.exports = mongoose.model('posts', PostSchema)
