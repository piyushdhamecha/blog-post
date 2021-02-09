import axios from "axios"

import {
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
  RESET_POST,
} from "./constants"

import { setErrors, clearErrors } from "../errors/actions"

export const togglePostLoading = () => ({
  type: TOGGLE_POST_LOADING,
})

export const togglePostsLoading = () => ({
  type: TOGGLE_POSTS_LOADING,
})

export const createPost = (postData, history) => (dispatch) => {
  dispatch(togglePostLoading())

  axios
    .post("/api/posts/create", postData)
    .then((res) => {
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      })
      dispatch(togglePostLoading())
      history.push("/blog")
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const getPostByID = (id) => (dispatch) => {
  dispatch(togglePostLoading())

  axios
    .get(`/api/posts/post/${id}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
      dispatch(clearErrors())
      dispatch(togglePostLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const getPostsByAuthor = (author) => (dispatch) => {
  dispatch(togglePostsLoading())

  axios
    .get(`/api/posts/author/${author}`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
      dispatch(togglePostsLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostsLoading())
    })
}

export const getPosts = () => (dispatch) => {
  dispatch(togglePostsLoading())

  axios
    .get(`/api/posts/`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
      dispatch(clearErrors())
      dispatch(togglePostsLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostsLoading())
    })
}

export const updatePost = (id, postData, history) => (dispatch) => {
  dispatch(togglePostLoading())

  axios
    .patch(`/api/posts/update/${id}`, postData)
    .then((res) => {
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      })
      dispatch(togglePostLoading())
      history.push("/blog")
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const deletePost = (id, history) => (dispatch) => {
  dispatch(togglePostLoading())

  axios
    .delete(`/api/posts/delete/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
      dispatch(togglePostLoading())
      history.push("/blog")
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const resetPost = () => ({
  type: RESET_POST,
})
