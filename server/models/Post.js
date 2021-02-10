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
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
}

const PostSchema = new Schema(post)

PostSchema.virtual('likesCount').get(function () {
  return this.likes && this.likes.length ? this.likes.length : 0
})

module.exports = mongoose.model('posts', PostSchema)
