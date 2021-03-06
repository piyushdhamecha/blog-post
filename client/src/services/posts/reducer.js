import _ from 'lodash'
import {
  RESET_POST,
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
  TOGGLE_COMMENT_UPDATING,
} from './constants'

const initialState = {
  post: {},
  posts: {
    meta: {},
    data: [],
  },
  postLoading: false,
  postsLoading: false,
  commentUpdating: false,
}

export default (state = initialState, { type, payload, options = {} }) => {
  const { mergeResponse } = options

  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          data: [...state.posts.data, payload],
        },
      }
    case GET_POSTS:
      return {
        ...state,
        post: {},
        posts: mergeResponse
          ? {
              ...state.posts,
              data: [...state.posts.data, ...payload.data],
            }
          : payload,
      }
    case GET_POST:
      return {
        ...state,
        post: { ...payload },
      }
    case UPDATE_POST:
      const posts = [...state.posts.data]
      const postIndex = _.findIndex(posts, { _id: payload._id })
      let newPostsData = null

      if (postIndex === -1) {
        newPostsData = [...posts, payload]
      } else {
        posts[postIndex] = payload

        newPostsData = [...posts]
      }

      return {
        ...state,
        post: { ...payload },
        posts: {
          ...state.posts,
          data: newPostsData,
        },
      }
    case DELETE_POST:
      return {
        ...state,
        posts: {
          meta: state.posts.meta - 1,
          data: state.posts.data.filter((post) => post._id !== payload),
        },
      }
    case TOGGLE_POST_LOADING:
      return {
        ...state,
        postLoading: !state.postLoading,
      }
    case TOGGLE_POSTS_LOADING:
      return {
        ...state,
        postsLoading: !state.postsLoading,
      }
    case TOGGLE_COMMENT_UPDATING:
      return {
        ...state,
        commentUpdating: !state.commentUpdating,
      }
    case RESET_POST:
      return initialState
    default:
      return state
  }
}
