import moment from 'moment'
import React from 'react'
import { Card } from 'react-bootstrap'
import { HandThumbsUp, HandThumbsUpFill } from 'react-bootstrap-icons'
import postCss from './post.module.scss'
import './post.scss'

const Post = ({ post, currentUserName, onBodyClick, onLikeClick, onUnlikeClick }) => {
  const { _id, liked, likesCount, commentsCount, title, body, date, author } = post

  return (
    <Card className="deckStyle" style={{ border: 'none' }}>
      <Card.Body className="postCover" onClick={onBodyClick}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={postCss.comments}>{body}</Card.Text>
      </Card.Body>
      <Card.Footer className={postCss.commentFooter}>
        <div
          onClick={() => (liked ? onUnlikeClick(_id) : onLikeClick(_id))}
          aria-hidden="true"
          className={postCss.like}
        >
          {liked ? <HandThumbsUpFill size={14} className={postCss.liked} /> : <HandThumbsUp size={14} />}
          {!!likesCount && (
            <small className="text-muted">
              <strong>{likesCount}</strong>
            </small>
          )}
          {likesCount ? <small className="text-muted">Likes</small> : null}
        </div>
        <div>
          {!!commentsCount && (
            <small className="text-muted">
              <strong>{commentsCount}</strong>
            </small>
          )}
          <small className="text-muted">Comments</small>
        </div>
      </Card.Footer>
      <Card.Footer>
        <div className={postCss.footerContainer}>
          <small className="text-muted">{moment(date).calendar()}</small>
          <small className="text-muted">{`by ${author === currentUserName ? 'you' : author}`}</small>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default Post
