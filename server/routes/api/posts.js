const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')

const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const validatePostInput = require('../../validation/post')
const upload = require('../../middleware/upload')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { limit = 20, page = 1 } = req.query

  const skip = (+page - 1) * +limit
  const query = {}

  Post.find(query)
    .limit(+limit)
    .skip(skip)
    .exec(async (err, posts) => {
      if (err) {
        return res.status(400).json(err)
      }

      const totalRecords = await Post.countDocuments(query)

      res.status(200).json({
        meta: {
          totalRecords: totalRecords,
        },
        data: posts,
      })
    })
})

router.get('/post/:id', (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate('comments')
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json(err))
})

router.get('/author/:author', (req, res) => {
  Post.find({ author: req.params.author })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json({ author: 'Error fetching posts of specific author' }))
})

router.post('/create', passport.authenticate('jwt', { session: false }), upload.array('images', 10), (req, res) => {
  const author = req.user.user_name
  const post = req.body

  const { errors, isValid } = validatePostInput(post)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  post.author = author

  if (req.files && req.files.length) {
    post.images = req.files.map(({ path }) => path)
  }

  const newPost = new Post(post)

  newPost
    .save()
    .then((doc) => res.json(doc))
    .catch((err) => console.log({ create: 'Error creating new post' }))
})

router.patch(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  upload.array('images', 10),
  (req, res) => {
    const author = req.user.user_name
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const post = {
      title: req.body.title,
      body: req.body.body,
    }

    if (req.files && req.files.length) {
      post.images = req.files.map(({ path }) => path)
    }

    Post.findOneAndUpdate({ author, _id: req.params.id }, { $set: post }, { new: true })
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err))
  }
)

router.put('/like', passport.authenticate('jwt', { session: false }), (req, res) => {
  const user = req.user

  Post.findOneAndUpdate({ _id: req.body.id }, { $push: { likes: user._id } }, { new: true })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(400).json(err))
})

router.put('/unlike', passport.authenticate('jwt', { session: false }), (req, res) => {
  const user = req.user

  Post.findOneAndUpdate({ _id: req.body.id }, { $pull: { likes: user._id } }, { new: true })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(400).json(err))
})

router.put('/comment', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const author = req.user.user_name
  debugger
  const { postId, id, text } = req.body

  const newComment = {
    text,
    author,
  }

  let updateComment = null

  if (id) {
    updateComment = await Comment.findOneAndUpdate({ author, _id: id }, { $set: newComment }, { new: true })
      .then((doc) => doc)
      .catch((err) => err)

    Post.findOneAndUpdate({ _id: postId }, { new: true })
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err))
  } else {
    const createdComment = new Comment(newComment)

    updateComment = await createdComment
      .save()
      .then((doc) => doc)
      .catch((err) => err)

    Post.findOneAndUpdate({ _id: postId }, { $push: { comments: updateComment._id } }, { new: true })
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err))
  }
})

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const author = req.user.user_name

  Post.findOneAndDelete({ author, _id: req.params.id })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(400).json({ delete: 'Error deleting a post' }))
})

module.exports = router
