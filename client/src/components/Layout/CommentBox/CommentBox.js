import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const CommentBox = ({ loading, onSubmit }) => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({})

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === true) {
      onSubmit(formData.comment)
    }

    setValidated(true)
    event.stopPropagation()
    event.preventDefault()
  }

  const handleChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Form noValidate validated={validated} className="mb-4" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control as="textarea" name="comment" rows={3} onChange={handleChange} required />
      </Form.Group>
      <Button variant="outline-info" type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  )
}

export default CommentBox
