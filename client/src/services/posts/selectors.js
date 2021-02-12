import _ from 'lodash'
import { createSelector } from 'reselect'
import { getAuthUserSelector } from '../auth/selectors'

const postSelector = (state) => state.post

const getPostsSelector = createSelector([postSelector], (post) => post.posts)

const getPostsMetaSelector = createSelector([getPostsSelector], (posts) => posts.meta)
const getPostsDataSelector = createSelector([getPostsSelector], (posts) => posts.data)

export const getPostsMetaTotalRecordsSelector = createSelector([getPostsMetaSelector], (meta) => meta.totalRecords)

export const getFormattedPostsSelector = createSelector(
  [getPostsDataSelector, getAuthUserSelector],
  (posts, authUser) =>
    _.map(posts, (item) => ({
      ...item,
      likesCount: item.likes ? item.likes.length : 0,
      commentsCount: item.comments ? item.comments.length : 0,
      liked: _.some(item.likes, (id) => id === authUser.id),
    }))
)
