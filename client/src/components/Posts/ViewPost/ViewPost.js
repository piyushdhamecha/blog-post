import _ from 'lodash'
import moment from 'moment'

import React from 'react'
import { Card, Container, Row, Col, Button, Image, Modal } from 'react-bootstrap'

import { Calendar3, PersonFill, HandThumbsUp, HandThumbsUpFill } from 'react-bootstrap-icons'

import ImageGallery from '../../Layout/ImageGallery'
import CommentBox from '../../Layout/CommentBox'
import ViewComments from '../ViewComments'

const ViewPost = ({
  auth,
  authUsername,
  commentUpdating,
  post,
  onDelete,
  onEdit,
  onSubmitComment,
  onLikeClick,
  onUnlikeClick,
}) => {
  const { _id, date, title, body, author, images, comments, likesCount, liked } = post
  const { REACT_APP_API_URL: API_URL } = process.env

  return (
    <>
      <Modal.Header>
        <h4 className="mb-0 py-1">View post</h4>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="border-bottom">
            <Col className="col-auto mr-auto">
              <h4>{title}</h4>
            </Col>
            <Col className="col-auto">
              <Button variant="light" size="sm" onClick={() => (liked ? onUnlikeClick(_id) : onLikeClick(_id))}>
                {!!likesCount && (
                  <small className="text-muted pr-2">
                    <strong>{likesCount}</strong>
                  </small>
                )}
                {likesCount ? <small className="text-muted pr-2">Likes</small> : null}
                {liked ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} />}
              </Button>
            </Col>
          </Row>
          <Row className="my-4" style={{ whiteSpace: 'pre-wrap' }}>
            <Col>{body}</Col>
          </Row>
          {images && images.length ? (
            <Row className="my-5">
              <Col>
                <h6>Images</h6>
                <ImageGallery>
                  {_.map(images, (path, index) => (
                    <Image src={`${API_URL}/${path}`} alt="test" key={index} />
                  ))}
                </ImageGallery>
              </Col>
            </Row>
          ) : null}
          <Row className="d-flex font-italic footerStyle">
            <Col className="col-auto mr-auto">
              <PersonFill /> - {author}
            </Col>
            <Col className="col-auto">
              <Calendar3 /> - {moment(date).calendar()}
            </Col>
          </Row>
          {comments && comments.length && (
            <>
              <Row>
                <Col>
                  <hr className="my-3" />
                  <h5>Comments</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CommentBox onSubmit={onSubmitComment} loading={commentUpdating} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ViewComments comments={comments} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Modal.Body>
      {auth && authUsername === author && (
        <Modal.Footer>
          <Row>
            <Col className="text-left d-flex align-items-center">
              <Card.Link onClick={onDelete} className="text-danger" href="#">
                Delete
              </Card.Link>
            </Col>
            <Col className="text-right">
              <Button className="mr-2" variant="outline-info" onClick={onEdit}>
                Edit
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      )}
    </>
  )
}

export default ViewPost
