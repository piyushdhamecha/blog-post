import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import PostForm from "../../components/Posts/PostForm"
import Validate from "../../components/Form/Validate"
import { createPost as createPostAction } from "../../services/posts/actions"

const CreatePostPage = ({ errors, createPost, loading, history }) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
    errors: {},
  })

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
    createPost({ title, body }, history)
  }

  return (
    <PostForm
      loading={loading}
      post={post}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  )
}

const mapStateToProps = (state) => ({
  loading: state.post.postLoading,
  errors: state.errors,
})

export default connect(mapStateToProps, { createPost: createPostAction })(
  CreatePostPage
)
