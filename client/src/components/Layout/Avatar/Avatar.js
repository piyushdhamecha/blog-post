import React from 'react'
import classNames from 'classnames'

import avatarCss from './avatar.module.scss'

const Avatar = ({ className }) => <div className={classNames(avatarCss.container, className)}>A</div>

export default Avatar
