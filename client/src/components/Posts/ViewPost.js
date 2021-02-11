import _ from 'lodash'
import React from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'

import { getFormattedDate } from '../../utils/date'
import ImageGallery from '../Layout/ImageGallery'
import './Post/post.scss'

const ViewPost = ({ post, auth, authUsername, onDelete, onEdit }) => {
  const { date, title, body, author, images } = post
  const { REACT_APP_API_URL: API_URL } = process.env

  const postDate = getFormattedDate(date)

  return (
    <Container className="mt-4 viewPost">
      <Row>
        <Col className="text-center postTitle">
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row className="my-4" style={{ whiteSpace: 'pre-wrap' }}>
        <Col>{body}</Col>
      </Row>
      {images && images.length ? (
        <Row>
          <Col>
            <ImageGallery>
              {_.map(images, (path, index) => (
                <Image src={`${API_URL}/${path}`} alt="test" key={index} />
              ))}
            </ImageGallery>
          </Col>
        </Row>
      ) : null}
      <Row className="d-flex font-italic footerStyle">
        <Col>Created by : {author}</Col>
        <Col className="text-right">Date: {postDate}</Col>
      </Row>
      {auth && authUsername === author && (
        <Row>
          <Col className="text-center">
            <hr className="solid" />
            <Button className="mr-2" variant="outline-info" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="outline-danger" onClick={onDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ViewPost
