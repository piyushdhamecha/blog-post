import React, { useEffect } from "react"
import { connect } from "react-redux"

import Blog from "../components/User/Blog"
import {
  getPosts as getPostsAction,
  getPostsByAuthor as getPostsByAuthorAction,
} from "../services/posts/actions"

const BlogPage = ({
  isAuthenticated,
  getPostsByAuthor,
  getPosts,
  match,
  posts,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getPosts()
    } else {
      getPostsByAuthor(match.params.author)
    }
  }, [isAuthenticated, getPosts, getPostsByAuthor, match])

  return <Blog posts={posts} auth={isAuthenticated} />
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
})

export default connect(mapStateToProps, {
  getPostsByAuthor: getPostsByAuthorAction,
  getPosts: getPostsAction,
})(BlogPage)
