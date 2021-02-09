import React, { useEffect } from 'react'
import ReactBootStrapModal from 'react-bootstrap/Modal'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import ViewPost from '../../../components/Posts/ViewPost'
import { deletePost as deletePostAction, getPostByID as getPostByIDAction } from '../../../services/posts/actions'

import { hideModal as hideModalAction } from '../../../services/modal/actions'

const PostPreview = ({ auth, authUsername, post, postId, history, getPostByID, deletePost, hideModal }) => {
  useEffect(() => {
    getPostByID(postId)
  }, [postId, getPostByID])

  const handleEdit = () => {
    hideModal()
    history.push(`/blog/post/update/${post._id}`)
  }

  const handleDelete = () => {
    hideModal()
    deletePost(post._id, history)
  }

  if (Object.keys(post).length === 0) return <div />

  return (
    <ReactBootStrapModal.Body>
      <ViewPost post={post} auth={auth} authUsername={authUsername} onDelete={handleDelete} onEdit={handleEdit} />
    </ReactBootStrapModal.Body>
  )
}

const mapStateToProps = (state) => ({
  postId: state.modal.postId,
  auth: state.auth.isAuthenticated,
  authUsername: state.auth.user.user_name,
  post: state.post.post,
})

const mapDispatchToProps = {
  hideModal: hideModalAction,
  getPostByID: getPostByIDAction,
  deletePost: deletePostAction,
}

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))
export default enhance(PostPreview)
