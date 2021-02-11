import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'

import Blog from '../components/User/Blog'
import {
  getPosts as getPostsAction,
  getPostsByAuthor as getPostsByAuthorAction,
  like as postLikeAction,
  unlike as postUnlikeAction,
} from '../services/posts/actions'
import { getFormattedPostsSelector, getPostsMetaTotalRecordsSelector } from '../services/posts/selectors'
import { modalTypes } from '../components/Modal/constants'
import { showModal as showModalAction } from '../services/modal/actions'

const LIMIT = 20

const BlogPage = ({
  isAuthenticated,
  getPostsByAuthor,
  getPosts,
  match,
  posts,
  showModal,
  postsTotal,
  currentUserName,
  like,
  unlike,
}) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (isAuthenticated) {
      getPosts({ limit: LIMIT, page })
    } else {
      getPostsByAuthor(match.params.author)
    }
  }, [isAuthenticated, getPosts, getPostsByAuthor, match, page])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handlePostItemClick = (postId) => {
    showModal({ postId, modalType: modalTypes.POST_PREVIEW })
  }

  const handleLikeClick = (id) => {
    like(id)
  }

  const handleUnlikeClick = (id) => {
    unlike(id)
  }

  const hasMore = useMemo(() => postsTotal >= page * LIMIT, [page, postsTotal])

  return (
    <Blog
      auth={isAuthenticated}
      currentUserName={currentUserName}
      posts={posts}
      hasMore={hasMore}
      page={page}
      onPageChange={handlePageChange}
      onPostItemClick={handlePostItemClick}
      onLikeClick={handleLikeClick}
      onUnlikeClick={handleUnlikeClick}
    />
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUserName: state.auth.user.user_name,
  postsTotal: getPostsMetaTotalRecordsSelector(state),
  posts: getFormattedPostsSelector(state),
})

const mapDispatchToProps = {
  getPostsByAuthor: getPostsByAuthorAction,
  getPosts: getPostsAction,
  showModal: showModalAction,
  like: postLikeAction,
  unlike: postUnlikeAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)
