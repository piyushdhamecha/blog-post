import React from "react"
import Post from "./Post"
import "./Post/post.scss"

const ListPost = ({ posts, onPostItemClick }) => (
  <div className="grid-container mx-3">
    {posts.map((post) => (
      <Post post={post} key={post._id} onClick={() => onPostItemClick(post._id)}/>
    ))}
  </div>
)

export default ListPost
