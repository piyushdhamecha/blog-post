import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import PostForm from "../../components/Posts/PostForm"
import Validate from "../../components/Form/Validate"
import {
  getPostByID as getPostByIDAction,
  updatePost as updatePostAction,
} from "../../services/posts/actions"

const UpdatePostPage = ({
  errors,
  updatePost,
  loading,
  currentPost,
  getPostByID,
  match,
  history,
}) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
    errors: {},
  })

  useEffect(() => {
    getPostByID(match.params.id)
  }, [match, getPostByID])

  // updating the local state of post with the received post data
  useEffect(() => {
    setPost((newPost) => ({
      title: currentPost.title,
      body: currentPost.body,
      errors: { ...newPost.errors },
    }))
  }, [currentPost])

  useEffect(() => {
    setPost((newPost) => ({ ...newPost, errors }))
  }, [errors])

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = { ...post.errors, ...Validate(name, value).errors }
    setPost({ ...post, errors: { ...error } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, body } = post
    updatePost(currentPost._id, { title, body }, history)
  }

  // to ensure that the post is loaded otherwise we would make uncontrolled form access error
  const isPostLoaded = () =>
    post.title || post.body || Object.keys(post.errors).length > 0

  return isPostLoaded() ? (
    <PostForm
      loading={loading}
      post={post}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  ) : (
    <div />
  )
}

const mapStateToProps = (state) => ({
  currentPost: state.post.post,
  loading: state.post.postLoading,
  errors: state.errors,
})

export default connect(mapStateToProps, {
  getPostByID: getPostByIDAction,
  updatePost: updatePostAction,
})(UpdatePostPage)
