import React from "react"
import { Link } from "react-router-dom"
import Post from "./Post"
import "./Post/post.scss"

const ListPost = ({ posts }) => (
  <div className="grid-container mx-3">
    {posts.map((post) => (
      <Link to={`/blog/post/${post._id}`} key={post._id}>
        <Post post={post} />
      </Link>
    ))}
  </div>
)

export default ListPost
