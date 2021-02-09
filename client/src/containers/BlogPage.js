import React, { useEffect } from "react"
import { connect } from "react-redux"

import Blog from "../components/User/Blog"
import {
  getPosts as getPostsAction,
  getPostsByAuthor as getPostsByAuthorAction,
} from "../services/posts/actions"
import {modalTypes} from '../components/Modal/constants'
import {showModal as showModalAction} from '../services/modal/actions'

const BlogPage = ({
  isAuthenticated,
  getPostsByAuthor,
  getPosts,
  match,
  posts,
  showModal,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getPosts()
    } else {
      getPostsByAuthor(match.params.author)
    }
  }, [isAuthenticated, getPosts, getPostsByAuthor, match])

  const handlePostItemClick = (postId) => {
    showModal({ postId, modalType: modalTypes.POST_PREVIEW })
  }

  return <Blog posts={posts} auth={isAuthenticated} onPostItemClick={handlePostItemClick} />
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
})

const mapDispatchToProps = {
  getPostsByAuthor: getPostsByAuthorAction,
  getPosts: getPostsAction,
  showModal: showModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)
