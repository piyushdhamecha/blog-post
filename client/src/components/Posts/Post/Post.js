import moment from 'moment'
import React from 'react'
import { Card } from 'react-bootstrap'
import { HandThumbsUp } from 'react-bootstrap-icons'
import postCss from './post.module.css'
import './post.scss'

const Post = ({ post, currentUserName, onBodyClick, onLikeClick }) => (
  <Card className="deckStyle" style={{ border: 'none' }}>
    <Card.Body className="postCover" onClick={onBodyClick}>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text className={postCss.comments}>{post.body}</Card.Text>
    </Card.Body>
    <Card.Footer className={postCss.commentFooter}>
      <div onClick={() => onLikeClick(post._id)} aria-hidden="true" className={postCss.like}>
        <HandThumbsUp size={14} />
        <small className="text-muted">Like</small>
      </div>
      <div>
        <small className="text-muted">Comments</small>
      </div>
    </Card.Footer>
    <Card.Footer>
      <div className={postCss.footerContainer}>
        <small className="text-muted">{moment(post.date).calendar()}</small>
        <small className="text-muted">{`by ${post.author === currentUserName ? 'you' : post.author}`}</small>
      </div>
    </Card.Footer>
  </Card>
)

export default Post
