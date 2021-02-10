import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import Spinner from '../Layout/Spinner'
import Post from './Post'
import './Post/post.scss'

const ListPost = ({
  hasMore,
  page,
  posts,
  currentUserName,
  onPostItemClick,
  onPageChange,
  onLikeClick,
  onUnlikeClick,
}) => (
  <InfiniteScroll
    pageStart={0}
    loadMore={() => onPageChange(page + 1)}
    hasMore={hasMore}
    loader={<Spinner animation="border" />}
  >
    <div className="grid-container mx-3">
      {posts.map((post) => (
        <Post
          post={post}
          currentUserName={currentUserName}
          key={post._id}
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnlikeClick}
          onBodyClick={() => onPostItemClick(post._id)}
        />
      ))}
    </div>
  </InfiniteScroll>
)

export default ListPost
