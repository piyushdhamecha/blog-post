import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button, Container, Form } from 'react-bootstrap'

import ListPost from '../Posts/ListPost'
import './blog.scss'

const Blog = ({
  posts,
  auth,
  hasMore,
  page,
  currentUserName,
  onPageChange,
  onPostItemClick,
  onLikeClick,
  onUnlikeClick,
}) => {
  const inputRef = useRef(null)
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState(false)

  const handleChange = () => {
    setSearch(inputRef.current.value.toLowerCase())
  }

  // setting no post found after waiting for a second
  useEffect(() => {
    setTimeout(() => {
      if (posts.length === 0) setDisplay(true)
    }, 1000)
  }, [posts])

  return (
    <>
      <div className="mx-3">
        <Nav className="justify-content-between mt-2 mb-2">
          {auth && (
            <Link to="/blog/post/create">
              <Button variant="light" className="styleBtn">
                +
              </Button>
            </Link>
          )}
          <Form>
            <Form.Group controlId="searchBar">
              <Form.Control
                type="text"
                placeholder="Search Post..."
                style={{ height: 40 }}
                ref={inputRef}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Nav>
      </div>
      {posts.length > 0 ? (
        <ListPost
          currentUserName={currentUserName}
          posts={posts.filter((post) => post.title.toLowerCase().includes(search))}
          hasMore={hasMore}
          page={page}
          onPageChange={onPageChange}
          onPostItemClick={onPostItemClick}
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnlikeClick}
        />
      ) : (
        display && (
          <Container
            style={{ height: '50vh' }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            {' '}
            <p className="text-secondary h3">No Post Found !</p>
          </Container>
        )
      )}
    </>
  )
}

export default Blog
