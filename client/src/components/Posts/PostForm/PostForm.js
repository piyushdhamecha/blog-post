import _ from 'lodash'

import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

import Input from '../../Form/Input'
import Textarea from '../../Form/Textarea'
import ImageGallery from '../../Layout/ImageGallery'

const PostForm = ({ post, onChange, onBlur, loading, onSubmit }) => {
  const { title, body, images, imageFiles, errors } = post
  console.log(imageFiles)
  return (
    <Container>
      <Row>
        <Col className="mx-auto">
          <Form noValidate onSubmit={onSubmit} className="p-sm-3 p-xs-1">
            <Input
              name="title"
              type="text"
              placeholder="Enter Post Title"
              value={title}
              onChange={onChange}
              onBlur={onBlur}
              text={{
                module: 'post',
                label: 'Title',
                error: errors.title,
              }}
            />
            <Textarea
              name="body"
              placeholder="Write your post here..."
              value={body}
              onChange={onChange}
              onBlur={onBlur}
              text={{
                module: 'post',
                label: 'Description',
                error: errors.body,
              }}
            />
            <Input
              name="images"
              type="file"
              value={images}
              accept=".jpg, .jpeg"
              onChange={onChange}
              text={{
                module: 'post',
                label: 'Choose images',
                error: errors.images,
              }}
              multiple
            />
            {imageFiles && imageFiles.files && imageFiles.files.length ? (
              <ImageGallery>
                {_.map(imageFiles.files, (file, index) => (
                  <img src={imageFiles.uploaded ? file : URL.createObjectURL(file)} alt="test" key={`${index}`} />
                ))}
              </ImageGallery>
            ) : null}
            <Button variant="outline-info" type="submit" disabled={loading} className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PostForm
