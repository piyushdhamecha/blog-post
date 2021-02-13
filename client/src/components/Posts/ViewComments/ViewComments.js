import _ from 'lodash'
import moment from 'moment'

import React from 'react'
import classnames from 'classnames'

import { Media } from 'react-bootstrap'

import Avatar from '../../Layout/Avatar'

const ViewComment = ({ comments }) => {
  if (!comments || !comments.length) {
    return null
  }

  return _.map(comments, ({ text, _id, author, date }, i) => (
    <Media key={_id} className={classnames({ 'mt-3': i !== 0 })}>
      <Avatar className="mr-3" />
      <Media.Body>
        <p className="mb-1">{text}</p>
        <footer className="blockquote-footer">{`${author} | ${moment(date).calendar()}`}</footer>
        {i !== comments.length - 1 && <hr className="mb-0" />}
      </Media.Body>
    </Media>
  ))
}

export default ViewComment
