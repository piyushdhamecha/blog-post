import _ from 'lodash'
import React, { useEffect } from 'react'
import ReactBootStrapModal from 'react-bootstrap/Modal'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import ViewPost from '../../../components/Posts/ViewPost'
import Spinner from '../../../components/Layout/Spinner'
import {
  deletePost as deletePostAction,
  getPostByID as getPostByIDAction,
  updateComment as updateCommentAction,
  like as postLikeAction,
  unlike as postUnlikeAction,
} from '../../../services/posts/actions'
import { getFormattedPostSelector } from '../../../services/posts/selectors'

import { hideModal as hideModalAction } from '../../../services/modal/actions'

const PostPreview = ({
  auth,
  authUsername,
  commentUpdating,
  post,
  postId,
  history,
  getPostByID,
  deletePost,
  hideModal,
  postLoading,
  updateComment,
  like,
  unlike,
}) => {
  useEffect(() => {
    getPostByID(postId)
  }, [postId, getPostByID])

  if (postLoading || _.isEmpty(post)) {
    return (
      <ReactBootStrapModal.Body>
        <Spinner />
      </ReactBootStrapModal.Body>
    )
  }

  const handleEdit = () => {
    hideModal()

    history.push(`/blog/post/update/${post._id}`)
  }

  const handleDelete = () => {
    hideModal()

    deletePost(post._id, history)
  }

  const handleComment = (comment) => {
    updateComment(post._id, comment)
  }

  const handleLikeClick = (id) => {
    like(id)
  }

  const handleUnlikeClick = (id) => {
    unlike(id)
  }

  return (
    <ViewPost
      auth={auth}
      authUsername={authUsername}
      commentUpdating={commentUpdating}
      post={post}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onSubmitComment={handleComment}
      onLikeClick={handleLikeClick}
      onUnlikeClick={handleUnlikeClick}
    />
  )
}

const mapStateToProps = (state) => ({
  postId: state.modal.postId,
  auth: state.auth.isAuthenticated,
  authUsername: state.auth.user.user_name,
  post: getFormattedPostSelector(state),
  postLoading: state.post.postLoading,
  commentUpdating: state.post.commentUpdating,
})

const mapDispatchToProps = {
  hideModal: hideModalAction,
  getPostByID: getPostByIDAction,
  deletePost: deletePostAction,
  updateComment: updateCommentAction,
  like: postLikeAction,
  unlike: postUnlikeAction,
}

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))
export default enhance(PostPreview)
